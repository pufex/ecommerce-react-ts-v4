import { useIconsContext } from "../../contexts/Icon"

import { mergeClasses } from "../../utils/mergeClasses"

import "./Checkbox.css"

type CheckboxProps = {
    value: boolean,
    onSwitch: () => void,
    children?: string
}

const Checkbox = ({
    value,
    onSwitch,
    children
}: CheckboxProps) => {

    const {ImCheckmark} = useIconsContext()

    return <div
        className="checkbox__container"
        onClick={onSwitch}
    >
        <div 
            className={mergeClasses(
                "checkbox__checkbox",
                value ? "active" : "",
            )}
        >
            {
                value
                    && <ImCheckmark 
                        size={15}
                        className="checkbox__checkmark"
                    />
            }
        </div>
        {
            typeof children != "undefined"
                && <label className="checkbox__label">
                    {children}
                </label>
        }
    </div>
}

export default Checkbox
