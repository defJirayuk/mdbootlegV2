import ProductCreate from "./create";
import ProductEdit from "./edit";
import MainProduct from "./mainProduct";
import { useState, useEffect } from "react";
import TitleProduct from "./component/titleProduct";
import * as axiosData from '../../service/service';
import _ from "lodash";

const ProductList = () => {
    const [page, setPage] = useState(0)
    const [creating, setCreating] = useState(false)
    const [product, setProduct] = useState([])
    const [editData, setEditData] = useState([])
    useEffect(() => {
        setPage(0)
        findData()
    }, [creating])

    const findData = async () => {
        const dataProduct = await axiosData.getProduct()
        if (!_.isEmpty(dataProduct)) {
            const addColorData = await await Promise.all(dataProduct.map(async (item) => {
                const param = {
                    P_id: item.P_id
                }
                const dataColor = await axiosData.getProductColorById(param);
                const finalData = {
                    ...item,
                    productColor: dataColor
                }
                return finalData
            }))
            setProduct(addColorData);
        }
    }
    return (
        <>
            <TitleProduct setPage={setPage} page={page} />
            {page === 0 ?
                <MainProduct product={product} setPage={setPage} setEditData={setEditData} />
                : page === 1 ?
                    <ProductCreate setCreating={setCreating} creating={creating} />
                    : <ProductEdit  setEditData={setEditData} editData={editData} setCreating={setCreating} creating={creating}/>
            }
        </>
    )
}
export default ProductList