import { CourtDimensions } from "./constants";

const CenterLine = () => (
    <div
        style={{
            position: "absolute",
            width: CourtDimensions.width,
            border: "none",
            borderTop: "solid",
            borderWidth: CourtDimensions.lineWidth,
            top:(CourtDimensions.height/2) - CourtDimensions.lineWidth,
        }} 
    />
)
export default CenterLine;