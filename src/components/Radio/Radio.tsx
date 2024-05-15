import "./Radio.css"

type RadioProps = {
    children?: string,
    height?: number | string,
    groupValue: string,
    heldValue: string,
    onChoice: () => void,
}

const Radio = ({
    children,
    height,
    groupValue,
    heldValue,
    onChoice,
}:RadioProps) => {
  return <div 
    className="radio__container"
    onClick={onChoice}
    style={{
        height: height
            ? `${parseFloat(height.toString())}rem`
            : "6rem",
    }}
  >
    <div className="radio">
        <div className="radio-button">
            {
                groupValue == heldValue
                    ? <div className="radio__circle"></div>
                    : null
            }
        </div>
    </div>
    <label className="radio__label">
        {children}
    </label>
  </div>
}

export default Radio
