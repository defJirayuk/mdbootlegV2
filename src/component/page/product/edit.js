import { Row, Input, Button, Form, InputNumber, Col, Typography, Alert, message, Spin, Switch } from "antd";
import { useState } from "react";
import ModalAddImage from "./component/modalAddColorImage";
import CardColor from "./component/cardColor";
import _ from "lodash";
import * as axiosData from '../../service/service';
import { useAsync } from 'react-use'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
const ProductEdit = ({ editData, setEditData, setCreating, creating }) => {
    const { Text } = Typography;
    const [colorImage, setColorImage] = useState([]);
    const [backupImage, setBackupImage] = useState([]);
    const [notName, setNotName] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const [status, setStatus] = useState();
    const [form] = Form.useForm();
    const { loading: loadingData } = useAsync(async () => {
        formatImageEdit()
    }, [editData])
    const formatImageEdit = async () => {
        if (editData?.P_status === "1") {
            setStatus(true)
        } else {
            setStatus(false)
        }
        if (_.get(editData, 'productColor')) {
            const formatData = await editData.productColor.map(item => {
                const format = {
                    color: item.pc_color,
                    hex: item.pc_hex,
                    imageUrl: item.pc_colorImage,
                    id: item.pc_id
                }
                return format
            })
            setBackupImage(formatData)
            setColorImage(formatData)
        }
    }
    const resetForm = () => {
        form.resetFields();
    };
    const editProduct = async (e) => {
        if (_.isEmpty(e.P_name)) {
            setNotName(true)
            return
        }
        setCreateLoading(true)
        const addNew = _.differenceBy(colorImage, backupImage, 'imageUrl');
        const deleteImage = _.differenceBy(backupImage, colorImage, 'imageUrl');
        const createData = {
            P_name: e.P_name,
            P_price: e.P_price ? e.P_price : 0,
            P_status: status === true ? 1 : 2
        }
        if (!_.isEmpty(addNew)) {
            await await Promise.all(addNew.map(async (item) => {
                if (!_.isEmpty(item)) {
                    const color = {
                        P_id: editData.P_id,
                        pc_color: item.color,
                        pc_hex: item.hex,
                        pc_colorImage: item.imageUrl
                    }
                    await axiosData.createProductColor(color)
                }
            }))
        }
        if (!_.isEmpty(deleteImage)) {
            await await Promise.all(deleteImage.map(async (item) => {
                if (!_.isEmpty(item)) {
                    const color = {
                        pc_id: item.id
                    }
                    await axiosData.deleteProductColor(color)
                }
            }))
        }
        const data = await axiosData.updateProduct(createData, editData.P_id)
        if (data) {
            message.success("Update Product complete")
            setCreateLoading(false)
            resetForm()
            setColorImage()
            setEditData()
            setCreating(!creating)
            return
        }

    }
    const onChangeSwitch = (e) => {
        setStatus(e)
    }
    if (createLoading || loadingData) {
        return <Spin spinning></Spin>
    }
    return (
        <Row style={{ width: '100%' }}>
            <Col span={24}>
                <Form layout='vertical' form={form} initialValues={editData} onFinish={editProduct}>
                    <Form.Item
                        label={"Name Product"}
                        name={"P_name"}
                    >
                        <Input onChange={() => { setNotName(false) }} />
                    </Form.Item>
                    {notName ?
                        <Alert message="Please Enter Product Name I SUS" type="error" showIcon />
                        :
                        null
                    }
                    <Form.Item
                        label={"Price"}
                        name={"P_price"}
                    >
                        <InputNumber min={0} />
                    </Form.Item>
                    <Row>
                        <Col span={12}>
                            <Text>Image</Text>
                        </Col>
                        <Col span={12} style={{ textAlign: 'end' }}>
                            <ModalAddImage setColorImage={setColorImage} colorImage={colorImage} />
                        </Col>
                    </Row>
                    {_.isEmpty(colorImage) ?
                        null :
                        colorImage.map(item => {
                            return <CardColor colorImage={colorImage} setColorImage={setColorImage} colorImageItem={item} />
                        })

                    }
                    <Form.Item
                        label={"Status"}
                        name={"P_status"}
                    >
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            checked={status}
                            onChange={onChangeSwitch}
                        />
                    </Form.Item>
                    <Button
                        htmlType="submit"
                    >
                        SAVE
                    </Button>
                </Form>
            </Col>
        </Row>
    )
}
export default ProductEdit