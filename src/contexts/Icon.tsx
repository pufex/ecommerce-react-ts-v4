import type { IconType } from "react-icons";
import type { ReactElement } from "react";
import { createContext, useContext } from "react"
import { FaMagnifyingGlassLocation } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGithubSquare } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { BsPersonArmsUp } from "react-icons/bs";
import { IoTimerOutline } from "react-icons/io5";
import { IoSadOutline } from "react-icons/io5";
import { FaSmileBeam } from "react-icons/fa";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { FaRegSmile } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaPenFancy } from "react-icons/fa";
import { LuLogIn } from "react-icons/lu";
import { IoIosLock } from "react-icons/io";
import { IoIosUnlock } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaCog } from "react-icons/fa";
import { ImCheckmark } from "react-icons/im";

type IconContextType = {
    GiHamburgerMenu: IconType,
    IoClose: IconType,
    FaMoon: IconType,
    FaSun: IconType,
    FaMagnifyingGlassLocation: IconType,
    FaLocationDot: IconType,
    FaSearch: IconType,
    FaSquareXTwitter: IconType,
    FaGithubSquare: IconType,
    BsPersonArmsUp: IconType,
    IoTimerOutline: IconType,
    FaSmileBeam: IconType,
    IoSadOutline: IconType,
    MdKeyboardArrowLeft: IconType,
    MdKeyboardArrowRight: IconType,
    FaPlus: IconType,
    FaMinus: IconType,
    FaCartShopping: IconType,
    FaTrashAlt: IconType,
    IoIosArrowDown: IconType,
    IoIosArrowUp: IconType,
    FaRegSmile: IconType,
    AiOutlineLoading3Quarters: IconType,
    FaPenFancy: IconType,
    LuLogIn: IconType,
    IoIosLock: IconType,
    IoIosUnlock: IconType,
    MdOutlineLogout: IconType,
    FaCog: IconType,
    FaEdit: IconType,
    ImCheckmark: IconType,
}

const IconsContext = createContext<IconContextType | null>(null);

export const useIconsContext = () => {
    const iconsContext = useContext(IconsContext);
    if(!iconsContext)
        throw Error("Cannot use outside a provider.")
    else return iconsContext
}

type IconProps = {
    children: ReactElement[] | ReactElement
}

const IconProvider = ({children}:IconProps) => {
  return <IconsContext.Provider
    value={{
      FaSquareXTwitter,
      GiHamburgerMenu,
      IoClose,
      FaSun,
      FaMoon,
      FaMagnifyingGlassLocation,
      FaLocationDot,
      FaSearch,
      FaGithubSquare,
      BsPersonArmsUp,
      IoTimerOutline,
      FaSmileBeam,
      IoSadOutline,
      MdKeyboardArrowLeft,
      MdKeyboardArrowRight,
      FaPlus,
      FaMinus,
      FaCartShopping,
      FaTrashAlt,
      IoIosArrowDown,
      IoIosArrowUp,
      FaRegSmile,
      AiOutlineLoading3Quarters,
      FaPenFancy,
      LuLogIn,
      IoIosLock,
      IoIosUnlock,
      MdOutlineLogout,
      FaCog,
      FaEdit,
      ImCheckmark,
    }}
  >
    {children}
  </IconsContext.Provider>
}

export default IconProvider
