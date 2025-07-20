
import { ChevronRight,ChevronLeft } from "react-bootstrap-icons";
import './Arrows.scss'
export const CustomNextArrow = ({ onClick, className = null, children = <ChevronRight size="25" /> }) => {
    return (
        <div className={`custom-right p-10${className ? ' ' + className : ''}`} onClick={onClick}>
            {
                children
            }
        </div>
    );
}

export const CustomPrevArrow = ({ onClick, className = null, children = <ChevronLeft size="25" />,
}) => {
    return (
        <div className={`custom-left p-10${className ? ' ' + className : ''}`} onClick={onClick}>
            {
                children
            }
        </div>
    );
}
