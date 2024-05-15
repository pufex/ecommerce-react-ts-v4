import { useIconsContext } from "../../../../contexts/Icon";
import SearchLocation from "../../../../components/SearchLocation/SearchLocation";

import "./Hero.css"

const Hero = () => {

    const { FaLocationDot } = useIconsContext()    

    return <div className="hero__container">
        <div className="hero"> 
            <div className="hero__content">
                <div className="hero__header">
                    <h1 className="hero__heading">
                        Ship Products Now!
                    </h1>
                    <p className="hero__paragraph">
                        With our system of delivery centers around the Poland, we can deliver you any purchases from our partners to your home any time!
                    </p>
                    <span className="hero__location">
                        <FaLocationDot 
                            className="hero__location-icon"
                            size={25}
                        />
                        <span className="hero__location-name">
                            POLAND
                        </span>
                    </span>
                    <SearchLocation />
                </div>
            </div>
        </div>
    </div>
    
}

export default Hero
