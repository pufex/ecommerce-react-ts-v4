import {useState, useEffect, useRef} from "react"
import { useNavigate } from "react-router-dom"
import { useIconsContext } from "../../contexts/Icon"

import {Link} from "react-router-dom"

import "./ErrorComponent.css"

const ErrorComponent = () => {

    const navigate = useNavigate()

    const {IoSadOutline} = useIconsContext()
    
    const [seconds, setSeconds] = useState<number>(500)

    const intervalRef = useRef<number>()

    useEffect(() => {
        // @ts-expect-error: Type error - fix later...
        intervalRef.current = setInterval(() => {
            setSeconds((previous) => {
                if(previous - 1 <= 0){
                    navigate("/?scroll=to-nav");
                    return 0;
                }
                else return previous - 1
            })
        }, 1000)
        return () => {
            clearInterval(intervalRef.current)
        }
    }, [])
    

    return <main className="error__main">
        <header className="error__info">
            <h1 className="error__heading">
                Ooops...
            </h1>
            <IoSadOutline 
                className="error__icon"
                size={80}
            />
        </header>
        <p className="error__description">
            Are you lost? <Link to="/" className="error__link">Go home</Link> or get placed there in {seconds} seconds...
        </p>
    </main>
}

export default ErrorComponent
