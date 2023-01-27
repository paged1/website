import React, { useState, useRef, useEffect } from "react";
import { BirdieSize } from "./constants";

// converted to jsx using: https://svg2jsx.com/

function Birdie({size = BirdieSize, angle = 0, x = 0, y = 0}: {size?: number, angle?: number, x?: number, y?: number}) {
    // default angle to point the birdie directly down
    const downRotationOffset = 0;//-12;

    const birdieRef = useRef(null);

    // const [coordinates, setCoordinates] = useState({x: 0, y: 0})

    // useEffect(() => {
    //     //console.log('coordinates', x, y);
    //     setCoordinates({
    //         x,
    //         y
    //     });
    // }, [x, y]);

  return (
    <div style={{ position: "absolute", zIndex: 2 }}>
        <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                viewBox="0 0 185.44 246.8"
                width={size*BirdieSize}
                height={size*BirdieSize}
                transform={`rotate(${downRotationOffset}) translate(${x - size/2},${y - size/2})`}
                ref={birdieRef}
            >
                <defs>
                    <linearGradient id="linearGradient5028">
                        <stop offset="0" stopColor="#dbe2e3"></stop>
                        <stop offset="1" stopColor="#d7eef4"></stop>
                    </linearGradient>
                    <linearGradient
                        id="linearGradient3182"
                        x1="981.15"
                        x2="926.09"
                        y1="-365.14"
                        y2="-475.27"
                        gradientTransform="translate(1)"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0" stopColor="#bdbdbd"></stop>
                        <stop offset="1" stopColor="#afdde9"></stop>
                    </linearGradient>
                    <linearGradient
                        id="linearGradient3184"
                        x1="983.03"
                        x2="964.26"
                        y1="-367.02"
                        y2="-464.01"
                        gradientTransform="translate(1)"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0" stopColor="#bdbdbd"></stop>
                        <stop offset="1" stopColor="#d7eef4"></stop>
                    </linearGradient>
                    <linearGradient
                        id="linearGradient3186"
                        x1="981.78"
                        x2="1005.6"
                        y1="-352.31"
                        y2="-453.06"
                        gradientTransform="translate(2)"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0" stopColor="#bdbdbd"></stop>
                        <stop offset="1" stopColor="#d7eef4"></stop>
                    </linearGradient>
                    <linearGradient
                        id="linearGradient3188"
                        x1="1004.9"
                        x2="1025.6"
                        y1="-322.9"
                        y2="-454.31"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0" stopColor="#bdbdbd"></stop>
                        <stop offset="1" stopColor="#d7eef4"></stop>
                    </linearGradient>
                    <linearGradient
                        id="linearGradient3190"
                        x1="1038.1"
                        x2="1054.4"
                        y1="-362.95"
                        y2="-474.33"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0" stopColor="#dbe2e3"></stop>
                        <stop offset="1" stopColor="#d7eef4"></stop>
                    </linearGradient>
                    <linearGradient
                        id="linearGradient3192"
                        x1="1048.1"
                        x2="1086.9"
                        y1="-356.69"
                        y2="-417.39"
                        gradientUnits="userSpaceOnUse"
                        xlinkHref="#linearGradient5028"
                    ></linearGradient>
                    <linearGradient
                        id="linearGradient3194"
                        x1="1073.1"
                        x2="1091.9"
                        y1="-368.89"
                        y2="-453.99"
                        gradientUnits="userSpaceOnUse"
                        xlinkHref="#linearGradient5028"
                    ></linearGradient>
                    <linearGradient
                        id="linearGradient3196"
                        x1="1046.9"
                        x2="1131.3"
                        y1="-309.14"
                        y2="-491.85"
                        gradientTransform="translate(-1)"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0" stopColor="#bdbdbd"></stop>
                        <stop offset="1" stopColor="#afdde9"></stop>
                    </linearGradient>
                    <linearGradient
                        id="linearGradient3211"
                        x1="742.22"
                        x2="852.17"
                        y1="-209.75"
                        y2="-209.75"
                        gradientTransform="matrix(1.0512 .23623 -.23623 1.0512 -617.97 172.1)"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0" stopColor="silver"></stop>
                        <stop offset="1" stopColor="#dedede"></stop>
                    </linearGradient>
                    <linearGradient
                        id="linearGradient3214"
                        x1="763.71"
                        x2="834.73"
                        y1="-161.4"
                        y2="-161.4"
                        gradientTransform="translate(-566.77 303.76) scale(1.0774)"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0" stopColor="#500"></stop>
                        <stop offset="0.461" stopColor="#500"></stop>
                        <stop offset="0.782" stopColor="#a00"></stop>
                        <stop offset="1" stopColor="#500"></stop>
                    </linearGradient>
                    <radialGradient
                        id="radialGradient3217"
                        cx="776.55"
                        cy="-104.48"
                        r="35.278"
                        gradientTransform="matrix(1.8414 .41762 -.36697 1.6181 -1248.6 86.73)"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0" stopColor="#666"></stop>
                        <stop offset="1" stopColor="#e6e6e6"></stop>
                    </radialGradient>
                    <linearGradient
                        id="linearGradient3220"
                        x1="1081.3"
                        x2="978.67"
                        y1="-233.34"
                        y2="-231.77"
                        gradientTransform="rotate(12.665 -1082.592 -4131.583) scale(1.14137)"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0" stopColor="#b3b3b3"></stop>
                        <stop offset="1" stopColor="#ececec"></stop>
                    </linearGradient>
                </defs>
                <g transform="translate(-180.1 13.668) scale(.92012)">
                    <g transform="matrix(1.1648 .26176 -.27878 1.2406 -1025.9 311.48)">
                        <path
                            fill="url(#linearGradient3182)"
                            d="M941.48-460.25l-.626 9.386 26.281 65.076 14.392 16.895-32.538-88.229z"
                        ></path>
                        <path
                            fill="url(#linearGradient3184)"
                            d="M947.24-457.75l8.134-6.883 15.018 10.012 16.27 70.708-5.632 14.392z"
                        ></path>
                        <path
                            fill="url(#linearGradient3186)"
                            d="M969.39-455.25l9.386-9.386 16.895 10.637 14.392 67.579-10.637 18.772-12.515-11.889z"
                        ></path>
                        <path
                            fill="url(#linearGradient3188)"
                            d="M1000.5-385.79l15.643 15.018 14.392-13.766v-72.585l-16.269-9.386-18.146 13.14z"
                        ></path>
                        <path
                            fill="url(#linearGradient3190)"
                            d="M1031.8-458.37l16.895-10.012 15.018 9.386-11.263 76.965-8.76 11.889-13.766-11.889.626-78.843z"
                        ></path>
                        <path
                            fill="url(#linearGradient3192)"
                            d="M1064.4-460.88l12.515-5.006 10.012 8.135-21.275 78.217-5.006 10.637-10.638-11.89z"
                        ></path>
                        <path
                            fill="url(#linearGradient3194)"
                            d="M1086.9-461.5l14.392-3.129 5.006 13.766-27.532 78.217-5.632 5.632-9.386-10.012z"
                        ></path>
                        <path
                            fill="url(#linearGradient3196)"
                            d="M1100.3-458.37l9.386-10.012 3.129 15.643-33.164 81.345z"
                        ></path>
                    </g>
                    <path
                        fill="url(#linearGradient3220)"
                        d="M324.67 12.969l-3.288-.008-60.312 175.67 9.935 2.964 53.666-178.62zm-38.59-5.747l-3.21-.356-33.66 179.09 9.7 2.545 27.176-181.28zm66.189 14.874l-79.018 169.27 10.596 1.65.016-.07 7.771 1.856-2.147 3.539 3.528 1.706 46.829-79.224-3.157.059-37.425 61.45 77.808-151.52-3.043-.94-84.826 150.38 66.235-157.45-3.166-.711zM239.679-2.838l-2.354 187.96 9.63 1.067-4.144-188.32-3.132-.704zm-24.707-4.09l-2.4.923 15.303 175.91-10.529-75.48-3.144 1.304 10.41 89.674 5.276-1.191-.499-3.475 7.17 1.282L214.97-6.931z"
                    ></path>
                    <path
                        fill="url(#radialGradient3217)"
                        d="M219.71 190.78c-6.432 24.544-3.727 42.406 7.844 52.63 2.049 2.51 3.754 3.74 6.532 5.022 3.283 1.515 6.96 2.683 10.751 3.452 3.76.93 7.606 1.452 11.227 1.487 3.062.03 5.125-.351 8.054-1.745 14.829-4.293 24.92-19.282 29.606-44.215l-2.037-.457-69.94-15.717-2.037-.458z"
                    ></path>
                    <path
                        fill="url(#linearGradient3214)"
                        d="M256.08 121.77H332.601V137.951H256.08z"
                        transform="rotate(12.665)"
                    ></path>
                    <path
                        fill="url(#linearGradient3211)"
                        d="M215.29 111.54l.974 4.363 112.12 26.172 2.386-4.096zm4.276 29.897l1.125 3.688 92.79 20.85 2.286-3.653z"
                    ></path>
                </g>
            </svg>
    </div>
  );
}

export default Birdie;