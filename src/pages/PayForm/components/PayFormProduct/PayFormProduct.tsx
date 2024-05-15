import type { CartProductType } from "../../../../hooks/useCart"

import "./PayFormProduct.css"

type PayFormProductProps = Pick<
    CartProductType, 
    "name" |
    "price" |
    "amount" |
    "thumbnails"
>

const PayFormProduct = ({
    name,
    price,
    amount,
    thumbnails
}:PayFormProductProps) => {
  return <div className="pay-form__product-container">
    <div className="pay-form__product-container--left">
        <img 
            src={thumbnails[0]} 
            alt={`${name} thumbnail`}
            className="pay-form__product__image"
        />
    </div>
    <div className="pay-form__product-container--right">
        <h1 className="pay-form__product__title">
            {name}
        </h1>
        <p className="pay-form__product__calculation">
            {`$${price.toFixed(2)} * ${amount} = $${(price*amount).toFixed(2)}`}
        </p>
    </div>
  </div>
}

export default PayFormProduct
