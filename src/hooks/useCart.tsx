import type { ProductType } from "../contexts/Database"
import type { ReactElement } from "react"

import { useEffect, useRef, useState, createContext, useContext } from "react"

export type CartProductType = Pick<
    ProductType, 
    "id" |
    "name" |
    "stock" |
    "price" |
    "description" |
    "thumbnails"
> & {amount: number}

type CartType = {
    id: string,
    cart: CartProductType[]
}

export type ModifyCartFunction = (newCart: CartProductType[]) => void

export type ChangeCartFunction = (newCartId: string) => void

export type AddToCartFunction = (newProduct: CartProductType, amount?: number) => boolean

export type RemoveFromCartFunction = (productId: string) => boolean

export type IncrementInCartFunction = (productId: string, increment?: number) => boolean

export type DecrementInCartFunction = (productId: string, decrement?: number) => boolean

export type UseCartContext = {
    updated: number
    update: () => void,
}

const CartContext = createContext<UseCartContext | null>(null);

const useCartContext = () => {
    const cartContext = useContext(CartContext);
    if(!cartContext)
        throw Error("useCart hook cannot be used outside the Cart Context Provider.")
    else return cartContext;
}

type UseCartContextProviderProps = {
    children: ReactElement[] | ReactElement,
}


const UseCartContextProvider = ({
    children
}:UseCartContextProviderProps) => {
    
    const [updated, setUpdated] = useState<number>(0);

    const update = () => {
        setUpdated(previous => previous + 1);
    }

    const value: UseCartContext = {
        updated,
        update
    }

    return <CartContext.Provider
        value={value}
    >
        {children}
    </CartContext.Provider>
}

export default UseCartContextProvider

const fetchCart = (id: string): CartType => {
    const cart = localStorage.getItem(`eccomerce-cart-${id}`);
    if(cart){
        return JSON.parse(cart)
    }else{
        const obj = { id, cart: [], }
        localStorage.setItem(`eccomerce-cart-${id}`, JSON.stringify(obj));
        return obj
    }
}

const saveCart = (id: string, newCart: CartType) => {
    localStorage.setItem(`eccomerce-cart-${id}`, JSON.stringify(newCart))
} 

export const useCart = (id: string) => {
  
    const {updated, update} = useCartContext();

    const cartId = useRef<string>()
    cartId.current = id;

    const [cart, setCart] = useState<CartType>(fetchCart(cartId.current));

    const ModifyCart: ModifyCartFunction = (newCart) => {
        const newCartObj = {...cart, cart: newCart}
        saveCart(cartId.current!, newCartObj);
        setCart(newCartObj);
        update();
    }

    useEffect(() => {
        setCart(fetchCart(cartId.current!));
    }, [updated])

    const useDifferentCart: ChangeCartFunction = (newCartId) => {
        cartId.current = newCartId;
    }

    useEffect(() => {
        if(typeof cartId.current == "string")
        setCart(fetchCart(cartId.current))
    }, [cartId.current])

    const addToCart: AddToCartFunction = (newProduct, amount) => {
        if(cart.cart.some(({id}) => id == newProduct.id))
            return false;
        else ModifyCart([...cart.cart, {...newProduct, amount: amount ?? 1}]);
        return true;
    }

    const removeFromCart: RemoveFromCartFunction = (productId) => {
        if(!cart.cart.some(({id}) => id == productId))
            return false;
        else ModifyCart(cart.cart.filter(({id}) => id != productId))
        return true
    }

    const incrementInCart: IncrementInCartFunction = (productId, increment) => {
        if(!cart.cart.some(({id}) => id == productId))
            return false
        else ModifyCart(cart.cart
            .map((cartProduct) => {
                if(cartProduct.id == productId)
                    cartProduct.amount = typeof increment == "undefined"
                        ? cartProduct.amount + 1
                        : cartProduct.amount + increment
                return cartProduct
            }
        ))
        return true;
    }

    const decrementInCart: DecrementInCartFunction = (productId, decrement) => {
        let shouldRemove = false;
        if(!cart.cart.some(({id}) => id == productId))
            return false;
        else ModifyCart(cart.cart
            .map((cartProduct) => {
                if(cartProduct.id == productId){
                    cartProduct.amount = typeof decrement == "undefined"
                        ? cartProduct.amount - 1 
                        : cartProduct.amount - decrement
                    if(cartProduct.amount <= 0 ) shouldRemove = true;
                }
                return cartProduct
            }
        ))
        if(shouldRemove) removeFromCart(productId)
        return true;
    }

    const clearCart = () => {
        ModifyCart([]);
    }

    return {
        cart, 
        ModifyCart, 
        useDifferentCart,
        addToCart,
        removeFromCart,
        incrementInCart,
        decrementInCart,
        clearCart,
    } as const
}

