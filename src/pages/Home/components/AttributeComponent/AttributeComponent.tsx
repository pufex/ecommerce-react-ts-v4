import type { IconType } from "react-icons"
import "./AttributeComponent.css"

type AttributeComponentProps = {
    src?: string,
    Icon?: IconType,
    title: string,
    children: string,
}

const AttributeComponent = ({
    src,
    Icon, 
    title, 
    children,
}:AttributeComponentProps) => {
    return <div className="attribute-container">
        <div className="attribute--top">
            {
                Icon 
                    ?<Icon 
                        className="attribute__icon"
                        size={80}
                    />
                    : <img 
                        className="attribute__image"
                        src={src} 
                        alt={`${title} icon`}
                    />
            }
        </div>
        <div className="attribute--bottom">
            <h1 className="attribute__title">
                {title}
            </h1>
            <p className="attribute__description">
                {children}
            </p>
        </div>
    </div>
}

export default AttributeComponent
