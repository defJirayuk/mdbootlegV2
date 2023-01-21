import { storage } from "../../../firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Row, Input, Button, Image, Modal, Form, Select, Alert, Col, Typography } from "antd";
import { UploadOutlined, DeleteFilled } from '@ant-design/icons';
import { useState, useEffect } from "react";
import _ from "lodash";
import moment from "moment"

const ModalAddImage = ({ colorImage, setColorImage }) => {
    const { Option } = Select;
    const { Text } = Typography;
    const [fileImage, setFileImage] = useState()
    const [preview, setPreview] = useState()
    const [openModal, setOpenModal] = useState(false)
    const [notName, setNotName] = useState(false);
    const [notImg, setNotImg] = useState(false);
    const shirtData = [
        {
            color: 'black',
            hex: '#000000',
            id: '1'
        },
        {
            color: 'white',
            hex: '#e7e7e7',
            id: '2'
        }, {
            color: 'fade',
            hex: '#1d1d1d',
            id: '3'
        }
    ]
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
    const uploadImage = (e) => {
        if (e.P_color && fileImage && preview) {
            const findColor = shirtData.find(sd => sd.id === e.P_color)
            const imageRef = ref(storage, `product/${fileImage.name}${moment()}`);
            uploadBytes(imageRef, fileImage).then((data) => {
                getDownloadURL(imageRef).then((url) => {
                    const data = {
                        color: findColor.color,
                        hex: findColor.hex,
                        imageUrl: url
                    }
                    if (colorImage) {
                        const newdata = _.concat(colorImage, [data])
                        setColorImage(newdata)
                        return
                    } else {
                        setColorImage(data)
                        return
                    }
                })
            })
        } else {
            if (_.isEmpty(fileImage) || _.isEmpty(preview)) {
                debugger
                setNotImg(true)
            };
            if (_.isEmpty(e.P_color)) {
                setNotName(true)
            }
        }
    }
    const closeModal = () => {
        setOpenModal(false)
    }
    return (
        <>
            <Button
                onClick={() => { setOpenModal(true) }}
            >
                +ADD
            </Button>
            <Modal
                open={openModal}
                onCancel={() => { closeModal() }}
                footer={false}
            >
                <Row style={{ width: '100%' }}>
                    <Col span={24}>
                        <Form onFinish={uploadImage} layout='vertical'>
                            <Form.Item
                                label={"Color"}
                                name={"P_color"}
                            >
                                <Select onChange={() => { setNotName(false) }}>
                                    {shirtData.map(item => {
                                        return <Option value={item.id}>{item.color}</Option>
                                    })}
                                </Select>
                            </Form.Item>
                            {notName ?
                                <Alert message="Please Select Color I SUS" type="error" showIcon />
                                :
                                null
                            }
                            <Input id="inputFile" type="file" onChange={(e) => { onSelectFile(e) }} />
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
                    </Col>
                </Row>
            </Modal>
        </>
    )
}
export default ModalAddImage