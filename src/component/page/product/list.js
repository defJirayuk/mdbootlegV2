import ProductCreate from "./create";
import { useState } from "react";
import TitleProduct from "./component/titleProduct";

const ProductList = () => {
    const [page, setPage] = useState(0)
    return (
        <>
            <TitleProduct setPage={setPage} page={page} />
            {page === 0 ?
                null
                : <ProductCreate />
            }
        </>
    )
}
export default ProductList