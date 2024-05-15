import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { useIconsContext } from "../../contexts/Icon"
import { useCart } from "../../hooks/useCart"

import { NavLink, Link } from "react-router-dom"
import ThemeButton from "../ThemeButton/ThemeButton"
import HamburgerMenu from "./components/HamburgerMenu/HamburgerMenu"
import ProfileBubble from "./components/ProfileBubble/ProfileBubble"

import { mergeClasses } from "../../utils/mergeClasses"

import "./Nav.css"

const Nav = () => {
    const { 
        FaMagnifyingGlassLocation, 
        GiHamburgerMenu, 
        IoClose,
        FaCartShopping
    } = useIconsContext()
    const navigate = useNavigate();
    
    const navRef = useRef<HTMLElement>();
    
    const {pathname} = useLocation()
    const [searchParams] = useSearchParams()
    const partnerId = searchParams.get("partner") ?? "0";
    
    const {cart} = useCart(partnerId)
    const [displayCart, setDisplayCart] = useState<boolean>(false)

    useEffect(() => {
        navRef.current?.scrollIntoView({behavior: "smooth"})
        switch(pathname){
            case "/sales":
                setDisplayCart(true);
                break;
            case "/product":
                setDisplayCart(true);
                break;
            case "/cart":
                setDisplayCart(true);
                break;
            case "/pay-form":
                setDisplayCart(true);
                break;
            case "/before-form":
                setDisplayCart(true);
                break;
            default: 
                setDisplayCart(false);
                break;
        }
        if(partnerId == "0")
            setDisplayCart(false);
    }, [pathname])
    

    const [displayMenu, setDisplayMenu] = useState<boolean>(false)
    const [mobileDesign, setMobileDesign] = useState<boolean>(false)
    const handleWindowResize = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 700)
            setMobileDesign(true);
        else
            setMobileDesign(false);
    }
    useEffect(() => {
        handleWindowResize();
        window.addEventListener("resize", handleWindowResize)
    }, [])

    return <>
        {
            mobileDesign
                ? <HamburgerMenu 
                    active={displayMenu}
                    onChoice={() => setDisplayMenu(false)}
                />
                : null
        }
        {/* @ts-ignore */}
        <div className="nav__imposter" ref={navRef}></div>
        <nav className="nav__container">
            <div className="nav">
                <section className="nav__section nav--left">
                    <div 
                        className="nav__logo-wrapper"
                        onClick={() => navigate('/')}
                    >
                        <div 
                            className="nav__logo-container"
                        >
                            <FaMagnifyingGlassLocation
                                className="nav__logo"
                                size={40}
                            />
                        </div>
                        {
                            !mobileDesign
                                ? <span className="nav__logo-title">
                                    Smaczne.pl
                                </span>
                                : null
                        }
                    </div>
                    {
                        displayCart
                            ?<Link
                                to={`/cart?partner=${partnerId}`}
                                className="cart"
                            >
                                <FaCartShopping 
                                    className="cart__icon"
                                    size={40}
                                />
                                {
                                    cart?.cart.length > 0
                                    ? <div className="cart__items-number-container">
                                        <span className="cart__items-number">
                                            {cart?.cart.length}
                                        </span>
                                    </div>
                                    : null
                                }
                            </Link>
                            : null
                    }
                </section>
                <section className="nav__section nav--right">
                    <ProfileBubble />
                    {
                        mobileDesign
                            ? <button
                                className={mergeClasses(
                                    "btn",
                                    "hamburger",
                                    displayMenu ? "active" : ""
                                )}
                                onClick={() => setDisplayMenu(previous => !previous)}
                            >
                                {
                                    !displayMenu
                                        ? <GiHamburgerMenu
                                            className="hamburger__icon hamburger--open"
                                            size={35}
                                        />
                                        : <IoClose
                                            className="hamburger__icon hamburger--close"
                                            size={40}
                                        />
                                }
                            </button>
                            : <div className="nav__links">
                                <NavLink
                                    className={({isActive}) =>
                                        isActive
                                            ? "nav__link active"
                                            : "nav__link"
                                    }
                                    to="/"
                                >
                                    Home
                                </NavLink>
                                <NavLink
                                    className={({isActive}) =>
                                        isActive
                                            ? "nav__link active"
                                            : "nav__link"
                                    }
                                    to="/partners"
                                >
                                    Partners
                                </NavLink>
                                <NavLink
                                    className={({isActive}) =>
                                        isActive
                                            ? "nav__link active"
                                            : "nav__link"
                                    }
                                    to="/about"
                                >
                                    About
                                </NavLink>
                            </div>
                    }
                    <ThemeButton />
                </section>
            </div>
        </nav>
    </>
}

export default Nav
