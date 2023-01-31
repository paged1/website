import React, { useRef } from "react";

import { AvatarSize } from "./constants";

// converted to jsx using: https://svg2jsx.com/

function Opponent({ x = 0, y = 0, message }: { x?: number, y?: number, message?: string }) {

    const playerRef = useRef<any>(null);

    return (
        <div style={{ position: "absolute", zIndex: 1 }}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width={AvatarSize}
                height={AvatarSize * 1.54}
                style={{position: "absolute"}}
                transform={`translate(${x - AvatarSize / 2},${y - AvatarSize * 1.54 / 2})`}
                ref={playerRef}
            >
                <g transform="translate(-308.485 -348.099)">
                    <g transform="translate(158.594 6.06)">
                        <path
                            fill="#0e2835"
                            d="M189.89 510.038h-8v-8h-8v-24h-16v-8h-8v-16h8v-16h8v-8h8v-8h8v-8h-8v-8h-8v-8h-8v-8h-8v-16h8v-8h8v-8h16v-8h8v-8h16v8h8v-8h24v8h8v24h8v16h-8v8h-8v8h-8v8h-8v8h8v8h8v8h8v16h8v16h-8v8h-16v24h-8v8h-16v-8h-8v8h-8z"
                        ></path>
                        <path
                            fill="#013449"
                            d="M189.89 510.038h-8v-8h-8v-24h-16v-8h-8v-16h8v-16h8v-8h8v-8h8v-8h-8v-8h-8v-8h-8v-8h-8v-16h8v-8h8v-8h16v-8h8v-8h16v8h8v-8h24v8h8v24h8v16h-8v8h-8v8h-8v8h-8v8h8v8h8v8h8v16h8v16h-8v8h-16v24h-8v8h-16v-8h-8v8h-8zm44-152h4v-8h-8v8h4z"
                        ></path>
                        <path
                            fill="#015267"
                            d="M189.89 510.038h-8v-8h-8v-24h-16v-8h-8v-16h8v-16h8v-8h8v-8h8v-8h-8v-8h-8v-8h-8v-8h-8v-16h8v-8h8v-8h16v-8h8v-8h16v8h8v-8h24v8h8v24h8v16h-8v8h-8v8h-8v8h-8v8h8v8h8v8h8v16h8v16h-8v8h-16v24h-8v8h-16v-8h-8v8h-8zm-20-64h4v-8h-8v8h4zm64 0h4v-8h-8v8h4zm0-88h4v-8h-8v8h4z"
                        ></path>
                        <path
                            fill="#2c4653"
                            d="M189.89 510.038h-8v-8h-8v-24h-16v-8h-8v-16h8v-16h8v-8h8v-8h8v-8h-8v-8h-8v-8h-8v-8h-8v-16h8v-8h8v-8h16v-8h8v-8h16v8h8v-8h24v8h8v24h8v16h-8v8h-8v8h-8v8h-8v8h8v8h8v8h8v16h8v16h-8v8h-16v24h-8v8h-16v-8h-8v8h-8zm-20-40h4v-8h-8v-8h8v-16h-8v16h-8v8h8v8h4zm64 0h4v-8h8v-8h-8v-16h-8v16h8v8h-8v8h4zm-32-48h12v-8h8v-32h-8v24h-8v-16h-8v-8h-8v8h-8v24h8v8h12zm-8-16h-4v-16h8v16h-4zm40-48h4v-8h-8v8h4z"
                        ></path>
                        <path
                            fill="#c42b01"
                            d="M189.89 510.038h-8v-8h-8v-24h-16v-8h-8v-16h8v-16h8v-8h8v-8h8v-8h-8v-8h-8v-8h-8v-8h-8v-16h8v-8h8v-8h16v-8h8v-8h16v8h8v-8h24v8h8v24h8v16h-8v8h-8v8h-8v8h-8v8h8v8h8v8h8v16h8v16h-8v8h-16v24h-8v8h-16v-8h-8v8h-8zm-20-40h4v-8h-8v-8h8v-16h-8v16h-8v8h8v8h4zm64 0h4v-8h8v-8h-8v-16h-8v16h8v8h-8v8h4zm-32-48h12v-8h8v-32h-8v24h-8v-16h-8v-8h-8v8h-8v24h8v8h12zm-8-16h-4v-16h8v16h-4zm-24-32h4v-8h-8v8h4zm24-8h4v-8h-8v8h4zm36-8h8v-8h-16v8h8z"
                        ></path>
                        <path
                            fill="#1f7085"
                            d="M189.89 510.038h-8v-8h-8v-24h-16v-8h-8v-16h8v-16h8v-8h8v-8h8v-8h-8v-8h-8v-8h-8v-8h-8v-16h8v-8h8v-8h16v-8h8v-8h16v8h8v-8h24v8h8v24h8v16h-8v8h-8v8h-8v8h-8v8h8v8h8v8h8v16h8v16h-8v8h-16v24h-8v8h-16v-8h-8v8h-8zm-20-40h4v-8h-8v-8h8v-16h-8v16h-8v8h8v8h4zm16 0h4v-8h-8v8h4zm32 0h4v-8h-8v8h4zm16 0h4v-8h8v-8h-8v-16h-8v16h8v8h-8v8h4zm-32-48h12v-8h8v-32h-8v24h-8v-16h-8v-8h-8v8h-8v24h8v8h12zm-8-16h-4v-16h8v16h-4zm-24-32h4v-8h-8v8h4zm24-8h4v-8h-8v8h4zm36-8h8v-8h-16v8h8z"
                        ></path>
                        <path
                            fill="#4a6471"
                            d="M189.89 510.038h-8v-8h-8v-24h-16v-8h-8v-16h8v-16h8v-8h8v-8h8v-8h-8v-8h-8v-8h-8v-8h-8v-16h8v-8h8v-8h16v-8h8v-8h16v8h8v-8h24v8h8v24h8v16h-8v8h-8v8h-8v8h-8v8h8v8h8v8h8v16h8v16h-8v8h-16v24h-8v8h-16v-8h-8v8h-8zm-24-40h8v-32h-8v16h-8v16h8zm20 0h4v-8h-8v8h4zm32 0h4v-8h-8v8h4zm20 0h8v-16h-8v-16h-8v32h8zm-36-48h12v-8h8v-40h-8v8h-16v-8h-8v8h-8v32h8v8h12zm-8-16h-4v-16h8v16h-4zm16 0h-4v-16h8v16h-4zm-40-32h4v-8h-8v8h4zm24-8h4v-8h-8v8h4zm36-8h8v-8h-16v8h8z"
                        ></path>
                        <path
                            fill="#e26701"
                            d="M189.89 510.038h-8v-8h-8v-24h-16v-8h-8v-16h8v-16h8v-8h8v-8h8v-8h-8v-8h-8v-8h-8v-8h-8v-16h8v-8h8v-8h16v-8h8v-8h16v8h8v-8h24v8h8v24h8v16h-8v8h-8v8h-8v8h-8v8h8v8h8v8h8v16h8v16h-8v8h-16v24h-8v8h-16v-8h-8v8h-8zm-24-40h8v-32h-8v16h-8v16h8zm20 0h4v-8h-8v8h4zm32 0h4v-8h-8v8h4zm20 0h8v-16h-8v-16h-8v32h8zm-36-48h12v-8h8v-40h-8v8h-16v-8h-8v8h-8v32h8v8h12zm-8-16h-4v-16h8v16h-4zm16 0h-4v-16h8v16h-4zm-40-32h4v-8h-8v8h4zm24-8h4v-8h-8v8h4zm32-8h12v-8h-24v8h12z"
                        ></path>
                        <path
                            fill="#ff6701"
                            d="M189.89 510.038h-8v-8h-8v-24h-16v-8h-8v-16h8v-16h8v-8h8v-8h8v-8h-8v-8h-8v-8h-8v-8h-8v-16h8v-8h8v-8h16v-8h8v-8h16v8h8v-8h24v8h8v24h8v16h-8v8h-8v8h-8v8h-8v8h8v8h8v8h8v16h8v16h-8v8h-16v24h-8v8h-16v-8h-8v8h-8zm4-24h4v-8h-8v8h4zm16 0h4v-8h-8v8h4zm-44-16h8v-32h-8v16h-8v16h8zm20 0h4v-8h-8v8h4zm32 0h4v-8h-8v8h4zm20 0h8v-16h-8v-16h-8v32h8zm-36-48h12v-8h8v-40h-8v8h-16v-8h-8v8h-8v32h8v8h12zm-8-16h-4v-16h8v16h-4zm16 0h-4v-16h8v16h-4zm-40-32h4v-8h-8v8h4zm24-8h4v-8h-8v8h4zm32-8h12v-8h-24v8h12z"
                        ></path>
                        <path
                            fill="#01afc4"
                            d="M189.89 510.038h-8v-8h-8v-24h-16v-8h-8v-16h8v-16h8v-8h8v-8h8v-8h-8v-8h-8v-8h-8v-8h-8v-16h8v-8h8v-8h16v-8h8v-8h16v8h8v-8h24v8h8v24h8v16h-8v8h-8v8h-8v8h-8v8h8v8h8v8h8v16h8v16h-8v8h-16v24h-8v8h-16v-8h-8v8h-8zm-4-16h4v-8h8v-8h8v8h8v8h8v-32h-8v8h-24v-8h-8v32h4zm-20-24h8v-32h-8v16h-8v16h8zm72 0h8v-16h-8v-16h-8v32h8zm-36-48h12v-8h8v-40h-8v8h-16v-8h-8v8h-8v32h8v8h12zm-8-16h-4v-16h8v16h-4zm16 0h-4v-16h8v16h-4zm-40-32h4v-8h-8v8h4zm24-8h4v-8h-8v8h4zm32-8h12v-8h-24v8h12z"
                        ></path>
                        <path
                            fill="#68828f"
                            d="M189.89 510.038h-8v-8h-8v-24h-16v-8h-8v-16h8v-16h8v-8h8v-8h8v-8h-8v-8h-8v-8h-8v-8h-8v-16h8v-8h8v-8h16v-8h8v-8h16v8h8v-8h24v8h8v24h8v16h-8v8h-8v8h-8v8h-8v8h8v8h8v8h8v16h8v16h-8v8h-16v24h-8v8h-16v-8h-8v8h-8zm-4-16h4v-8h8v-8h8v8h8v8h8v-32h-8v8h-24v-8h-8v32h4zm-20-24h8v-24h8v-8h8v16h8v8h8v-8h8v-16h8v8h8v24h16v-16h-8v-16h-8v-8h-8v-8h-8v-8h8v-40h-8v8h-16v-8h-8v8h-8v32h8v8h-8v8h-8v8h-8v16h-8v16h8zm36-40h-12v-8h24v8h-12zm-8-24h-4v-16h8v16h-4zm16 0h-4v-16h8v16h-4zm-40-32h4v-8h-8v8h4zm24-8h4v-8h-8v8h4zm32-8h12v-8h-24v8h12z"
                        ></path>
                        <path
                            fill="#ff851f"
                            d="M189.89 510.038h-8v-8h-8v-24h-16v-8h-8v-16h8v-16h8v-8h8v-8h8v-8h-8v-8h-8v-8h-8v-8h-8v-16h8v-8h8v-8h16v-8h8v-8h16v8h8v-8h24v8h8v24h8v16h-8v8h-8v8h-8v8h-8v8h8v8h8v8h8v16h8v16h-8v8h-16v24h-8v8h-16v-8h-8v8h-8zm-4-16h4v-8h8v-8h8v8h8v8h8v-32h-8v8h-24v-8h-8v32h4zm-20-24h8v-24h8v-8h8v16h8v8h8v-8h8v-16h8v8h8v24h16v-16h-8v-16h-8v-8h-8v-8h-8v-8h8v-40h-8v8h-16v-8h-8v8h-8v32h8v8h-8v8h-8v8h-8v16h-8v16h8zm36-40h-12v-8h24v8h-12zm-8-24h-4v-16h8v16h-4zm16 0h-4v-16h8v16h-4zm-48-24h4v-8h16v-8h-16v8h-8v8h4zm32-16h4v-8h-8v8h4zm16 0h4v-8h24v-8h-24v8h-8v8h4z"
                        ></path>
                        <path
                            fill="#1fcde2"
                            d="M189.89 510.038h-8v-8h-8v-24h-16v-8h-8v-16h8v-16h8v-8h8v-8h8v-8h-8v-8h-8v-8h-8v-8h-8v-16h8v-8h8v-8h16v-8h8v-8h16v8h8v-8h24v8h8v24h8v16h-8v8h-8v8h-8v8h-8v8h8v8h8v8h8v16h8v16h-8v8h-16v24h-8v8h-16v-8h-8v8h-8zm0-16h8v-16h8v16h16v-32h-8v8h-24v-8h-8v32h8zm-24-24h8v-24h8v-8h8v16h8v8h8v-8h8v-16h8v8h8v24h16v-16h-8v-16h-8v-8h-8v-8h-8v-8h8v-40h-8v8h-16v-8h-8v8h-8v32h8v8h-8v8h-8v8h-8v16h-8v16h8zm36-40h-12v-8h24v8h-12zm-8-24h-4v-16h8v16h-4zm16 0h-4v-16h8v16h-4zm-48-24h4v-8h16v-8h-16v8h-8v8h4zm32-16h4v-8h-8v8h4zm16 0h4v-8h24v-8h-24v8h-8v8h4z"
                        ></path>
                        <path
                            fill="#86a0ad"
                            d="M189.89 510.038h-8v-8h-8v-24h-16v-8h-8v-16h8v-16h8v-8h8v-8h8v-8h-8v-8h-8v-8h-8v-8h-8v-16h8v-8h8v-8h16v-8h8v-8h16v8h8v-8h24v8h8v24h8v16h-8v8h-8v8h-8v8h-8v8h8v8h8v8h8v16h8v16h-8v8h-16v24h-8v8h-16v-8h-8v8h-8zm0-16h8v-16h8v16h16v-32h-8v-8h8v-8h8v24h16v-16h-8v-16h-8v-8h-8v-8h-8v-8h8v-40h-8v8h-16v-8h-8v8h-8v32h8v8h-8v8h-8v8h-8v16h-8v16h16v-24h8v8h8v8h-8v32h8zm12-24h-12v-8h24v8h-12zm0-40h-12v-8h24v8h-12zm-8-24h-4v-16h8v16h-4zm16 0h-4v-16h8v16h-4zm-48-24h4v-8h16v-8h-16v8h-8v8h4zm32-16h4v-8h-8v8h4zm16 0h4v-8h24v-8h-24v8h-8v8h4z"
                        ></path>
                        <path
                            fill="#a4becb"
                            d="M189.89 510.038h-8v-8h-8v-24h-16v-8h-8v-16h8v-16h8v-8h8v-8h8v-8h-8v-8h-8v-8h-8v-8h-8v-16h8v-8h8v-8h16v-8h8v-8h16v8h8v-8h24v8h8v24h8v16h-8v8h-8v8h-8v8h-8v8h8v8h8v8h8v16h8v16h-8v8h-16v24h-8v8h-16v-8h-8v8h-8zm0-16h8v-16h8v16h16v-32h-8v-8h8v-8h8v24h16v-16h-8v-16h-8v-8h-8v-8h-8v-8h8v-40h-8v-8h8v-8h16v-8h-24v8h-8v-8h-16v8h-8v8h-16v8h-8v8h8v16h8v-16h-8v-8h16v40h8v8h-8v8h-8v8h-8v16h-8v16h16v-24h8v8h8v8h-8v32h8zm12-24h-12v-8h24v8h-12zm0-40h-12v-8h24v8h-12zm-8-24h-4v-16h8v16h-4zm16 0h-4v-16h8v16h-4zm-8-40h-4v-8h8v8h-4zm32 24h4v-16h-8v16h4z"
                        ></path>
                        <path
                            fill="#c2dce9"
                            d="M189.89 510.038h-8v-8h-8v-24h-16v-8h-8v-16h8v-16h8v-8h8v-8h8v-8h-8v-8h-8v-8h-8v-8h-8v-16h8v-8h8v-8h16v-8h8v-8h16v8h8v-8h24v8h8v24h8v16h-8v8h-8v8h-8v8h-8v8h8v8h8v8h8v16h8v16h-8v8h-16v24h-8v8h-16v-8h-8v8h-8zm-4-8h4v-8h8v-16h8v16h8v8h8v-40h-8v-8h8v-8h8v24h16v-16h-8v-16h-8v-8h-8v-8h-8v-8h8v-40h8v24h8v-8h8v-16h-16v-8h8v-16h-24v8h-8v-8h-16v8h-8v8h-16v8h-8v16h8v8h8v-24h8v40h8v8h-8v8h-8v8h-8v16h-8v16h16v-24h8v8h8v8h-8v40h4zm16-32h-12v-8h24v8h-12zm0-40h-12v-8h24v8h-12zm-8-24h-4v-16h8v16h-4zm16 0h-4v-16h8v16h-4zm-8-40h-4v-8h8v8h-4z"
                        ></path>
                        <path
                            fill="#fff"
                            d="M189.89 510.038h-8v-8h-8v-24h-16v-8h-8v-16h8v-16h8v-8h8v-8h8v-8h-8v-8h-8v-8h-8v-8h-8v-16h8v-8h8v-8h16v-8h8v-8h16v8h8v-8h24v8h8v24h8v16h-8v8h-8v8h-8v8h-8v8h8v8h8v8h8v16h8v16h-8v8h-16v24h-8v8h-16v-8h-8v8h-8zm0-8h8v-24h8v24h16v-40h-8v-8h8v-8h8v24h16v-16h-8v-16h-8v-8h-8v-8h-8v-8h8v-40h8v24h8v-8h8v-16h-16v-8h8v-16h-24v8h-8v-8h-16v8h-8v8h-16v8h-8v16h8v8h8v-24h8v40h8v8h-8v8h-8v8h-8v16h-8v16h16v-24h8v8h8v8h-8v40h8zm12-32h-12v-8h24v8h-12zm0-40h-12v-8h24v8h-12zm-8-24h-4v-16h8v16h-4zm16 0h-4v-16h8v16h-4zm-8-40h-4v-8h8v8h-4z"
                        ></path>
                    </g>
                </g>
            </svg>
            {message && (
                <div style={{position: "absolute", width: "200px", left: x - AvatarSize, top: y - AvatarSize, display: "flex"}}>
                    <div style={{
                        padding: 6,
                        fontFamily: "'VT323', monospace",
                        fontSize: 24,
                        borderRadius: "6px 6px 0 6px",
                        background: "linear-gradient(45deg, rgba(0,72,121,1) 0%, rgba(0,73,162,1) 39%, rgba(0,103,226,1) 100%)"
                }}>{message}</div>
                </div>
            )}
        </div>
    );
}

export default Opponent;