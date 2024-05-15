import { useIconsContext } from "../../../contexts/Icon"

import "./LoadingIcon.css"

const LoadingIcon = () => {
    
    const {AiOutlineLoading3Quarters} = useIconsContext();

    return <div className="button--loading-icon__container">
        <AiOutlineLoading3Quarters
            className="button--loading-icon"
            size={35}
        />
    </div>
}

export default LoadingIcon
