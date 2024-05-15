import { useIconsContext } from '../../contexts/Icon'

import { NavLink } from 'react-router-dom';

import "./Footer.css"
const Footer = () => {

    const { FaGithubSquare, FaSquareXTwitter } = useIconsContext();

    return <footer className="footer-container">
        <div className="footer">
            <section className="footer--top">
                <div className='footer__socials'>
                    <a 
                        className="footer__social-link"
                        href="https://github.com/pufex"
                        target='_blank'
                    >
                        <FaGithubSquare
                            className="footer__social-icon"
                            size={40}
                        />
                    </a>
                    <a 
                        className="footer__social-link"
                        href="https://twitter.com"
                        target='_blank'
                    >
                        <FaSquareXTwitter
                            className="footer__social-icon"
                            size={40}
                        />
                    </a>
                </div>
            </section>
            <section className="footer--middle">
                <div className='footer__links'>
                    <NavLink
                        to="/"
                        className={({isActive}) => 
                            isActive
                                ? "footer__link active"
                                : "footer__link"
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/partners"
                        className={({isActive}) => 
                            isActive
                                ? "footer__link active"
                                : "footer__link"
                        }
                    >
                        Partners
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({isActive}) => 
                            isActive
                                ? "footer__link active"
                                : "footer__link"
                        }
                    >
                        About
                    </NavLink>
                </div>
            </section>
            <section className="footer--bottom">
                <p className='footer__copyrights-disclaimer'>
                    This website belongs to pufex™. Don't copy.
                </p>
            </section>
        </div>
    </footer>
}

export default Footer
