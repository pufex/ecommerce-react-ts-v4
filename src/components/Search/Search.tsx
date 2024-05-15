import { useIconsContext } from "../../contexts/Icon"
import "./Search.css"

type SearchProps = {
    placeholder: string,
    value: string,
    onChange: (changed: string) => void
}

const Search = ({placeholder, value, onChange}:SearchProps) => {

    const { FaSearch } = useIconsContext()

    return <div className="search">
        <FaSearch 
            className="search-component__icon"
            size={30}
        />
        <input 
            className="search__input"
            type="text" 
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
}

export default Search
