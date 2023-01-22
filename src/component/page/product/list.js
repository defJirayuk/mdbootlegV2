import ProductCreate from "./create";
import { useState } from "react";
import TitleProduct from "./component/titleProduct";
import { useEffect } from "react";

const ProductList = () => {
    const [page, setPage] = useState(0)
    const [creating, setCreating] = useState(false)
    useEffect(() => {
        setPage(0)
    }, [creating])
    return (
        <>
            <TitleProduct setPage={setPage} page={page} />
            {page === 0 ?
                null
                : <ProductCreate setCreating={setCreating} creating={creating} />
            }
        </>
    )
}
export default ProductList