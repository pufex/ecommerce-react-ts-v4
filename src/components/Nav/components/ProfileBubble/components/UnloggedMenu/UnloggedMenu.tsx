import { Link } from "react-router-dom"

import { useIconsContext } from "../../../../../../contexts/Icon";

import "./UnloggedMenu.css"

type UnloggedMenuProps = {
    onClose: () => void;
    onChoice: () => void;
}

const UnloggedMenu = ({
    onClose,
    onChoice,
}:UnloggedMenuProps) => {

    const {
        FaPenFancy,
        LuLogIn,
    } = useIconsContext()

    return <>
        <div 
            className="unlogged-menu__event-capturer"
            onClick={onClose}
        ></div>
        <div className="unlogged-menu__container">
            <header className="unlogged-menu__header">
                <h1 className="unlogged-menu__heading">
                    You aren't logged
                </h1>
            </header>
            <div className="unlogged-menu__options">
                <Link 
                    className="unlogged-menu__option"
                    to={"/log-in"}
                    onClick={onChoice}
                >
                    <span className="unlogged-menu__option-title">
                        Log in
                    </span>
                    <LuLogIn 
                        className="unlogged-menu__icon"
                        size={25}
                    />
                </Link>
                <Link
                    className="unlogged-menu__option"
                    to={"/register"}
                    onClick={onChoice}
                >
                    <span className="unlogged-menu__option-title">
                        Register
                    </span>
                    <FaPenFancy 
                        className="unlogged-menu__icon"
                        size={20}
                    />
                </Link>
            </div>
        </div>
    </>
    
}

export default UnloggedMenu
