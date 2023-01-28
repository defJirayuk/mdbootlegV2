import { storage } from "../../firebase/firebaseConfig";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import TitleFireBase from "./component/titleFirebase";
import CardList from "./component/cardList"
import ModalUpload from "./component/modalUpload"
import { Row } from 'antd';
const FireBaseList = () => {
    // const storage = getStorage();
    const [imageData, setImageData] = useState([]);
    const [page, setPage] = useState(0)
    const [openModal, setOpenModal] = useState(false);
    const [tricker , setTricker]= useState(false);
    useEffect(() => {
        const ListRef = ref(storage, "product/");
        listAll(ListRef).then(async (data) => {
            const getUrl = await await Promise.all(data.items.map(async (item) => {
                const urlData = await getDownloadURL(item).then((url) => {
                    return url
                })
                const newData = {
                    url: urlData,
                    path: item._location.path_
                }
                return newData
            }))
            setImageData(getUrl)
        })
    }, [tricker])

    return (
        <>
            <TitleFireBase setPage={setPage} page={page} setOpenModal={setOpenModal} />
            <Row justify={"space-evenly"} style={{ marginLeft: '40px' }}>
                {imageData ? imageData.map((item) => {
                    return <CardList imageData={item} />
                })
                    : null}
            </Row>
            <ModalUpload setOpenModal={setOpenModal} openModal={openModal} tricker={tricker} setTricker={setTricker}/>
        </>
    )
}
export default FireBaseList