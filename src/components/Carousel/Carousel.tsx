import { useState } from "react"
import { useIconsContext } from "../../contexts/Icon"

import "./Carousel.css"

type CarouselProps = {
    title?: string,
    photos: string[],
}

const Carousel = ({title, photos}:CarouselProps) => {

    const {
        MdKeyboardArrowLeft,
        MdKeyboardArrowRight,
    } = useIconsContext();

    const [currentPhoto, setCurrentPhoto] = useState<number>(0);

    const previousPhoto = () => {
        setCurrentPhoto((previous) => {
            if(previous <= 0)
                return previous
            else return previous - 1
        })
    }

    const nextPhoto = () => {
        setCurrentPhoto((previous) => {
            if(previous >= photos.length-1)
                return previous
            else return previous + 1
        })
    }

    return <div className="carousel-container">
        <div className="carousel__photos">
            {
                photos.map((photo, index) => {
                    return <img
                        className="carousel__photo"
                        alt={`${title ?? ""} ${index}`}
                        src={photo}
                        style={{
                            transform: `translateX(-${currentPhoto*100}%)`
                        }}
                    />
                })
            }
        </div>
        {
            currentPhoto == 0 
                ? null
                : <button 
                    className="btn btn--carousel btn--carousel-left"
                    onClick={previousPhoto}
                >
                    <MdKeyboardArrowLeft 
                        className="btn--carousel-icon"
                        size={50}
                    />
                </button>
        }
        {
            currentPhoto == photos.length-1
                ? null 
                : <button 
                    className="btn btn--carousel btn--carousel-right"
                    onClick={nextPhoto}
                >
                    <MdKeyboardArrowRight 
                        className="btn--carousel-icon"
                        size={50}
                    />
                </button>
        }
    </div>
    
}

export default Carousel
