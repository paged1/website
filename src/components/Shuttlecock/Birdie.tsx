import { useRef } from "react";
import { BirdieSize, BirdieStages, Stage } from "./constants";

// converted to jsx using: https://svg2jsx.com/

function Birdie({size, stage, angle, x, y}: {size: number, stage: Stage, angle: number, x: number, y: number}) {
    // default angle to point the birdie directly down
    const rightRotationOffset = -104;

    const birdieRef = useRef(null);

    const BirdieSvg = BirdieStages[stage];

  return (
    <div style={{ position: "absolute", zIndex: 2 }}>
        <BirdieSvg
            width={size*BirdieSize}
            height={size*BirdieSize}
            style={{position: "absolute"}}
            transform={`translate(${x - size*BirdieSize/2},${y - size*BirdieSize/2}) rotate(${rightRotationOffset + angle})`}
            ref={birdieRef}
        />
    </div>
  );
}

export default Birdie;