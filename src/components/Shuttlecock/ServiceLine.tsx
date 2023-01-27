import { CourtDimensions } from "./constants";

const ServiceLine = () => (
    <div 
        style={{
            position: "absolute",
            width: CourtDimensions.service*2,
            height: CourtDimensions.height,
            border: "solid",
            borderWidth: CourtDimensions.lineWidth,
            top: -CourtDimensions.lineWidth,
            left: (CourtDimensions.width/2)-(CourtDimensions.service)
        }} 
    />
)
export default ServiceLine;