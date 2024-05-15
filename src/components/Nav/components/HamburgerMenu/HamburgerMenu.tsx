import { useState, useRef, useEffect } from "react";

import { NavLink } from "react-router-dom";

import { mergeClasses } from "../../../../utils/mergeClasses";

import "./HamburgerMenu.css"

type HamburgerMenuProps = {
    active: boolean,
    onChoice: () => void,
}

const HamburgerMenu = ({active, onChoice}:HamburgerMenuProps): React.ReactElement => {

    const [followersY, setFollowersY] = useState(0);
    const ListRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        resolveFollowersFinalPosition();
    }, [])

    const resolveFollowersFinalPosition = () => {
        // @ts-ignore
        for(let i = 0; i < ListRef.current?.children.length; i++){
            const currentChild = ListRef.current?.children[i];
            if(currentChild?.classList.contains("active")){
                // @ts-ignore
                const newPosition = currentChild.offsetTop | 0;
                if(newPosition != followersY)
                    setFollowersY(newPosition);
            }
        }
    }
    
    const handleFollowersMovement = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // @ts-ignore
        const newPosition = e.target.offsetTop;
        if(newPosition != followersY && typeof newPosition == "number")
            setFollowersY(newPosition);
    }
    
    return <div className={mergeClasses(
        "hamburger-menu__cover",
        active ? "active" : ""
    )}>
        <div className={mergeClasses(
            "hamburger-menu",
            active ? "active" : ""
        )}>
            <div 
                className="hamburger-menu__links"
                ref={ListRef}
                onClick={onChoice}
                onMouseMove={handleFollowersMovement}
                onMouseLeave={resolveFollowersFinalPosition}
            >
                <div 
                    className="hamburger-menu__link-follower"
                    style={{
                        transform: `translateY(${followersY}px)`
                    }}
                ></div>
                <NavLink
                    className={({isActive}) =>
                        isActive
                            ? "hamburger-menu__link active"
                            : "hamburger-menu__link"
                    }
                    to="/"
                >
                    Home
                </NavLink>
                <NavLink
                    className={({isActive}) =>
                        isActive
                            ? "hamburger-menu__link active"
                            : "hamburger-menu__link"
                    }
                    to="/partners"
                >
                    Partners
                </NavLink>
                <NavLink
                    className={({isActive}) =>
                        isActive
                            ? "hamburger-menu__link active"
                            : "hamburger-menu__link"
                    }
                    to="/about"
                >
                    About
                </NavLink>
            </div>
        </div>
    </div>
}
 export default HamburgerMenu;