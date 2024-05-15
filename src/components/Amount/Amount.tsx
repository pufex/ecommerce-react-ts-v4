import { useIconsContext } from "../../contexts/Icon"
import "./Amount.css"

type AmountProps = {
    value: number,
    onIncrease: () => void,
    onDecrease: () => void,
}

const Amount = ({
    value,
    onIncrease,
    onDecrease
}:AmountProps) => {

    const {
        FaMinus,
        FaPlus,
    } = useIconsContext();

    return <div className="amount-container">
        <button
            className="btn btn--amount btn--decrement"
            onClick={onDecrease}
            type="button"
        >
            <FaMinus
                size={20}
                className="amount-icon"
            />
        </button>
        <span className="amount-input">
            {value}
        </span>
        <button
            className="btn btn--amount btn--decrement"
            onClick={onIncrease}
            type="button"
        >
            <FaPlus
                size={20}
                className="amount-icon"
            />
        </button>
    </div>
}

export default Amount



