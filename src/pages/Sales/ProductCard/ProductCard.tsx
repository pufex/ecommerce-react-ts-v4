import { ProductType } from "../../../contexts/Database"

import { useNavigate } from "react-router-dom"

import Carousel from "../../../components/Carousel/Carousel"
import Button from "../../../components/Button/Button"

import "./ProductCard.css"

type ProductCardType = Pick<
    ProductType,
    "id" |
    "name" |
    "price" |
    "stock" |
    "thumbnails"
> & {location: string, partnerId: string,}

const ProductCard = ({
    location,
    partnerId,
    id,
    name,
    price,
    stock,
    thumbnails
}:ProductCardType) => {

  const navigate = useNavigate()

  return <div className="product-card__container">
    <div className="product-card--top">
        <Carousel 
          title={name}
          photos={thumbnails}
        />
    </div>
    <div className="product-card--middle">
        <h1 className="product-card__title">
            {name}
        </h1>
        <div className="product-card__info">
          <span className="product-card__price">
            {`$${price}`}
          </span>
          <span className="product-card__stock">
            {stock == "unlimited" ? null : `${stock} available`}
          </span>
        </div>
    </div>
    <div className="product-card--bottom">
      <Button
        role="button"
        type="primary"
        onClick={() => navigate(`/product?location=${location}&partner=${partnerId}&product=${id}`)}
      >
        Add to cart
      </Button>
    </div>
  </div>
}

export default ProductCard
