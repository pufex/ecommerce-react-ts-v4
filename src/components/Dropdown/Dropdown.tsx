import type { ReactElement } from "react"
import { useState, useMemo } from "react"
import { nanoid } from "nanoid"

import "./Dropdown.css"

type DropdownProps = {
    children?: ReactElement | ReactElement[],
    type: React.HTMLInputTypeAttribute,
    placeholder?: string, 
    list: string[],
    chosenSearch: string,
    onChoice: (choice: string) => void,
}

const Dropdown = ({
    type, 
    children, 
    placeholder,
    list,
    chosenSearch,
    onChoice,
}:DropdownProps) => {

    const [search, setSearch] = useState<string>("")
    const [dropdownDispay, setDropdownDisplay] = useState<boolean>(false)

    const dropdownId = useMemo(() => nanoid(), []);

    const filteredList = list?.
        filter((item) => 
            item
            .toLowerCase()
            .includes(
                search.toLowerCase()
            )
        )

    return <div 
        className="dropdown"
    >
        <div className="dropdown__search-container">
            {children}
            <input 
                className="input-itself"
                type={type} 
                placeholder={placeholder}
                value={dropdownDispay ? search : chosenSearch}
                onFocus={() => setDropdownDisplay(true)}
                onChange={(e) => {
                    setSearch(e.target.value)
                }}
                id={dropdownId}
            />
        </div>
        {
            dropdownDispay && search != ""
                ? <div 
                    className="dropdown__list-container"
                    style={{
                        height: filteredList?.length > 4
                            ? "10rem"
                            : `${filteredList.length*2.5}rem`
                    }}
                >
                <ul className="dropdown__list">
                    {
                        filteredList.
                            map((item) =>{
                                return <li
                                    className="dropdown__item"
                                    onClick={() => {
                                        onChoice(item);
                                        setSearch(item)
                                        setDropdownDisplay(false)
                                    }}
                                >
                                    {item}
                                </li>
                            })
                    }
                </ul>
            </div>
            : null
        }
        
    </div>
}

export default Dropdown
