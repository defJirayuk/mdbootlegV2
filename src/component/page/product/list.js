import ProductCreate from "./create";
import { useState } from "react";

const ProductList = () => {
    const [page, setPage] = useState(0)
    return (
        <>
            {page === 0 ?
                <ProductCreate />
                : null
            }
        </>
    )
}
export default ProductList