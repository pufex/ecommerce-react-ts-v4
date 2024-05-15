import { useIconsContext } from "../../contexts/Icon"

import "./Loading.css"

const Loading = () => {
    
    const { 
        AiOutlineLoading3Quarters, 
    } = useIconsContext();

    return <div className="loading-page__container">
        <div className="loading-page__loading-container">
            <AiOutlineLoading3Quarters 
                size={40}
                className="loading-page__loading-itself"
            />
        </div>
    </div>
}

export default Loading
