import { CourtDimensions } from "./constants";

const ServiceLine = () => (
    <div 
        style={{
            position: "absolute",
            height: CourtDimensions.height,
            border: "none",
            borderRight: "dotted",
            borderWidth: CourtDimensions.lineWidth,
            borderColor: "#000",
            left: CourtDimensions.width/2
        }} 
    />
)
export default ServiceLine;