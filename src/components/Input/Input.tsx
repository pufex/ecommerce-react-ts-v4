import { useState } from "react"
import { useIconsContext } from "../../contexts/Icon"
import { mergeClasses } from "../../utils/mergeClasses"

import "./Input.css"

type InputProps = {
    children?: string,
    placeholder?: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    isError?: boolean,
    errorMessage?: string,
    isPassword?: boolean,
}

const Input = ({
    children,
    placeholder,
    value,
    onChange,
    isError,
    errorMessage,
    isPassword,
}:InputProps) => {
  
  const {
    IoIosLock,
    IoIosUnlock,
  } = useIconsContext();
  
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowPasswordSwitch = () => {
    setShowPassword(previous => !previous)
  }

  return <div className="input__container"> 
    <div className="input__labels">
      {
          children && children != "" 
              ? <label 
                className={mergeClasses(
                  "input__label",
                  isError ? "input__label--error" : ""
                )}
              >
                  {children}
              </label>
              : null
      }
      {
        isError
          ? <label className="input__label input__label--error">
            {
              errorMessage ?? "Invalid value"
            }
          </label>
          : null
      }
    </div>
    <div className={mergeClasses(
      "input__input-container",
      isError ? "input__input-container--error" : ""
    )}>
        <input 
            type={!isPassword ? "text" : showPassword ? "text" : "password"}
            className="input__input-itself"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
        {
          isPassword 
            && <button
              className="btn input__lock-button"
              onClick={handleShowPasswordSwitch}
              type="button"
              tabIndex={-1}
            >
              {
                showPassword
                  ? <IoIosUnlock
                    className="input__lock-icon" 
                    size={27}
                  />
                  : <IoIosLock
                    className="input__lock-icon" 
                    size={27}
                  />
              }
            </button>
            
        }
    </div>
  </div>
}

export default Input
