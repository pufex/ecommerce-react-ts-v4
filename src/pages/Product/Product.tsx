import type { CartProductType } from "../../hooks/useCart"

import { useMemo, useRef, useState } from "react"
import { useSearchParams, useNavigate} from "react-router-dom"
import { useDatabase } from "../../contexts/Database"
import { useCart } from "../../hooks/useCart"

import ErrorComponent from "../../components/ErrorComponent/ErrorComponent"
import Carousel from "../../components/Carousel/Carousel"
import Amount from "../../components/Amount/Amount"

import "./Product.css"


const Product = () => {
    
    const navigate = useNavigate();
    const {
        partners,
        products,
    } = useDatabase()

    const [amount, setAmount] = useState<number>(1);
    
    const [searchParams] = useSearchParams();
    const location = searchParams.get("location")
    const partnerId = searchParams.get("partner")!
    const productId = searchParams.get("product")

    if(!location || !partnerId || !productId)
    return <ErrorComponent />
    

    const shouldReturn = useRef<boolean>(false);

    const product = useMemo(() => {
        if(!products || products.id != partnerId){
            shouldReturn.current = true;
            return undefined
        }else{
            if(products){
                if(products.products)
                    return products.products
                        .find(({id}) => id === productId)
                else{
                    shouldReturn.current = true;
                    return undefined
                }
            }else{
                shouldReturn.current = true;
                return undefined
            }
        }
    }, [partners])

    if(shouldReturn.current) return <ErrorComponent />

    const { addToCart} = useCart(partnerId);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newProduct: CartProductType = {
            id: product?.id ?? "",
            name: product?.name ?? "",
            stock: product?.stock ?? 0,
            price: product?.price ?? 0,
            description: product?.description ?? "",
            thumbnails: product?.thumbnails ?? [],
            amount: 0,
        }
        addToCart(newProduct, amount);
        navigate(`/sales?location=${location}&partner=${partnerId}`)
    }

    return <main className="product-page__main">
        <div className="product-page__go-back-container">
            <button 
                className="btn btn--primary product-page__go-back"
                onClick={() => navigate(-1)}
            >
                Go back
            </button>
        </div>
        <form 
            className="product-page__form"
            onSubmit={handleSubmit}
        >
            <section className="product-page__thumbnails">
                <Carousel 
                    photos={product?.thumbnails ?? []}
                />
            </section>
            <section className="product-page__specifics">
                <header className="product-page__header">
                    <h1 className="product-page__name">
                        {product?.name}
                    </h1>
                    <span className="product-page__price">
                        {`$${product?.price ?? 0}`}
                    </span>
                </header>
                <p className="product-page__description">
                    {product?.description ?? 0}
                </p>
            </section>
            <section className="product-page__cart-settings">
                <div className="product-page__amount-container">
                    {
                        product?.stock == "unlimited"
                            ? null
                            : <h1 className="amount__title">
                                {`In stock: ${product?.stock}`}
                            </h1>
                    }
                    <Amount
                        value={amount}
                        onDecrease={() => setAmount(previous => 
                            previous > 0
                                ? previous-1
                                : previous
                        )}
                        onIncrease={() => setAmount(previous => previous + 1)}
                    />
                </div>
                <button 
                    className="btn btn--primary btn--in-product-page"
                    type="submit"
                >
                    Add to cart
                </button>
            </section>
        </form>
    </main>
}

export default Product
