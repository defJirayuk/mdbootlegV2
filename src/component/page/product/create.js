import { storage } from "../../firebase/firebaseConfig";
import { ref, uploadBytes,getDownloadURL } from "firebase/storage";
import { Row, Input, Button, Image } from "antd"
import { UploadOutlined } from '@ant-design/icons';
import { useState, useEffect } from "react";

const ProductCreate = () => {
    const [fileImage, setFileImage] = useState()
    const [preview, setPreview] = useState()
    const [urlPic, setUrl] = useState()

    useEffect(() => {
        if (!fileImage) {
            setPreview(undefined)
            return
        }
        const objectUrl = URL.createObjectURL(fileImage)
        setPreview(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
    }, [fileImage])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setFileImage(undefined)
            return
        }
        setFileImage(e.target.files[0])
    }
    const uploadImage = () => {
        if (!fileImage) return;
        const imageRef = ref(storage, `product/${fileImage.name}`);
        uploadBytes(imageRef, fileImage).then((data => {
            console.log(data);
            getDownloadURL(imageRef).then((url)=>{
                setUrl(url)
            })
        }))
    }
    console.log(urlPic);
    return (
        <Row>
            <Input id="inputFile" type="file" onChange={(e) => { onSelectFile(e) }} />
            {preview ?
                <Image width={200} src={preview} preview={false} />
                : null}
            <Button onClick={() => { uploadImage() }}>add</Button>
        </Row>
    )
}
export default ProductCreate