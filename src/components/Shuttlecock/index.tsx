
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
    Stage,
    ScoreToWin,
    MessageTime,
    BirdieTooHigh
} from "./constants";
import Avatar from "./Avatar"
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
    const points: Position[] = [{x: 0, y: 2}, {x: 5, y: 1.2}, {x: 5, y: 0.5}, {x: 5, y: 0.1}];
    return Math.pow(1-t, 3)*points[0].y + 3*Math.pow(1-t, 2)*t*points[1].y + 3*(1-t)*Math.pow(t, 2)*points[2].y + Math.pow(t, 3)*points[3].y
}

type GameState = {
    scores: {
        'player': number;
        'opponent': number;
    };
    hits: {
        'player': number;
        'opponent': number;
    };
    server: 'player' | 'opponent',
    stage: 'service' | 'rally' | 'dead' | 'over'
    paused: boolean;
}

const gameWinner = (playerScore: number, opponentScore: number) => {
    let result: 'player' | 'opponent' | null = null;
    if (playerScore >= ScoreToWin && playerScore - opponentScore > 1) {
        result = 'player';
    }
    else if (opponentScore >= ScoreToWin && opponentScore - playerScore > 1) {
        result = 'opponent';
    }
    return result;
} 

export const Shuttlecock = () => {

    const courtRef = useRef<HTMLDivElement>(null);

    const [gameState, setGameState] = useState<GameState>({
        scores: {
            player: 0,
            opponent: 0
        },
        hits: {
            player: 0,
            opponent: 0
        },
        server: 'player',
        stage: 'service',
        paused: false,
    });

    const [playerPosition, setPlayerPosition] = useState<Position>(ServicePositions[0].player);
    const [opponentPosition, setOpponentPosition] = useState<Position>(ServicePositions[0].opponent);
    
    const [mousePosition, setMousePosition] = useState<Position>({x: CourtDimensions.width*3/4, y: CourtDimensions.height/2});

    const [birdieSize, setBirdieSize] = useState(1);
    const [birdieStage, setBirdieStage] = useState(Stage.Down);
    const [birdieAngle, setBirdieAngle] = useState(180);
    const [birdiePosition, setBirdiePosition] = useState<Position>(ServicePositions[0].player);
    const [birdieDestination, setBirdieDestination] = useState<Position>(birdiePosition);

    const [playerSwing, setPlayerSwing] = useState(false);
    const [opponentSwing, setOpponentSwing] = useState(false);

    const [gameMessage, setGameMessage] = useState<string>("");
    const [opponentMessage, setOpponentMessage] = useState("");

    useEffect(() => {
        if (gameMessage && gameState.stage !== 'rally') {
            const timer = setTimeout(() => {
                setGameMessage("");
            }, MessageTime);
            return () => clearTimeout(timer);
        }
        else {
            setGameMessage("");
        }
        
    }, [gameMessage, gameState.stage]);

    useEffect(() => {
        if (opponentMessage && gameState.stage !== 'rally') {
            const timer = setTimeout(() => {
                setOpponentMessage("");
            }, MessageTime*3/2);
            return () => clearTimeout(timer);
        }
        else {
            setOpponentMessage("");
        }
        
    }, [opponentMessage, gameState.stage]);

    useEffect(() => {

        // set service up
        const service = () => {
            setGameState((state) => ({...state, hits: {player: 0, opponent: 0}, stage: 'service'}));
            // set message
            setGameMessage(`${gameState.scores.player}-${gameState.scores.opponent}`);

            // set up positions, based on score and server
            if (gameState.scores[gameState.server] % 2 === 0) {
                // even
                setPlayerPosition(ServicePositions[0].player);
                setOpponentPosition(ServicePositions[0].opponent);
                // set birdie position to the position of the server
                setBirdieDestination(ServicePositions[0][gameState.server]);
                setBirdiePosition(ServicePositions[0][gameState.server]);
            }
            else {
                // odd
                setPlayerPosition(ServicePositions[1].player);
                setOpponentPosition(ServicePositions[1].opponent);
                setBirdieDestination(ServicePositions[1][gameState.server]);
                setBirdiePosition(ServicePositions[1][gameState.server]);
            }
        }

        if (gameState.stage === 'dead') {
            const timer = setTimeout(() => {
                setGameState((state) => ({...state, stage: 'service'}));
            }, MessageTime);
            return () => clearTimeout(timer);
        }
        else if (gameState.stage === 'service') {
            const result = gameWinner(gameState.scores.player, gameState.scores.opponent);
            if (result === 'player') {
                setGameMessage("You Won");
                setGameState((state) => ({...state, stage: 'over'}));
            }
            else if (result === 'opponent') {
                setGameMessage("You Lost");
                setGameState((state) => ({...state, stage: 'over'}));
            }
            else {
                // game not over, prep for service
                service();
            }
        }

    }, [gameState.stage]);

    useEffect(() => {
        if (
            birdiePosition.x === birdieDestination.x && 
            birdiePosition.y === birdieDestination.y && 
            birdieDestination.x !== CourtDimensions.width/2 &&
            gameState.stage === 'rally'
        ) {
            
            // when birdie meets destination without being hit and that destination is 
            // either within serving boundaries (serivce state), 
            // or within all boundaries (rally state), then a point should be awarded to the opposing side.
            // determine who was the last to hit
            const serverHits = gameState.hits[gameState.server];
            const nonServerHits = gameState.server === 'player' ? gameState.hits.opponent : gameState.hits.player;
            const lastHitter = serverHits > nonServerHits ? gameState.server : (gameState.server === 'player' ? 'opponent' : 'player');
            const { x, y } = { ...birdieDestination };

            const isService = gameState.hits.player + gameState.hits.opponent < 2;
            // service out line
            // if out award to person with less hits
            // if in award to person with more hits

            // increment score and set the server of the next play
            if (lastHitter === 'player') {
                if (
                    // x axis
                    x >= (CourtDimensions.width/2 + (isService ? CourtDimensions.service : 0)) &&
                    x <= CourtDimensions.width &&
                    // y axis: get service to see which side it should be in on (even, then odd)
                    (isService ? (gameState.scores.player % 2 === 0) ? (y >= 0 && y <= CourtDimensions.height/2) : (y >= CourtDimensions.height/2 && y <= CourtDimensions.height) : (y >= 0 && y <= CourtDimensions.height))
                ) {
                    setGameMessage("Point Player");
                    const exclamations = ["Gah!", "Nice shot!", "@#$%&!", ""];
                    // in, award point to player
                    setOpponentMessage(exclamations[Math.round(Math.random()*exclamations.length-1)]);
                    setGameState((state) => ({
                        ...state,
                        stage: 'dead',
                        scores: {
                            player: state.scores.player + 1,
                            opponent: state.scores.opponent
                        },
                        server: 'player',
                    }));
                }
                else {
                    setGameMessage(x > CourtDimensions.width ? "Long" : (isService ? (gameState.scores.player % 2 === 0) ? (y < 0 || y > CourtDimensions.height/2) : (y < CourtDimensions.height/2 || y > CourtDimensions.height) : (y < 0 || y > CourtDimensions.height)) ? "Wide" : "Short");
                    const exclamations = ["Yes!", "Let's go!", "Nice try!", ""];
                    // out, award point to opponent
                    // on the board or game bird possibility
                    setOpponentMessage(exclamations[Math.round(Math.random()*exclamations.length-1)]);
                    setGameState((state) => ({
                        ...state,
                        stage: 'dead',
                        scores: {
                            player: state.scores.player,
                            opponent: state.scores.opponent + 1
                        },
                        server: 'opponent',
                    }));
                }
            }
            else {
                if (
                    // x axis
                    x >= 0 &&
                    x <= (CourtDimensions.width/2 - (isService ? CourtDimensions.service : 0)) &&
                    // y axis: get service to see which side it should be in on (odd, then even)
                    (isService ? (gameState.scores.opponent % 2 === 1) ? (y >= 0 && y <= CourtDimensions.height/2) : (y >= CourtDimensions.height/2 && y <= CourtDimensions.height) : (y >= 0 && y <= CourtDimensions.height))
                ) {
                    setGameMessage("Point Opponent");
                    const exclamations = ["Yes!", "Let's go!", "Haha!", ""];
                    // in, award point to opponent
                    // on the board or game bird possibility
                    setOpponentMessage(exclamations[Math.round(Math.random()*exclamations.length-1)]);
                    setGameState((state) => ({
                        ...state,
                        stage: 'dead',
                        scores: {
                            player: state.scores.player,
                            opponent: state.scores.opponent + 1
                        },
                        server: 'opponent',
                    }));
                }
                else {
                    setGameMessage(x < 0 ? "Long" : (isService ? (gameState.scores.opponent % 2 === 1) ? (y < 0 || y > CourtDimensions.height/2) : (y < CourtDimensions.height/2 || y > CourtDimensions.height) : (y < 0 || y > CourtDimensions.height)) ? "Wide" : "Short");
                    const exclamations = ["Good eye!", "No!", "So close!", ""];
                    // out, award point to player
                    setOpponentMessage(exclamations[Math.round(Math.random()*exclamations.length-1)]);
                    setGameState((state) => ({
                        ...state,
                        stage: 'dead',
                        scores: {
                            player: state.scores.player + 1,
                            opponent: state.scores.opponent
                        },
                        server: 'player',
                    }));
                }
            }
        }
        
    }, [gameState.stage, birdiePosition, birdieDestination, gameState.hits]);

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
        setPlayerSwing(true);
    }

    useEffect(() => {
        if (playerSwing) {
            console.log('player swing', playerPosition, mousePosition, birdiePosition);

            // if swing is good, then send the birdie on it's path (start a timer, which will update the birdie's position, 
            // until hit by something else, or it hits the ground, or service is called)
            // if player is within swing range of the birdie, then set the destination
            if (
                playerPosition.x + PlayerProperties.swingRange >= birdiePosition.x && 
                playerPosition.x - PlayerProperties.swingRange <= birdiePosition.x && 
                playerPosition.y + PlayerProperties.swingRange >= birdiePosition.y &&
                playerPosition.y - PlayerProperties.swingRange <= birdiePosition.y && 
                birdiePosition.x < CourtDimensions.width/2 &&
                (gameState.stage === 'service' || gameState.stage === 'rally') &&
                birdieSize <= BirdieTooHigh
            ) {
                console.log('player hit')
                // then it's within the hit box, so set the destination
                setBirdieDestination(mousePosition);
                setGameState((state) => ({...state, stage: 'rally', hits: {...state.hits, player: state.hits.player + 1}}));
            }
            // don't allow swinging again for the next interval
            const timer = setTimeout(() => setPlayerSwing(false), SwingInterval);
            return () => clearTimeout(timer);
        }
    }, [playerSwing]);


    // opponent move
    useEffect(() => {
        if (gameState.stage !== 'rally') {
            return;
        }
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
        else {
            const origin = { ...opponentPosition };
            const destination = { x: Math.round(CourtDimensions.width*7/8), y: CourtDimensions.height/2 };

            // get slope
            const m = (destination.y - origin.y) / (destination.x - origin.x);

            // set angle in degrees
            const angle = Math.atan(m);

            // move the opponent to the center of the opponents side
            // start a setInterval that will move the opponent
            moveTimer = setInterval(() => {
                setOpponentPosition(({x, y}) => {
                    if (x === destination.x && y === destination.y) {
                        clearInterval(moveTimer!);
                        return { x, y };
                    }

                    // half speed
                    const displacement = OpponentProperties.displacement/2;

                    // set new position
                    return {
                        x: destination.x > x ? Math.min(x + displacement*Math.cos(angle), destination.x) : Math.max(x - displacement*Math.cos(angle), destination.x),
                        y: destination.y > y ? Math.min(y + (destination.x < x ? -displacement*Math.sin(angle) : displacement*Math.sin(angle)), destination.y) : Math.max(y + (destination.x < x ? -displacement*Math.sin(angle) : displacement*Math.sin(angle)), destination.y)
                    };
                });
            }, OpponentProperties.interval);
            
        }
        return () => {
            if (reactionTimer) {
                clearTimeout(reactionTimer);
            }
            if (moveTimer) {
                clearInterval(moveTimer);
            }
        }
        
    }, [birdieDestination, gameState.stage]);

    useEffect(() => {
        // if we're in range, hit it
        if (
            opponentPosition.x + OpponentProperties.swingRange >= birdiePosition.x && 
            opponentPosition.x - OpponentProperties.swingRange <= birdiePosition.x && 
            opponentPosition.y + OpponentProperties.swingRange >= birdiePosition.y &&
            opponentPosition.y - OpponentProperties.swingRange <= birdiePosition.y &&
            // verify that the opponent hasn't already hit
            // if server, ensure opponent hits are never more than 1 above the player, else never more than 
            (gameState.server === 'opponent' ? (gameState.hits.opponent <= gameState.hits.player) : (gameState.hits.opponent < gameState.hits.player)) &&
            birdiePosition.x > CourtDimensions.width/2
        ) {

            // if service
            if (gameState.stage === 'service') {
                // wait then hit
                const timer = setTimeout(() => {
                    // random spot on the other court
                    console.log('opponent serve');

                    let x;
                    const isShort = Math.random() >= 0.95;
                    if (isShort) {
                        // put in first 120px of service line
                        x = CourtDimensions.width/2 - CourtDimensions.service - (Math.round(Math.random()*120))
                    }
                    else {
                        // put in back 150px of court, with 10% chance of going out
                        x = Math.round(Math.random()*120) - 12;
                    }

                    let y;
                    if (gameState.scores.opponent % 2 === 1) {
                        // odd, upper half
                        y = Math.round(Math.random()*(CourtDimensions.height/2 + CourtDimensions.spaceToWall) - CourtDimensions.spaceToWall/2)
                    } 
                    else {
                        // even
                        y = Math.round(CourtDimensions.height/2 + Math.random()*(CourtDimensions.height/2 + CourtDimensions.spaceToWall) - CourtDimensions.spaceToWall/2)
                    }
                    setBirdieDestination({
                        x,
                        y
                    });
                    setGameState((state) => ({...state, stage: 'rally', hits: {...state.hits, opponent: state.hits.opponent + 1}}));
                }, 3_000);
                return  () => clearTimeout(timer);
            }
            else if (gameState.stage === 'rally') {
                setOpponentSwing(true);
            }
        }
    }, [opponentPosition, birdiePosition, birdieDestination, gameState.hits, gameState.stage]);

    useEffect(() => {
        if (opponentSwing) {
            console.log('opponent swing', opponentPosition, mousePosition, birdieDestination);

            const { x, y } = { ...birdieDestination };
            const isService = gameState.hits.player + gameState.hits.opponent < 2;

            let willHit = false;

            // if birdie is going in
            if (
                x >= (CourtDimensions.width/2 + (isService ? CourtDimensions.service : 0)) &&
                x <= CourtDimensions.width &&
                (isService ? (gameState.scores.player % 2 === 0) ? (y >= 0 && y <= CourtDimensions.height/2) : (y >= CourtDimensions.height/2 && y <= CourtDimensions.height) : (y >= 0 && y <= CourtDimensions.height))
            ) {
                
                // 10% chance of wrongly thinking the birdie is going out if it's going to land near but inside the line, but never for shortness
                if (
                    x > CourtDimensions.width - CourtDimensions.spaceToWall || 
                    (isService ? (gameState.scores.player % 2 === 0) ? (y < CourtDimensions.spaceToWall/2 || y > CourtDimensions.height/2 - CourtDimensions.spaceToWall/2) : (y < CourtDimensions.height/2 + CourtDimensions.spaceToWall/2 || y > CourtDimensions.height - CourtDimensions.spaceToWall/2) : (y < CourtDimensions.spaceToWall/2 || y > CourtDimensions.height - CourtDimensions.spaceToWall/2))
                ) {
                    // birdie is near boundary, 10% chance of not hitting
                    let chance = Math.random();
                    if (chance < 0.9) {
                        willHit = true;
                    }
                }
                else {
                    willHit = true;
                }
            }
            else {
                let chance = Math.random();
                // 10% chance of hitting even if it's going out
                if (chance >= 0.9) {
                    willHit = true;
                }
            }
            if (willHit) {
                setOpponentSwing(true);
                // 5% chance of missing the swing, or if birdie is too high
                let chance = Math.random();
                if (chance < 0.95 && birdieSize <= BirdieTooHigh) {
                    console.log('opponent hit', gameState.hits);
                    // random spot on the other court
                    setBirdieDestination({
                        // add spaceToWall to range, then shift afterwards, covering the space from the wall to the net
                        x: Math.round((Math.random() * (CourtDimensions.width/2 + CourtDimensions.spaceToWall)) - CourtDimensions.spaceToWall),
                        // shift again, same idea
                        y: Math.round((Math.random() * (CourtDimensions.height + CourtDimensions.spaceToWall*2)) - CourtDimensions.spaceToWall)
                    });
                    setGameState((state) => ({...state, hits: {...state.hits, opponent: state.hits.opponent + 1}}));
                }
            }
            // don't allow swinging again for the next interval
            const timer = setTimeout(() => setOpponentSwing(false), SwingInterval);
            return () => clearTimeout(timer);
        }
    }, [opponentSwing]);

    useEffect(() => {
        if (gameState.stage !== 'rally') {
            return;
        }
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
                        if (destination.x === CourtDimensions.width/2) {
                            console.log('net hit');
                            // 50/50 chance
                            const willLandRight = !!Math.round(Math.random());
                            // land from 25-125 pixels away
                            const distance = Math.round((Math.random()*100)+25)
                            // side 
                            setBirdieDestination({x: x + (willLandRight ? distance : -distance), y: destination.y});
                        }
                        return { x, y };
                    }
                    // given origin, determine how far along it is from it's origin
                    const distanceLeft = Math.sqrt(Math.pow(destination.x - x, 2) + Math.pow(destination.y - y, 2));
                    
                    const t = (distanceToDestination-distanceLeft)/distanceToDestination;
                    // based on length along, use bezier to determine size
                    setBirdieSize(clearHeightBezier(t));

                    // set the birdie appearance
                    setBirdieStage(t > 0.9 ? Stage.Down : t > 0.8 ? Stage.Set : t > 0.6 ? Stage.Middle : t > 0.2 ? Stage.Rise : Stage.Up);

                    const displacement = BirdieProperties.displacement*clearSpeedBezier((distanceToDestination-distanceLeft)/distanceToDestination)

                    return {
                        x: destination.x > x ? Math.min(x + displacement*Math.cos(angle), destination.x) : Math.max(x - displacement*Math.cos(angle), destination.x),
                        y: destination.y > y ? Math.min(y + (destination.x < x ? -displacement*Math.sin(angle) : displacement*Math.sin(angle)), destination.y) : Math.max(y + (destination.x < x ? -displacement*Math.sin(angle) : displacement*Math.sin(angle)), destination.y)
                    }
                });
            }, BirdieProperties.interval);
            return () => clearInterval(timer);
            
        }
    }, [birdieDestination, gameState.stage]);

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
                <Opponent x={opponentPosition.x} y={opponentPosition.y} message={opponentMessage} />
                <Birdie 
                    x={birdiePosition.x}
                    y={birdiePosition.y}
                    size={birdieSize}
                    angle={birdieAngle}
                    stage={birdieStage}
                />
                <Crosshair x={mousePosition.x} y={mousePosition.y} />
                <CenterLine />
                <ServiceLine />
                <Net/>
                <div style={{position: "absolute", top: -CourtDimensions.spaceToWall*3/4, width: "100%"}}>
                    {`${gameState.scores.player}-${gameState.scores.opponent}`}
                </div>
                {gameMessage && (
                    <div style={{width: CourtDimensions.width + CourtDimensions.spaceToWall*2 + CourtDimensions.lineWidth/2, height: CourtDimensions.height/4, position: "absolute", left: -CourtDimensions.spaceToWall-CourtDimensions.lineWidth/2, backgroundColor: "rgba(10, 10, 10, 0.5)", display: "table"}} >
                        <div style={{display: "table-cell", verticalAlign: "middle", textAlign: "center"}}>
                            <div style={{fontFamily: "'Bebas Neue', cursive", fontSize: CourtDimensions.height/6, textShadow: `2px 2px 2px black`}}>
                                {gameMessage}
                            </div>
                        </div>
                    </div>
                )}
                {/* {gameState.stage !== null && (
                    <div style={{width: CourtDimensions.width + CourtDimensions.spaceToWall*2 + CourtDimensions.lineWidth/2, height: CourtDimensions.height/12, position: "absolute", top: CourtDimensions.height/2, left: -CourtDimensions.spaceToWall-CourtDimensions.lineWidth/2, display: "table"}} >
                        <div style={{display: "table-cell", verticalAlign: "middle", textAlign: "center", width: CourtDimensions.width/6, backgroundColor: "grey"}}>
                            <div style={{fontFamily: "'Bebas Neue', cursive", fontSize: CourtDimensions.height/3}}>
                                <button onClick={() => window.location.reload()}>Play Again</button>
                            </div>
                        </div>
                    </div>
                )} */}
            </div>
            
        </div>
    )
}
export default Shuttlecock;