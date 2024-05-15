import "./ProductCardsSkeleton.css"
const ProductCardsSkeleton = () => {
    
    const skeletonList = new Array(8)
        .fill("1")
        .map((_) => {
            return <div 
                className="product-card__skeleton"
            ></div>
        })
    
    return <>
        {skeletonList}
    </>
}

export default ProductCardsSkeleton
