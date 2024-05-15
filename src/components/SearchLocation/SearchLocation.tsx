import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIconsContext } from "../../contexts/Icon"

import Dropdown from "../Dropdown/Dropdown";
import Button from "../Button/Button";

import "./SearchLocation.css"
import { useDatabase } from "../../contexts/Database";

const SearchLocation = () => {

    const navigate = useNavigate();

    const { FaSearch } = useIconsContext()
    const {cities} = useDatabase();
    
    const [searchValue, setSearch] = useState<string>("");
    
    const handlerDropdownCityChoice = (city: string) => {
        setSearch(city);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate(`/partners?location=${searchValue}`)
    }
    
    return <form
        className="search-location__form"
        onSubmit={handleSubmit}
    >
        <Dropdown
            type="text"
            placeholder="Search your city!"
            chosenSearch={searchValue}
            onChoice={handlerDropdownCityChoice}
            list={cities.map(({ name }) => name)}
        >
            <FaSearch
                className="dropdown__search-icon"
                size={20}
            />
        </Dropdown>

        <Button
            role="submit"
            type="primary"
        >
            Buy now!
        </Button>
    </form>
}

export default SearchLocation
