import type { PartnerType } from "../../../../contexts/Database"

import { useNavigate } from "react-router-dom"

import Button from "../../../../components/Button/Button"

import "./PartnersCard.css"

type PartnersCardProps = Pick<
    PartnerType,
    "id" |
    "trade" |
    "name" |
    "logo" |
    "thumbnail" |
    "locations"
> & {
    location: string,
}

const PartnersCard = ({
    id,
    name, 
    trade,
    logo,
    thumbnail,
    locations,
    location,
}:PartnersCardProps) => {

    const navigate = useNavigate();
    
    return <div
        className="partners-card"
    >
        <section className="partners-card__section partners-card--top">
            <header className="partners-card__desc">
                <img 
                    src={logo} 
                    alt={`${name} logo`} 
                    className="partners-card__logo" 
                />
                <span className="partners-card__name">
                    {name}
                </span>
            </header>
            <ul className="partners-card__info-list">
                <li className="partners-card__info-item">
                    {`Category: ${trade}`}
                </li>
                <li className="partners-card__info-item">
                    {`Locations: ${locations.length}`}
                </li>
            </ul>
        </section>
        <section className="partners-card__section partners-card--middle">
            <img 
                src={thumbnail} 
                alt={`${name}'s thumbnail`}
                className="partners-card__thumbnail"
            />
        </section>
        <section className="partners-card__section partners-card--bottom">
            <Button
                role="button"
                type="primary"
                onClick={() => navigate(`/sales?location=${location}&partner=${id}`)}
            >
                Buy now!
            </Button>
        </section>
    </div>
}

export default PartnersCard