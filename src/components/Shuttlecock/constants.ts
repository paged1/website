


// Court dimensions: (i am using a conversion of 36px/ft)
// from post to service line: 6.5 ft (234px)
// full court length: 44 ft (1584px)
// singles court width: 17 ft (612px)
export const CourtDimensions = {
    // number of pixels between court and end of game window
    spaceToWall: 60,
    height: 612, // court width
    width: 1584, // court length
    service: 234, // service line to post
    lineWidth: 4
}

export const FloorColor = "#ee9f27";

// avatar size in pixels
export const AvatarSize = 104;
export const BirdieSize = 24;
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