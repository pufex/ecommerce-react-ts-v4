import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useIconsContext } from "../../contexts/Icon"

import { Link } from "react-router-dom"

import "./Conclusion.css"

const Conclusion = () => {

    let navigate = useNavigate();

    const { FaRegSmile } = useIconsContext();

    const [seconds, setSeconds] = useState<number>(5)

    const intervalId = useRef<number | undefined>()

    useEffect(() => {
        // @ts-expect-error: bullshit error
        intervalId.current = setInterval(() => {
            setSeconds((previous) => {
                if(previous - 1 <= 0){
                    navigate("/?scroll=to-nav");
                    return 0;
                }
                else return previous - 1
            })
        }, 1000)
        return () => {
            clearInterval(intervalId.current)
        }
    }, [])

    return <main className="conclusion__main">
        <header className='conclusion__header'>
            <h1 className="conclusion__heading">
                <span className="conclusion__heading-content"> 
                    Thank you!
                </span>
                <FaRegSmile 
                    className="conclusion__icon"
                    size={70}
                />
            </h1>
            <p className="conclusion__information">
                Your order is underway! <Link to="/" className="conclusion__link">Go home</Link> or get moved there in {seconds}...
            </p>
        </header>
    </main>
}

export default Conclusion
