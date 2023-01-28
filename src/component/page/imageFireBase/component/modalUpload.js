import { Row, Col, Typography, Button, Modal, Input, Form, Image, Alert ,message} from "antd"
import { UploadOutlined, DeleteFilled } from '@ant-design/icons';
import { useState, useEffect } from "react";
import { storage } from "../../../firebase/firebaseConfig";
import { ref, uploadBytes } from "firebase/storage";
import moment from "moment"
import _ from "lodash"
const ModalUpload = ({ setOpenModal, openModal,setTricker,tricker }) => {
    const { Text } = Typography;
    const [notImg, setNotImg] = useState(false);
    const [form] = Form.useForm();
    const [fileImage, setFileImage] = useState();
    const [preview, setPreview] = useState();
    useEffect(() => {
        if (!fileImage) {
            setPreview(undefined)
            return
        }
        const objectUrl = URL.createObjectURL(fileImage)
        const data = {
            name: fileImage.name,
            objectUrl: objectUrl
        }
        setPreview(data)
        return () => URL.revokeObjectURL(objectUrl)
    }, [fileImage])

    const onSelectFile = e => {
        setNotImg(false)
        if (!e.target.files || e.target.files.length === 0) {
            setFileImage(undefined)
            return
        }
        setFileImage(e.target.files[0])
    }

    const closeModal = () => {
        resetForm()
        setPreview()
        setOpenModal(false)
    }
    const resetForm = () => {
        form.resetFields();
    };
    const uploadImage = () => {
        if (fileImage && preview) {
            const imageRef = ref(storage, `product/${fileImage.name}${moment()}`);
            uploadBytes(imageRef, fileImage).then((data) => {
                message.success("Upload image completed")
                resetForm()
                setPreview()
                setOpenModal(false)
                setTricker(!tricker)
                return
            })
        } else {
            if (_.isEmpty(fileImage) || _.isEmpty(preview)) {
                resetForm()
                setNotImg(true)
            };
        }
    }
    return (
        <Modal
            open={openModal}
            onCancel={() => { closeModal() }}
            footer={false}
        >
            <Row style={{ width: '100%' }}>
                <Form
                    onFinish={uploadImage}
                    layout='vertical'
                    form={form}
                >
                    <Form.Item
                        label={"image"}
                        name={"P_image"}
                    >
                        <Input type="file" onChange={(e) => { onSelectFile(e) }} />
                    </Form.Item>
                    {preview ?
                        <Row style={{ padding: '10px', border: '1px solid #1d1d1d', marginTop: '10px' }}>
                            <Col span={7}>
                                <Image width={80} src={preview.objectUrl} preview={false} />
                            </Col>
                            <Col span={13} style={{ paddingTop: '8px' }}>
                                <Text style={{ paddingLeft: '5px' }}>{preview.name}</Text>
                            </Col>
                            <Col span={4} style={{ textAlign: 'end', paddingTop: '10px' }}>
                                <DeleteFilled
                                    style={{ fontSize: '18px' }}
                                    onClick={() => { setPreview() }}
                                />
                            </Col>
                        </Row>
                        :
                        null
                    }
                    {notImg ?
                        <Alert message="Please Select Image I SUS" type="error" showIcon />
                        :
                        null
                    }
                    <Button htmlType="submit"><UploadOutlined />add</Button>
                </Form>
            </Row>
        </Modal>
    )
}
export default ModalUpload