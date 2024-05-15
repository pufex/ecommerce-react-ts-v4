import type { ReactElement } from "react";
import type { fetchStatus } from "../../types/types";

import { useState, useEffect, useMemo, useRef } from "react";
import { useIconsContext } from "../../contexts/Icon";
import { useSearchParams } from "react-router-dom"
import { useDatabase } from "../../contexts/Database";

import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import ProductCard from "./ProductCard/ProductCard";
import ProductCardsSkeleton from "./ProductCardsSkeleton/ProductCardsSkeleton";
import SearchSubmit from "../../components/SearchSubmit/SearchSubmit";

import "./Sales.css"
import Loading from "../Loading/Loading";

type PaginationType = {
    current: number,
    lowest: number,
    highest: number,
}

const Sales = () => {

    const [fetchProductsStatus, setFetchProductsStatus] = useState<fetchStatus>("loading")

    const {MdKeyboardArrowLeft,MdKeyboardArrowRight,FaLocationDot,} = useIconsContext();
    const { 
        products, fetchProducts, 
        cities, 
        partners,
    } = useDatabase();
    const [searchParams, setSearchParams] = useSearchParams();
    const location = searchParams.get("location");
    const partnerId = searchParams.get("partner");
    const search = searchParams.get("q");
    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>, newSearch: string) => {
        e.preventDefault();
        setSearchParams((prev) => {
            prev.set("q", newSearch);
            return prev;
        })
    }
    
    if (!location || !partnerId)
        return <ErrorComponent />

    const isPartnerThere = useRef<boolean>(true)
    const partner = useMemo(() => {
        const returnedPartner = 
            partners?.
                find(({id}) => id == partnerId)
        if(!returnedPartner) 
            isPartnerThere.current = false;
        console.log(returnedPartner)
        return returnedPartner;
    }, [partners, partnerId])

    const isCityThere = useRef<boolean>(true)
    const city = useMemo(() => {
        const returnedCities = 
            cities
                .find(({name}) => name == location)
        if(!returnedCities)
            isCityThere.current = false;
        return returnedCities
    }, [cities, location])
    
    if(!isCityThere.current || !isPartnerThere.current)
        return <ErrorComponent />

    const handleFetchProducts = () => {
        if(!products || products.id !== partnerId){
            setFetchProductsStatus("loading");
            fetchProducts(partnerId)
            .then(() => {
                setFetchProductsStatus("success");
            })
            .catch((err) => {
                console.error(err)
                setFetchProductsStatus("error");
            })
        }else setFetchProductsStatus("success")
    }

    useEffect(() => {
        handleFetchProducts();
    }, [])

    const [pagination, setPagination] = useState<PaginationType>({
        current: 1,
        lowest: 1,
        highest: 
            products?.products
                ? Math.ceil(products?.products.length! / 8)
                : 0
    });

    const { current, lowest, highest } = pagination

    const setPage = (newPage: number) => {
        setPagination({
            ...pagination,
            current: newPage
        })
    }

    const nextPage = () => {
        setPagination(({ current: previous }) =>
            previous == highest
                ? pagination
                : { ...pagination, current: previous + 1 }
        )
    }

    const previousPage = () => {
        setPagination(({ current: previous }) =>
            previous == lowest
                ? pagination
                : { ...pagination, current: previous - 1 }
        )
    }

    useEffect(() => {
        const body = document.querySelector("body")!
        body.scrollIntoView({ behavior: "instant" })
    }, [current])

    const filteredProducts = useMemo(() => {
        if(products){

            if(products.products){
                const ffff = products?.
                products.
                filter(({ name }) =>
                    !search
                        ? true
                        : name
                            .toLowerCase()
                            .includes(search.toLowerCase())
                )
                return ffff
            }else return []
        }else return []
    }, [current, highest, search, products])

    useEffect(() => {
        const newHighest = Math.ceil(filteredProducts?.length!/8)
        setPagination({
            ...pagination,
            current: filteredProducts.length
                ?   current == 0
                    ? 1
                    : current > newHighest
                        ? newHighest
                        : current
                : 0,
            highest: newHighest
        })
    }, [filteredProducts.length])

    const paginatedProducts = useMemo(() => {
        const newlyPaginatedProducts =
            filteredProducts?.
                slice((current - 1) * 8, current * 8);
        return newlyPaginatedProducts
    }, [filteredProducts])

    const paginationButtons = useMemo(() => {
        const arr: number[] = new Array(Math.ceil(filteredProducts?.length! / 8))
        const buttonsList: ReactElement[] = arr
            .fill(0)
            .map((_, i) => {
                return <button
                    className="btn btn--paginate"
                    onClick={() => setPage(i+1)}
                >
                    {(i + 1).toString()}
                </button>
            })
        return buttonsList;
    }, [current, highest])

    const renderedProducts = useMemo(() => {
        const newlyRenderedProducts = paginatedProducts?.map(({ id, name, price, stock, thumbnails }) => {
            return <ProductCard
                id={id}
                partnerId={partnerId}
                location={city?.name ?? ""}
                name={name}
                price={price}
                stock={stock}
                thumbnails={thumbnails}
            />
        })
        return newlyRenderedProducts
    }, [paginatedProducts])

    if(fetchProductsStatus == "loading")
    return <Loading />

    if(fetchProductsStatus == "success")
    return <main className="sales__main">
        <header className="sales__header">
            <h2 className="sales__heading">
                You are in:
            </h2>
            <h1 className="sales__partner">
                {partner?.name}
            </h1>
            <h2 className="sales__location">
                <FaLocationDot
                    className="sales__location-icon"
                    size={25}
                />
                <span className="sales__location-name">
                    {location}
                </span>
            </h2>
        </header>
        <section className="sales__products-header">
            <h1 className="sales__heading">
                Products
            </h1>
        </section>
        <section className="sales__options">
            <div className="sales__search-container">
                <SearchSubmit
                    placeholder="Search"
                    onSearch={handleSearchSubmit}
                    limitChar={50}
                    defaultValue={!search ? "" : search}
                />
            </div>
        </section>
        <section className="sales__products">
            {
                renderedProducts?.length
                    ? renderedProducts
                    : <ProductCardsSkeleton />
            }
        </section>
        {
            filteredProducts?.length
                ? <section className="sales__pagination-buttons">
                    {
                        current != lowest
                            ? <button
                                className="btn btn--paginate btn--paginate-direction"
                                onClick={previousPage}
                            >
                                <MdKeyboardArrowLeft
                                    className="btn--paginate-icon"
                                    size={40}
                                />
                            </button>
                            : null
                    }
                    {paginationButtons}
                    {
                        current != highest
                            ? <button
                                className="btn btn--paginate btn--paginate-direction"
                                onClick={nextPage}
                            >
                                <MdKeyboardArrowRight
                                    className="btn--paginate-icon"
                                    size={40}
                                />
                            </button>
                            : null
                    }
                </section>
                : null
        }
    </main>

    else return <ErrorComponent />

}

export default Sales
