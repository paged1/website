import React, { useEffect, useState, useRef } from "react";

import { AvatarSize } from "./constants";

// converted to jsx using: https://svg2jsx.com/

function Avatar({ x = 0, y = 0 }: { x?: number, y?: number }) {

    const playerRef = useRef<any>(null);


    const [coordinates, setCoordinates] = useState({x: 0, y: 0})
    // direction will be based on the movement of the character, so 

    useEffect(() => {
        setCoordinates({
            x: x,
            y: y
        });
    }, [x, y]);
    // map x and y given angle to do actual 

    return (
        <div style={{ position: "absolute", zIndex: 1 }}>
            <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width={AvatarSize}
            height={AvatarSize*1.54}
            transform={`translate(${coordinates.x - AvatarSize/2},${coordinates.y - AvatarSize*1.54/2})`}
            ref={playerRef}
        >
        <g transform="translate(-308.485 -348.099)">
            <g transform="translate(158.594 6.06)">
            <path
                fill="#f1d7ca"
                d="M189.89 510.038h-8v-8h-8v-24h-16v-8h-8v-16h8v-16h8v-8h8v-8h8v-8h-8v-8h-8v-8h-8v-8h-8v-16h8v-8h8v-8h16v-8h8v-8h16v8h8v-8h24v8h8v24h8v16h-8v8h-8v8h-8v8h-8v8h8v8h8v8h8v16h8v16h-8v8h-16v24h-8v8h-16v-8h-8v8h-8z"
            ></path>
            <path
                fill="#fecbb6"
                d="M189.89 510.038h-8v-8h-8v-24h-16v-8h-8v-16h8v-16h8v-8h8v-8h8v-8h-8v-8h-8v-8h-8v-8h-8v-16h8v-8h8v-8h16v-8h8v-8h16v8h8v-8h24v8h8v24h8v16h-8v8h-8v8h-8v8h-8v8h8v8h8v8h8v16h8v16h-8v8h-16v24h-8v8h-16v-8h-8v8h-8zm44-152h4v-8h-8v8h4z"
            ></path>
            <path
                fill="#fead98"
                d="M189.89 510.038h-8v-8h-8v-24h-16v-8h-8v-16h8v-16h8v-8h8v-8h8v-8h-8v-8h-8v-8h-8v-8h-8v-16h8v-8h8v-8h16v-8h8v-8h16v8h8v-8h24v8h8v24h8v16h-8v8h-8v8h-8v8h-8v8h8v8h8v8h8v16h8v16h-8v8h-16v24h-8v8h-16v-8h-8v8h-8zm-20-64h4v-8h-8v8h4zm64 0h4v-8h-8v8h4zm0-88h4v-8h-8v8h4z"
            ></path>
            <path
                fill="#d3b9ac"
                d="M189.89 510.038h-8v-8h-8v-24h-16v-8h-8v-16h8v-16h8v-8h8v-8h8v-8h-8v-8h-8v-8h-8v-8h-8v-16h8v-8h8v-8h16v-8h8v-8h16v8h8v-8h24v8h8v24h8v16h-8v8h-8v8h-8v8h-8v8h8v8h8v8h8v16h8v16h-8v8h-16v24h-8v8h-16v-8h-8v8h-8zm-20-40h4v-8h-8v-8h8v-16h-8v16h-8v8h8v8h4zm64 0h4v-8h8v-8h-8v-16h-8v16h8v8h-8v8h4zm-32-48h12v-8h8v-32h-8v24h-8v-16h-8v-8h-8v8h-8v24h8v8h12zm-8-16h-4v-16h8v16h-4zm40-48h4v-8h-8v8h4z"
            ></path>
            <path
                fill="#3bd4fe"
                d="M189.89 510.038h-8v-8h-8v-24h-16v-8h-8v-16h8v-16h8v-8h8v-8h8v-8h-8v-8h-8v-8h-8v-8h-8v-16h8v-8h8v-8h16v-8h8v-8h16v8h8v-8h24v8h8v24h8v16h-8v8h-8v8h-8v8h-8v8h8v8h8v8h8v16h8v16h-8v8h-16v24h-8v8h-16v-8h-8v8h-8zm-20-40h4v-8h-8v-8h8v-16h-8v16h-8v8h8v8h4zm64 0h4v-8h8v-8h-8v-16h-8v16h8v8h-8v8h4zm-32-48h12v-8h8v-32h-8v24h-8v-16h-8v-8h-8v8h-8v24h8v8h12zm-8-16h-4v-16h8v16h-4zm-24-32h4v-8h-8v8h4zm24-8h4v-8h-8v8h4zm36-8h8v-8h-16v8h8z"
            ></path>
            <path
                fill="#e08f7a"
                d="M189.89 510.038h-8v-8h-8v-24h-16v-8h-8v-16h8v-16h8v-8h8v-8h8v-8h-8v-8h-8v-8h-8v-8h-8v-16h8v-8h8v-8h16v-8h8v-8h16v8h8v-8h24v8h8v24h8v16h-8v8h-8v8h-8v8h-8v8h8v8h8v8h8v16h8v16h-8v8h-16v24h-8v8h-16v-8h-8v8h-8zm-20-40h4v-8h-8v-8h8v-16h-8v16h-8v8h8v8h4zm16 0h4v-8h-8v8h4zm32 0h4v-8h-8v8h4zm16 0h4v-8h8v-8h-8v-16h-8v16h8v8h-8v8h4zm-32-48h12v-8h8v-32h-8v24h-8v-16h-8v-8h-8v8h-8v24h8v8h12zm-8-16h-4v-16h8v16h-4zm-24-32h4v-8h-8v8h4zm24-8h4v-8h-8v8h4zm36-8h8v-8h-16v8h8z"
            ></path>
            <path
                fill="#b59b8e"
                d="M189.89 510.038h-8v-8h-8v-24h-16v-8h-8v-16h8v-16h8v-8h8v-8h8v-8h-8v-8h-8v-8h-8v-8h-8v-16h8v-8h8v-8h16v-8h8v-8h16v8h8v-8h24v8h8v24h8v16h-8v8h-8v8h-8v8h-8v8h8v8h8v8h8v16h8v16h-8v8h-16v24h-8v8h-16v-8h-8v8h-8zm-24-40h8v-32h-8v16h-8v16h8zm20 0h4v-8h-8v8h4zm32 0h4v-8h-8v8h4zm20 0h8v-16h-8v-16h-8v32h8zm-36-48h12v-8h8v-40h-8v8h-16v-8h-8v8h-8v32h8v8h12zm-8-16h-4v-16h8v16h-4zm16 0h-4v-16h8v16h-4zm-40-32h4v-8h-8v8h4zm24-8h4v-8h-8v8h4zm36-8h8v-8h-16v8h8z"
            ></path>
            <path
                fill="#1d98fe"
                d="M189.89 510.038h-8v-8h-8v-24h-16v-8h-8v-16h8v-16h8v-8h8v-8h8v-8h-8v-8h-8v-8h-8v-8h-8v-16h8v-8h8v-8h16v-8h8v-8h16v8h8v-8h24v8h8v24h8v16h-8v8h-8v8h-8v8h-8v8h8v8h8v8h8v16h8v16h-8v8h-16v24h-8v8h-16v-8h-8v8h-8zm-24-40h8v-32h-8v16h-8v16h8zm20 0h4v-8h-8v8h4zm32 0h4v-8h-8v8h4zm20 0h8v-16h-8v-16h-8v32h8zm-36-48h12v-8h8v-40h-8v8h-16v-8h-8v8h-8v32h8v8h12zm-8-16h-4v-16h8v16h-4zm16 0h-4v-16h8v16h-4zm-40-32h4v-8h-8v8h4zm24-8h4v-8h-8v8h4zm32-8h12v-8h-24v8h12z"
            ></path>
            <path
                fill="#0098fe"
                d="M189.89 510.038h-8v-8h-8v-24h-16v-8h-8v-16h8v-16h8v-8h8v-8h8v-8h-8v-8h-8v-8h-8v-8h-8v-16h8v-8h8v-8h16v-8h8v-8h16v8h8v-8h24v8h8v24h8v16h-8v8h-8v8h-8v8h-8v8h8v8h8v8h8v16h8v16h-8v8h-16v24h-8v8h-16v-8h-8v8h-8zm4-24h4v-8h-8v8h4zm16 0h4v-8h-8v8h4zm-44-16h8v-32h-8v16h-8v16h8zm20 0h4v-8h-8v8h4zm32 0h4v-8h-8v8h4zm20 0h8v-16h-8v-16h-8v32h8zm-36-48h12v-8h8v-40h-8v8h-16v-8h-8v8h-8v32h8v8h12zm-8-16h-4v-16h8v16h-4zm16 0h-4v-16h8v16h-4zm-40-32h4v-8h-8v8h4zm24-8h4v-8h-8v8h4zm32-8h12v-8h-24v8h12z"
            ></path>
            <path
                fill="#fe503b"
                d="M189.89 510.038h-8v-8h-8v-24h-16v-8h-8v-16h8v-16h8v-8h8v-8h8v-8h-8v-8h-8v-8h-8v-8h-8v-16h8v-8h8v-8h16v-8h8v-8h16v8h8v-8h24v8h8v24h8v16h-8v8h-8v8h-8v8h-8v8h8v8h8v8h8v16h8v16h-8v8h-16v24h-8v8h-16v-8h-8v8h-8zm-4-16h4v-8h8v-8h8v8h8v8h8v-32h-8v8h-24v-8h-8v32h4zm-20-24h8v-32h-8v16h-8v16h8zm72 0h8v-16h-8v-16h-8v32h8zm-36-48h12v-8h8v-40h-8v8h-16v-8h-8v8h-8v32h8v8h12zm-8-16h-4v-16h8v16h-4zm16 0h-4v-16h8v16h-4zm-40-32h4v-8h-8v8h4zm24-8h4v-8h-8v8h4zm32-8h12v-8h-24v8h12z"
            ></path>
            <path
                fill="#977d70"
                d="M189.89 510.038h-8v-8h-8v-24h-16v-8h-8v-16h8v-16h8v-8h8v-8h8v-8h-8v-8h-8v-8h-8v-8h-8v-16h8v-8h8v-8h16v-8h8v-8h16v8h8v-8h24v8h8v24h8v16h-8v8h-8v8h-8v8h-8v8h8v8h8v8h8v16h8v16h-8v8h-16v24h-8v8h-16v-8h-8v8h-8zm-4-16h4v-8h8v-8h8v8h8v8h8v-32h-8v8h-24v-8h-8v32h4zm-20-24h8v-24h8v-8h8v16h8v8h8v-8h8v-16h8v8h8v24h16v-16h-8v-16h-8v-8h-8v-8h-8v-8h8v-40h-8v8h-16v-8h-8v8h-8v32h8v8h-8v8h-8v8h-8v16h-8v16h8zm36-40h-12v-8h24v8h-12zm-8-24h-4v-16h8v16h-4zm16 0h-4v-16h8v16h-4zm-40-32h4v-8h-8v8h4zm24-8h4v-8h-8v8h4zm32-8h12v-8h-24v8h12z"
            ></path>
            <path
                fill="#007ae0"
                d="M189.89 510.038h-8v-8h-8v-24h-16v-8h-8v-16h8v-16h8v-8h8v-8h8v-8h-8v-8h-8v-8h-8v-8h-8v-16h8v-8h8v-8h16v-8h8v-8h16v8h8v-8h24v8h8v24h8v16h-8v8h-8v8h-8v8h-8v8h8v8h8v8h8v16h8v16h-8v8h-16v24h-8v8h-16v-8h-8v8h-8zm-4-16h4v-8h8v-8h8v8h8v8h8v-32h-8v8h-24v-8h-8v32h4zm-20-24h8v-24h8v-8h8v16h8v8h8v-8h8v-16h8v8h8v24h16v-16h-8v-16h-8v-8h-8v-8h-8v-8h8v-40h-8v8h-16v-8h-8v8h-8v32h8v8h-8v8h-8v8h-8v16h-8v16h8zm36-40h-12v-8h24v8h-12zm-8-24h-4v-16h8v16h-4zm16 0h-4v-16h8v16h-4zm-48-24h4v-8h16v-8h-16v8h-8v8h4zm32-16h4v-8h-8v8h4zm16 0h4v-8h24v-8h-24v8h-8v8h4z"
            ></path>
            <path
                fill="#e0321d"
                d="M189.89 510.038h-8v-8h-8v-24h-16v-8h-8v-16h8v-16h8v-8h8v-8h8v-8h-8v-8h-8v-8h-8v-8h-8v-16h8v-8h8v-8h16v-8h8v-8h16v8h8v-8h24v8h8v24h8v16h-8v8h-8v8h-8v8h-8v8h8v8h8v8h8v16h8v16h-8v8h-16v24h-8v8h-16v-8h-8v8h-8zm0-16h8v-16h8v16h16v-32h-8v8h-24v-8h-8v32h8zm-24-24h8v-24h8v-8h8v16h8v8h8v-8h8v-16h8v8h8v24h16v-16h-8v-16h-8v-8h-8v-8h-8v-8h8v-40h-8v8h-16v-8h-8v8h-8v32h8v8h-8v8h-8v8h-8v16h-8v16h8zm36-40h-12v-8h24v8h-12zm-8-24h-4v-16h8v16h-4zm16 0h-4v-16h8v16h-4zm-48-24h4v-8h16v-8h-16v8h-8v8h4zm32-16h4v-8h-8v8h4zm16 0h4v-8h24v-8h-24v8h-8v8h4z"
            ></path>
            <path
                fill="#795f52"
                d="M189.89 510.038h-8v-8h-8v-24h-16v-8h-8v-16h8v-16h8v-8h8v-8h8v-8h-8v-8h-8v-8h-8v-8h-8v-16h8v-8h8v-8h16v-8h8v-8h16v8h8v-8h24v8h8v24h8v16h-8v8h-8v8h-8v8h-8v8h8v8h8v8h8v16h8v16h-8v8h-16v24h-8v8h-16v-8h-8v8h-8zm0-16h8v-16h8v16h16v-32h-8v-8h8v-8h8v24h16v-16h-8v-16h-8v-8h-8v-8h-8v-8h8v-40h-8v8h-16v-8h-8v8h-8v32h8v8h-8v8h-8v8h-8v16h-8v16h16v-24h8v8h8v8h-8v32h8zm12-24h-12v-8h24v8h-12zm0-40h-12v-8h24v8h-12zm-8-24h-4v-16h8v16h-4zm16 0h-4v-16h8v16h-4zm-48-24h4v-8h16v-8h-16v8h-8v8h4zm32-16h4v-8h-8v8h4zm16 0h4v-8h24v-8h-24v8h-8v8h4z"
            ></path>
            <path
                fill="#5b4134"
                d="M189.89 510.038h-8v-8h-8v-24h-16v-8h-8v-16h8v-16h8v-8h8v-8h8v-8h-8v-8h-8v-8h-8v-8h-8v-16h8v-8h8v-8h16v-8h8v-8h16v8h8v-8h24v8h8v24h8v16h-8v8h-8v8h-8v8h-8v8h8v8h8v8h8v16h8v16h-8v8h-16v24h-8v8h-16v-8h-8v8h-8zm0-16h8v-16h8v16h16v-32h-8v-8h8v-8h8v24h16v-16h-8v-16h-8v-8h-8v-8h-8v-8h8v-40h-8v-8h8v-8h16v-8h-24v8h-8v-8h-16v8h-8v8h-16v8h-8v8h8v16h8v-16h-8v-8h16v40h8v8h-8v8h-8v8h-8v16h-8v16h16v-24h8v8h8v8h-8v32h8zm12-24h-12v-8h24v8h-12zm0-40h-12v-8h24v8h-12zm-8-24h-4v-16h8v16h-4zm16 0h-4v-16h8v16h-4zm-8-40h-4v-8h8v8h-4zm32 24h4v-16h-8v16h4z"
            ></path>
            <path
                fill="#3d2316"
                d="M189.89 510.038h-8v-8h-8v-24h-16v-8h-8v-16h8v-16h8v-8h8v-8h8v-8h-8v-8h-8v-8h-8v-8h-8v-16h8v-8h8v-8h16v-8h8v-8h16v8h8v-8h24v8h8v24h8v16h-8v8h-8v8h-8v8h-8v8h8v8h8v8h8v16h8v16h-8v8h-16v24h-8v8h-16v-8h-8v8h-8zm-4-8h4v-8h8v-16h8v16h8v8h8v-40h-8v-8h8v-8h8v24h16v-16h-8v-16h-8v-8h-8v-8h-8v-8h8v-40h8v24h8v-8h8v-16h-16v-8h8v-16h-24v8h-8v-8h-16v8h-8v8h-16v8h-8v16h8v8h8v-24h8v40h8v8h-8v8h-8v8h-8v16h-8v16h16v-24h8v8h8v8h-8v40h4zm16-32h-12v-8h24v8h-12zm0-40h-12v-8h24v8h-12zm-8-24h-4v-16h8v16h-4zm16 0h-4v-16h8v16h-4zm-8-40h-4v-8h8v8h-4z"
            ></path>
            <path
                fill="#000"
                d="M189.89 510.038h-8v-8h-8v-24h-16v-8h-8v-16h8v-16h8v-8h8v-8h8v-8h-8v-8h-8v-8h-8v-8h-8v-16h8v-8h8v-8h16v-8h8v-8h16v8h8v-8h24v8h8v24h8v16h-8v8h-8v8h-8v8h-8v8h8v8h8v8h8v16h8v16h-8v8h-16v24h-8v8h-16v-8h-8v8h-8zm0-8h8v-24h8v24h16v-40h-8v-8h8v-8h8v24h16v-16h-8v-16h-8v-8h-8v-8h-8v-8h8v-40h8v24h8v-8h8v-16h-16v-8h8v-16h-24v8h-8v-8h-16v8h-8v8h-16v8h-8v16h8v8h8v-24h8v40h8v8h-8v8h-8v8h-8v16h-8v16h16v-24h8v8h8v8h-8v40h8zm12-32h-12v-8h24v8h-12zm0-40h-12v-8h24v8h-12zm-8-24h-4v-16h8v16h-4zm16 0h-4v-16h8v16h-4zm-8-40h-4v-8h8v8h-4z"
            ></path>
            </g>
        </g>
        </svg>
            
        </div>
    );
}

export default Avatar;