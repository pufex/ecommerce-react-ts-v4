import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDatabase } from "../../../../../../contexts/Database";
import { useIconsContext } from "../../../../../../contexts/Icon";

import "./LoggedMenu.css"

type LoggedMenuProps = {
    onClose: () => void;
}

// https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithpopup

const LoggedMenu = ({
    onClose,
}:LoggedMenuProps) => {

    const navigate = useNavigate();

    const { MdOutlineLogout, FaCog} = useIconsContext()
    const {
        currentUser,
        currentDocument,
        logout
    } = useDatabase();

    const [error, setError] = useState<boolean | string>(false)
    const [loading, setLoading] = useState<boolean>(false)


    const handleLogout = async () => {
        try{
            error
            setLoading(true)
            await logout();
            navigate("/")
            window.location.reload();
        }catch{
            setError("Failed to log out.")
        }
        setLoading(false)
    }

    const handleSettingsPick = () => {
        onClose();
        navigate("/account-settings")
    }

    return <>
        <div 
            className="logged-menu__event-capturer"
            onClick={onClose}
        ></div>
        <div className="logged-menu__container">
            <header className="logged-menu__header">
                <h1 className="logged-menu__heading">
                    Logged in
                </h1>
                {
                    currentUser 
                        && <p className="logged-menu__paragraph">
                            Hello, {currentDocument?.username}!
                        </p>
                }
            </header>
            <div className="logged-menu__options">
                <button
                    className="btn logged-menu__option"
                    onClick={handleSettingsPick}
                >
                    <span className="logged-menu__option-title">
                        Account
                    </span>
                    <FaCog 
                        className="logged-menu__icon-settings"
                        size={20}
                    />
                </button>
                <button
                    className="btn logged-menu__option"
                    onClick={handleLogout}
                    disabled={loading}
                >
                    <span className="logged-menu__option-title">
                        Log out
                    </span>
                    <MdOutlineLogout 
                        className="logged-menu__icon-logout"
                        size={20}
                    />
                </button>
            </div>
        </div>
    </>
    
}

export default LoggedMenu
