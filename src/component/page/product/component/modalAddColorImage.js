import { storage } from "../../../firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { Row, Input, Button, Image, Modal, Form, Select, Alert, Col, Typography, Switch } from "antd";
import { UploadOutlined, DeleteFilled, DownloadOutlined } from '@ant-design/icons';
import { useState, useEffect } from "react";
import _ from "lodash";
import moment from "moment"
import * as axiosData from '../../../service/service';

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
    const [status, setStatus] = useState(false);
    const [openModal, setOpenModal] = useState(false)
    const [notName, setNotName] = useState(false);
    const [notImg, setNotImg] = useState(false);
    const [imageData, setImageData] = useState([]);

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
            const deleteUsed = await await Promise.all(getUrl.map(async (item) => {
                const data = {
                    image: item.url
                }
                const imageInDB = await axiosData.getProductColorByImage(data)
                if (_.isEmpty(imageInDB)) {
                    return item
                } else {
                    return
                }
            }))
            setImageData(_.compact(deleteUsed))
        })
    }, [])
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

    const onSelectImage = () =>{
        setNotImg(false)
    }

    const selectImageUpload = (e) => {
        if (e.P_color && e.P_image2) {
            const findColor = shirtData.find(sd => sd.id === e.P_color)
            const data = {
                color: findColor.color,
                hex: findColor.hex,
                imageUrl: e.P_image2
            }
            if (colorImage) {
                const newdata = _.concat(colorImage, data)
                setColorImage(newdata)
                resetForm()
                setOpenModal(false)
                return
            } else {
                setColorImage([data])
                resetForm()
                setOpenModal(false)
                return
            }
        } else {
            if (_.isEmpty(e.P_image2)) {
                setNotImg(true)
            };
            if (_.isEmpty(e.P_color)) {
                setNotName(true)
            }
        }
    }

    const uploadImage = (e) => {
        if (!status) {
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
        } else {
            selectImageUpload(e)
        }

    }

    const closeModal = () => {
        setOpenModal(false)
    }
    const onChangeSwitch = (e) => {
        setStatus(e)
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
                            <Col span={24}>
                                <Text>mode {!status ? `Upload` : `Instock`}</Text>
                            </Col>
                            <Switch
                                checkedChildren={<DownloadOutlined />}
                                unCheckedChildren={<UploadOutlined />}
                                checked={status}
                                onChange={onChangeSwitch}
                            />
                            {!status ?
                                <Form.Item
                                    label={"image"}
                                    name={"P_image"}
                                >
                                    <Input id="inputFile" type="file" onChange={(e) => { onSelectFile(e) }} />
                                </Form.Item>
                                :
                                <Form.Item
                                    label={"image"}
                                    name={"P_image2"}
                                >
                                    {_.isEmpty(imageData)?
                                    <Text>No more image 2 u</Text>
                                    :
                                    <Select size="large" onChange={(e) => { onSelectImage(e) }}>
                                        {imageData ? imageData.map(item => {
                                            return <Option value={item.url}>
                                                <Image style={{ width: '50px' }} src={item.url} preview={false} />
                                                {item.url}
                                            </Option>
                                        })
                                            : null}
                                    </Select>
                                    }
                                </Form.Item>
                            }
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