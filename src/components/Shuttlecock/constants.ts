import { ReactComponent as BirdieBack } from "../../assets/birdie-back.svg";
import { ReactComponent as BirdieTop } from "../../assets/birdie-top.svg";
import { ReactComponent as BirdieSide } from "../../assets/birdie-side.svg";
import { ReactComponent as BirdieQuarter } from "../../assets/birdie-quarter.svg";

// Court dimensions: (i am using a conversion of 32px/ft)
// from post to service line: 6.5 ft (182px)
// full court length: 44 ft (1232px)
// singles court width: 17 ft (476px)
export const CourtDimensions = {
    // number of pixels between court and end of game window
    spaceToWall: 56,
    service: 182, // service line to post
    width: 1232, // court length
    height: 476, // court width
    lineWidth: 4
}

export const FloorColor = "#ee9f27";

// avatar size in pixels
export const AvatarSize = 104;
export const BirdieSize = 32;
export const CrosshairSize = 36;

// interval between attempted swings
export const SwingInterval = 300;

export const PlayerProperties = {
    // number of pixels to move every interval
    displacement: 20,
    // number of milliseconds between next displacement
    interval: 12,
    swingRange: 200
};

export const BirdieProperties = {
    displacement: 2,
    interval: 12,
}

export const OpponentProperties = {
    // reaction time in milliseconds
    reactionTime: 100,
    displacement: 8,
    interval: 12,
    swingRange: 50
}


export type Position = {
    x: number;
    y: number;
}

// some service positions

export const ServicePositions = {
    // even score
    0: {
        player: {
            x: CourtDimensions.width/2 - CourtDimensions.service*2,
            y: CourtDimensions.height/2 + AvatarSize/2
        },
        opponent: {
            x: CourtDimensions.width/2 + CourtDimensions.service*2,
            y: CourtDimensions.height/2 - AvatarSize/2
        }
    },
    1: {
        player: {
            x: CourtDimensions.width/2 - CourtDimensions.service*2,
            y: CourtDimensions.height/2 - AvatarSize/2
        },
        opponent: {
            x: CourtDimensions.width/2 + CourtDimensions.service*2,
            y: CourtDimensions.height/2 + AvatarSize/2
        }
    }
}

export enum Stage {
    Up = "up",
    Rise = "rise",
    Middle = "middle",
    Down = "down"
}

export const BirdieStages = {
    'up': BirdieTop,
    'rise': BirdieQuarter,
    'middle': BirdieSide,
    'down': BirdieBack
}