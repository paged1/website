import React, { useState, useRef, useEffect, ReactComponentElement } from "react";
import { BirdieSize, BirdieStages, Stage } from "./constants";

// converted to jsx using: https://svg2jsx.com/

function Birdie({size = 1, stage = Stage.Middle, angle = 0, x = 0, y = 0}: {size?: number, stage: Stage, angle?: number, x?: number, y?: number}) {
    // default angle to point the birdie directly down
    const rightRotationOffset = -104;

    const birdieRef = useRef(null);

    // const [coordinates, setCoordinates] = useState({x: 0, y: 0})

    // useEffect(() => {
    //     //console.log('coordinates', x, y);
    //     setCoordinates({
    //         x,
    //         y
    //     });
    // }, [x, y]);

    const BirdieSvg = BirdieStages[stage];

  return (
    <div style={{ position: "absolute", zIndex: 2 }}>
        <BirdieSvg
            width={size*BirdieSize}
            height={size*BirdieSize}
            style={{transformOrigin: 'left'}}
            transform={`translate(${x - size/2},${y - size/2}) rotate(${rightRotationOffset + angle})`}
            ref={birdieRef}
        />
    </div>
  );
}

export default Birdie;