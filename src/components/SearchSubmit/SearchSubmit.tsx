import type { FormEvent } from "react"

import { useState, useRef } from "react"

import { useIconsContext } from "../../contexts/Icon"

import Button from "../Button/Button"

import "./SearchSubmit.css"

type SearchProps = {
  placeholder?: string,
  limitChar?: number,
  onSearch: (e: FormEvent<HTMLFormElement>, newSearch: string) => void
  defaultValue: string,
}

const SearchSubmit = ({
  placeholder,
  onSearch,
  limitChar,
  defaultValue,
}:SearchProps) => {

  const {
    FaSearch,
    IoClose,
  } = useIconsContext();

  const [search, setSearch] = useState<string>(defaultValue)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if(!limitChar || value.length <= limitChar)
      setSearch(value);
  }

  const formRef = useRef<HTMLFormElement>(null);

  const handleClear = () => {
    setSearch("");
    formRef.current?.requestSubmit();
  }

  const searchInputRef = useRef<HTMLInputElement>(null)

  const handleSearchIconClick = () => {
    searchInputRef.current?.focus();
  }

  return <form 
    className="ss__form"
    onSubmit={(e) => {
      onSearch(e, search);
    }}
    ref={formRef}
  >
    <div className="ss__input-container">
      <input
        className="ss__search-input"
        placeholder={placeholder}
        type="text"
        value={search}
        onChange={handleSearchChange}
        ref={searchInputRef}
      />
      {
        search.length > 0 
         ? <button
          className="btn ss__button"
          onClick={handleClear}
         >
            <IoClose
              className="ss__icon ss__clear-icon"
              size={30}
            />
         </button>
         : null
      }
      <button
        className="btn ss__button"
        onClick={handleSearchIconClick}
      >
        <FaSearch 
          className="ss__icon ss__search-icon"
          size={20}
        />
      </button>
    </div>
    <Button
      role="submit"
      type="primary"
    >
      Search
    </Button>
  </form>
}

export default SearchSubmit
