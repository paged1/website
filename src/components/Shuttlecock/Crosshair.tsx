import React from "react";
import { CrosshairSize } from "./constants";

function Crosshair({x, y}: {x: number, y: number}) {
  return (
    <div style={{position: "absolute", zIndex: 2}}> 
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={CrosshairSize}
      height={CrosshairSize}
      version="1.1"
      viewBox="0 0 474.27 474.27"
      xmlSpace="preserve"
      transform={`translate(${x-CrosshairSize/2},${y - CrosshairSize/2})`}
    >
      <g fill="#010002">
        <path d="M237.135 474.27c130.968 0 237.135-106.167 237.135-237.135S368.103 0 237.135 0 0 106.167 0 237.135 106.167 474.27 237.135 474.27zM60.639 200.556C75.197 130.212 130.87 74.742 201.32 60.485v65.557h73.157V60.81c69.727 14.753 124.7 69.914 139.161 139.746h-66.167v73.157h66.167c-14.453 69.833-69.434 124.993-139.161 139.746v-65.232H201.32v65.557c-70.45-14.266-126.123-69.727-140.681-140.072h66.167v-73.157H60.639z"></path>
        <circle cx="239.842" cy="237.135" r="18.964"></circle>
      </g>
    </svg>
    </div>
  );
}

export default Crosshair;