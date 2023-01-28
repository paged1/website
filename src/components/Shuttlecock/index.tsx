
import { useEffect, useRef, useState } from "react";
import { 
    FloorColor,
    CourtDimensions,
    PlayerProperties,
    BirdieProperties,
    OpponentProperties,
    SwingInterval,
    Position,
    ServicePositions,
    Stage
} from "./constants";
import Avatar from "./Avatar";
import Opponent from "./Opponent";
import Crosshair from "./Crosshair";
import ServiceLine from "./ServiceLine";
import CenterLine from "./CenterLine";
import Net from "./Net";
import Birdie from "./Birdie";

// bezier for making a clear
function clearHeightBezier(t: number) {
    const points: Position[] = [{x: 0, y: 1}, {x: 5, y: 4}, {x: 5, y: 4.5}, {x: 5, y: 1}];
    return Math.pow(1-t, 3)*points[0].y + 3*Math.pow(1-t, 2)*t*points[1].y + 3*(1-t)*Math.pow(t, 2)*points[2].y + Math.pow(t, 3)*points[3].y;
}

// returns speed factor based on t in range [0,1]
function clearSpeedBezier(t: number) {
    const points: Position[] = [{x: 0, y: 7}, {x: 5, y: 7}, {x: 5, y: 7}, {x: 5, y: 2}];
    return Math.pow(1-t, 3)*points[0].y + 3*Math.pow(1-t, 2)*t*points[1].y + 3*(1-t)*Math.pow(t, 2)*points[2].y + Math.pow(t, 3)*points[3].y
}

export const Shuttlecock = () => {

    const courtRef = useRef<HTMLDivElement>(null);

    const [playerPosition, setPlayerPosition] = useState<Position>(ServicePositions[0].player);
    const [opponentPosition, setOpponentPosition] = useState<Position>(ServicePositions[0].opponent);
    
    const [mousePosition, setMousePosition] = useState<Position>({x: CourtDimensions.width*3/4, y: CourtDimensions.height/2});

    const [birdieSize, setBirdieSize] = useState(1);
    const [birdieStage, setBirdieStage] = useState(Stage.Middle);
    const [birdieAngle, setBirdieAngle] = useState(180);
    const [birdiePosition, setBirdiePosition] = useState<Position>(ServicePositions[0].player);
    const [birdieDestination, setBirdieDestination] = useState<Position>(birdiePosition);

    const [swing, setSwing] = useState(false);

    // angular direction that the player is moving
    const [w, setW] = useState(false);
    const [a, setA] = useState(false);
    const [s, setS] = useState(false);
    const [d, setD] = useState(false);
    const setKey = (key: string, isPressed: boolean) => {
        switch (key) {
            case 'w':
                setW(isPressed);
                break;
            case 'a':
                setA(isPressed);
                break;
            case 's':
                setS(isPressed);
                break;
            case 'd':
                setD(isPressed);
                break;
            case 'Backspace':
                window.location.reload();
                break;
        }
    }
    // handle input 
    function keyDownHandler({key}: KeyboardEvent) {
        setKey(key, true);
    }
    function keyUpHandler({key}: KeyboardEvent) {
        setKey(key, false);
    }
    // useEffect for moving the player
    useEffect(() => {
        // based on keys pressed, set a timer that will increment / decrement x and y coordinates within a the court's limits
        if ((w || a || s || d)) {
            const timer = setInterval(() => {
                // ok, so need to increment the players coordinates
                setPlayerPosition(({x: lastX, y: lastY}) => {
                    const x = lastX + ((a && !d) ? -PlayerProperties.displacement : (d && !a) ? PlayerProperties.displacement : 0);
                    // y axis points down
                    const y = lastY + ((w && !s) ? -PlayerProperties.displacement : (s && !w) ? PlayerProperties.displacement : 0);
                    return {
                        x: Math.min(Math.max(0 - CourtDimensions.spaceToWall, x), CourtDimensions.width/2), // can't walk through the net
                        y: Math.min(Math.max(0 - CourtDimensions.spaceToWall, y), CourtDimensions.height + CourtDimensions.spaceToWall)
                    }
                });
            }, PlayerProperties.interval);
            return () => clearInterval(timer);
        }
    }, [w, a, s, d]);

    // mouse position listener
    const mouseHandler = ({clientX, clientY}: MouseEvent) => {
        // want to find relative coordinates of the right half of the court from these and the court ref
        // then set the crosshair position to that 
        if (courtRef.current) {
            // get positions relative to court
            const x = clientX - courtRef.current.offsetLeft
            const y = clientY - courtRef.current.offsetTop;
            setMousePosition({
                x: Math.min(Math.max(CourtDimensions.width/2 - CourtDimensions.spaceToWall, x), CourtDimensions.width + CourtDimensions.spaceToWall),
                y: Math.min(Math.max(0 - CourtDimensions.spaceToWall, y), CourtDimensions.height + CourtDimensions.spaceToWall)
            })
        }
    }

    const clickHandler = () => {
        setSwing(true);
    }

    useEffect(() => {
        if (swing) {
            console.log('swing', playerPosition, mousePosition, birdiePosition);

            // if swing is good, then send the birdie on it's path (start a timer, which will update the birdie's position, 
            // until hit by something else, or it hits the ground, or service is called)
            // if player is within swing range of the birdie, then set the destination
            // TODO ensure you can't hit past the net
            if (
                playerPosition.x + PlayerProperties.swingRange >= birdiePosition.x && 
                playerPosition.x - PlayerProperties.swingRange <= birdiePosition.x && 
                playerPosition.y + PlayerProperties.swingRange >= birdiePosition.y &&
                playerPosition.y - PlayerProperties.swingRange <= birdiePosition.y && 
                birdiePosition.x < CourtDimensions.width/2
            ) {
                
                console.log('hit')
                // then it's within the hit box, so set the destination
                setBirdieDestination(mousePosition);
            }

            setTimeout(() => {

            }, OpponentProperties.reactionTime);

            // don't allow swinging again for the next interval
            const timer = setTimeout(() => setSwing(false), SwingInterval);
            return () => clearTimeout(timer);
        }
    }, [swing]);


    // opponent move
    useEffect(() => {
        let reactionTimer: NodeJS.Timeout | null;
        let moveTimer: NodeJS.Timer | null;
        // check if the destination is on our side of the court
        if (birdieDestination.x >= CourtDimensions.width/2) {
            reactionTimer = setTimeout(() => {
                console.log('opponent moving');
                // move to birdie location
                // start a setInterval that will move the opponent

                const origin = { ...opponentPosition };
                const destination = { ...birdieDestination };

                // get slope
                const m = (destination.y - origin.y) / (destination.x - origin.x);

                // set angle in degrees
                const angle = Math.atan(m);

                moveTimer = setInterval(() => {
                    // ok, so move the opponent a little closer to the birdie destination
                    setOpponentPosition(({x, y}) => {
                        if (x === birdieDestination.x && y === birdieDestination.y) {
                            clearInterval(moveTimer!);
                            return { x, y };
                        }

                        const displacement = OpponentProperties.displacement;
                        
                        // set new position
                        return {
                            x: destination.x > x ? Math.min(x + displacement*Math.cos(angle), destination.x) : Math.max(x - displacement*Math.cos(angle), destination.x),
                            y: destination.y > y ? Math.min(y + (destination.x < x ? -displacement*Math.sin(angle) : displacement*Math.sin(angle)), destination.y) : Math.max(y + (destination.x < x ? -displacement*Math.sin(angle) : displacement*Math.sin(angle)), destination.y)
                        };
                        
                    });
                }, OpponentProperties.interval);

            }, OpponentProperties.reactionTime);
        }
        // TODO opponent adjusting back to center court
        // else {
        //     // move the opponent to the center of the opponents side
        //     // start a setInterval that will move the opponent
        //     moveTimer = setInterval(() => {
        //         // TODO need to rethink this bc we can't exactly find out if we're already there unless we use the opponent position, 
        //         setOpponentPosition(({x, y}) => {

        //             const origin = { x, y };
        //             const destination = { x: Math.round(CourtDimensions.width*7/8), y: CourtDimensions.height/2 };

        //             // get slope
        //             const m = (destination.y - origin.y) / (destination.x - origin.x);
        //             // set new position
        //             return {
        //                 x: Math.min(origin.x + (destination.x > origin.x ? OpponentProperties.displacement : -OpponentProperties.displacement), destination.x),
        //                 y: destination.y > origin.y ? Math.min(origin.y + Math.round(m * OpponentProperties.displacement), destination.y) : Math.max(origin.y + Math.round(m * OpponentProperties.displacement), destination.y) 
        //             };
        //         });
        //     }, OpponentProperties.interval);
            
        // }
        return () => {
            if (reactionTimer) {
                clearTimeout(reactionTimer);
            }
            if (moveTimer) {
                clearInterval(moveTimer);
            }
        }
        
    }, [birdieDestination]);

    useEffect(() => {
        // if we're in range, hit it
        if (
            opponentPosition.x + OpponentProperties.swingRange >= birdiePosition.x && 
            opponentPosition.x - OpponentProperties.swingRange <= birdiePosition.x && 
            opponentPosition.y + OpponentProperties.swingRange >= birdiePosition.y &&
            opponentPosition.y - OpponentProperties.swingRange <= birdiePosition.y &&
            birdiePosition.x > CourtDimensions.width/2
        ) {
            console.log('opponent hit');

            // random spot on the other court
            setBirdieDestination({
                // add spaceToWall to range, then shift afterwards, covering the space from the wall to the net
                x: Math.round((Math.random() * (CourtDimensions.width/2 + CourtDimensions.spaceToWall)) - CourtDimensions.spaceToWall),
                // shift again, same idea
                y: Math.round((Math.random() * (CourtDimensions.height + CourtDimensions.spaceToWall*2)) - CourtDimensions.spaceToWall)
            })
        }

    }, [opponentPosition, birdiePosition]);


    useEffect(() => {
        // if birdie hasn't reached it's destination, then move it
        if (birdieDestination.x !== Math.round(birdiePosition.x) || birdieDestination.y !== Math.round(birdiePosition.y)) {
            // determine the function of speed for the birdie (for now linear)
            
            const origin = { ...birdiePosition };
            const destination = { ...birdieDestination };
            const distanceToDestination = Math.sqrt(Math.pow(destination.x - origin.x, 2) + Math.pow(destination.y - origin.y, 2));

            // get slope
            const m = (destination.y - origin.y) / (destination.x - origin.x);

            // set angle in degrees
            const angle = Math.atan(m);
            setBirdieAngle((destination.x > origin.x ? angle : angle+Math.PI) *180/Math.PI);

            const timer = setInterval(() => {
                // set new position
                setBirdiePosition(({ x, y }) => {
                    if (x === destination.x && y === destination.y) {
                        clearInterval(timer!);
                        return { x, y };
                    }
                    // given origin, determine how far along it is from it's origin
                    const distanceLeft = Math.sqrt(Math.pow(destination.x - x, 2) + Math.pow(destination.y - y, 2));
                    
                    const t = (distanceToDestination-distanceLeft)/distanceToDestination;
                    // based on length along, use bezier to determine size
                    setBirdieSize(clearHeightBezier(t));

                    // set the birdie appearance
                    setBirdieStage(t > 0.9 ? Stage.Down : t > 0.6 ? Stage.Middle : t > 0.2 ? Stage.Rise : Stage.Up);

                    const displacement = BirdieProperties.displacement*clearSpeedBezier((distanceToDestination-distanceLeft)/distanceToDestination)

                    return {
                        x: destination.x > x ? Math.min(x + displacement*Math.cos(angle), destination.x) : Math.max(x - displacement*Math.cos(angle), destination.x),
                        y: destination.y > y ? Math.min(y + (destination.x < x ? -displacement*Math.sin(angle) : displacement*Math.sin(angle)), destination.y) : Math.max(y + (destination.x < x ? -displacement*Math.sin(angle) : displacement*Math.sin(angle)), destination.y)
                    }
                });
            }, BirdieProperties.interval);
            return () => clearInterval(timer);
            
        }
    }, [birdieDestination]);

      useEffect(() => {
        window.addEventListener('keydown', keyDownHandler);
        window.addEventListener('keyup', keyUpHandler);
        window.addEventListener('mousemove', mouseHandler);
        window.addEventListener('mousedown', clickHandler);
        return () => {
          window.removeEventListener('keydown', keyDownHandler);
          window.removeEventListener('keyup', keyUpHandler);
          window.removeEventListener('mousemove', mouseHandler);
          window.removeEventListener('mousedown', (clickHandler));
        };
      }, []);

    return (
        <div id="game-container" style={{height: CourtDimensions.height + CourtDimensions.spaceToWall*2 + (CourtDimensions.lineWidth/2), width: CourtDimensions.width + CourtDimensions.spaceToWall*2 + (CourtDimensions.lineWidth/2), border: "solid", borderWidth: CourtDimensions.lineWidth, borderColor: "#000", backgroundColor: FloorColor}}>
            <div id="court" ref={courtRef} style={{...CourtDimensions, border: "solid", borderWidth: CourtDimensions.lineWidth, borderColor: "#FFF", position: "relative", top: (CourtDimensions.spaceToWall) - (CourtDimensions.lineWidth/2), left: (CourtDimensions.spaceToWall) - (CourtDimensions.lineWidth/2), cursor: "none"}}>
                <Avatar x={playerPosition.x} y={playerPosition.y} />
                <Opponent x={opponentPosition.x} y={opponentPosition.y} />
                <Birdie x={birdiePosition.x} y={birdiePosition.y} size={birdieSize} angle={birdieAngle} stage={birdieStage} />
                <Crosshair x={mousePosition.x} y={mousePosition.y} />
                <CenterLine />
                <ServiceLine />
                <Net/>
            </div>
            
        </div>
    )
}
export default Shuttlecock;