import type { 
    CartProductType,
    RemoveFromCartFunction,
    IncrementInCartFunction,
    DecrementInCartFunction
} from "../../../hooks/useCart"

import { useIconsContext } from "../../../contexts/Icon"

import Amount from "../../../components/Amount/Amount"

import "./CartItem.css"

type CartItemProps = Pick<CartProductType,
    "id" |
    "name" |
    "price" |
    "thumbnails" |
    "amount" 
> & {
    removeFromCart: RemoveFromCartFunction
    incrementInCart: IncrementInCartFunction
    decrementInCart: DecrementInCartFunction
}

const CartItem = ({
    id,
    name,
    thumbnails,
    price,
    amount,
    removeFromCart,
    incrementInCart,
    decrementInCart,
}: CartItemProps) => {

    const { FaTrashAlt } = useIconsContext();

    const total = price*amount;

    return <div className="cart-item__container" id={id}>
        <div className="cart-item--left">
            <img 
                src={thumbnails?.[0]}
                alt={name}
                className="cart-item__icon"
            />
        </div>
        <div className="cart-item--right">
            <h1 className="cart-item__title">
                {name}
            </h1>
            <div className="cart-item__options-container">
                <div className="cart-item__calculation-container">
                    <h2 className="cart-item__calculation">
                        {`$${price.toFixed(2)} * ${amount} ${amount > 1 ? "sztuki" : "sztuka"}`}
                    </h2>
                    <h1 className="cart-item__total">
                        {`$${total.toFixed(2)}`}
                    </h1>
                </div>
                <div className="cart-item__options">
                    <Amount
                        value={amount}
                        onDecrease={() => decrementInCart(id)}
                        onIncrease={() => incrementInCart(id)}
                    />
                    <button
                        className="btn btn--trash"
                        onClick={() => removeFromCart(id)}
                    >
                        <FaTrashAlt 
                            className="cart-item__trash-icon"
                            size={25}
                        />
                    </button>
                </div>
            </div>
        </div>
    </div>
}

export default CartItem
