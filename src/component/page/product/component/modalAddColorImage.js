import { storage } from "../../../firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Row, Input, Button, Image, Modal, Form, Select, Alert, Col, Typography } from "antd";
import { UploadOutlined, DeleteFilled } from '@ant-design/icons';
import { useState, useEffect } from "react";
import _ from "lodash";
import moment from "moment"

const ModalAddImage = ({ colorImage, setColorImage }) => {
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
    const { Option } = Select;
    const { Text } = Typography;
    const [form] = Form.useForm();
    const [fileImage, setFileImage] = useState()
    const [preview, setPreview] = useState()
    const [openModal, setOpenModal] = useState(false)
    const [notName, setNotName] = useState(false);
    const [notImg, setNotImg] = useState(false);
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

    const resetForm = () => {
        form.resetFields();
    };

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
                        const newdata = _.concat(colorImage, data)
                        setColorImage(newdata)
                        resetForm()
                        setPreview()
                        setOpenModal(false)
                        return
                    } else {
                        setColorImage([data])
                        resetForm()
                        setPreview()
                        setOpenModal(false)
                        return
                    }
                })
            })
        } else {
            if (_.isEmpty(fileImage) || _.isEmpty(preview)) {
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
                disabled={colorImage?.length === 3 ? true : false}
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
                        <Form onFinish={uploadImage} layout='vertical' form={form}>
                            <Form.Item
                                label={"Color"}
                                name={"P_color"}
                            >
                                <Select onChange={() => { setNotName(false) }}>
                                    {shirtData.map(item => {
                                        const selected = _.intersectionBy(shirtData, colorImage, 'color');
                                        const findColor = _.intersectionBy(selected, [item], 'color');
                                        if (findColor.length !== 0) {
                                            return <Option disabled value={item.id}>{item.color}</Option>
                                        } else {
                                            return <Option value={item.id}>{item.color}</Option>
                                        }
                                    })}
                                </Select>
                            </Form.Item>
                            {notName ?
                                <Alert message="Please Select Color I SUS" type="error" showIcon />
                                :
                                null
                            }
                            <Form.Item
                                label={"image"}
                                name={"P_image"}
                            >
                                <Input id="inputFile" type="file" onChange={(e) => { onSelectFile(e) }} />
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
                    </Col>
                </Row>
            </Modal>
        </>
    )
}
export default ModalAddImage