import { useState } from "react";
import { useDatabase } from "../../../../contexts/Database";

import UnloggedMenu from "./components/UnloggedMenu/UnloggedMenu";
import LoggedMenu from "./components/LoggedMenu/LoggedMenu";

import "./ProfileBubble.css"

const ProfileBubble = () => {

    const {
        currentUser,
        currentDocument,
    } = useDatabase();

    const [display, setDisplay] = useState<boolean>(false);

    const handleSwitchDisplay = () => {
        setDisplay(previous => !previous)
    }

    return <>
        <div className="profile-bubble__container">
            <div
                className="profile-bubble"
                onClick={handleSwitchDisplay}
                style={{
                    backgroundImage: 
                        !currentUser
                            ? 'url("../../../../assets/images/avatar.jpg")'
                            : `url(${currentDocument?.profilePic})`
                }}
            />
                {
                    display 
                        && <>
                            {
                                !currentUser
                                    ? <UnloggedMenu 
                                        onClose={handleSwitchDisplay}
                                        onChoice={handleSwitchDisplay}
                                    />
                                    : <LoggedMenu 
                                        onClose={handleSwitchDisplay}
                                    />
                            }
                        </>
                }
        </div>
    </>
}

export default ProfileBubble
