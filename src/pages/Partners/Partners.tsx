import { useSearchParams } from "react-router-dom"
import { useState, useMemo } from "react"
import { useIconsContext } from "../../contexts/Icon"
import { useDatabase } from "../../contexts/Database"

import Search from "../../components/Search/Search"
import SearchLocation from "../../components/SearchLocation/SearchLocation"
import PartnersCard from "./components/PartnersCard/PartnersCard"

import "./Partners.css"

const Partners = () => {

    const { partners } = useDatabase()
    const { FaLocationDot } = useIconsContext()
    
    const [searchPartners, setSearhPartners] = useState<string>("")
    const [searchParams] = useSearchParams();
    const location = searchParams.get("location")

    const partnersLogos = useMemo(() => {
        return partners?.map(({name, logo, website}) => {
            return <a 
                href={website}
                className="partners__logos__link"
                target="_blank"
            >
                <img 
                    src={logo}
                    alt={`${name} logo`}
                    className="partners__logos__logo"
                />
            </a>
        })
    }, [partners])

    const cityPartners = useMemo(() => {
        return partners?.
            filter(({locations}) => {
                return locations.includes(location ?? "")
            })
            .map((partner) => {
                return <PartnersCard 
                    id={partner.id}
                    location={searchParams.get("location")!}
                    trade={partner.trade}
                    name={partner.name}
                    logo={partner.logo}
                    thumbnail={partner.thumbnail}
                    locations={partner.locations}
                />
            })
    }, [])

    if(!location) 
    return <main className="partners__main">
        <header className="partners__header">
            <h1 className="partners__heading">
                Our partners
            </h1>
            <div className="partners__logos">
                {partnersLogos}
            </div>
        </header>
        <div className="partners__location-search-container">
            <SearchLocation />
        </div>
    </main>
    else 
    return <main className="partners__main">
        <header className="partners__header">
            <h1 className="partners__heading">
                Our partners
            </h1>
            <h2 className="partners__location">
                <FaLocationDot 
                    className="partners__location-icon"
                    size={20}
                />
                <span className="partners__location-content">
                    {`Location: ${searchParams.get("location")}`}
                </span>
            </h2>
            <div className="partners__search-container">
                <Search
                    placeholder="Find our partner"
                    value={searchPartners}
                    onChange={(changed: string) => setSearhPartners(changed)}
                />
            </div>
        </header>
        <section className="partners__partners">
            {cityPartners ?? null}
        </section>
    </main>
}

export default Partners