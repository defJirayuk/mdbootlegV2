import { Row, Input, Button, Form, InputNumber, Col, Typography, Alert, message,Spin } from "antd";
import { useState } from "react";
import ModalAddImage from "./component/modalAddColorImage";
import CardColor from "./component/cardColor";
import _ from "lodash";
import * as axiosData from '../../service/service';

const ProductCreate = ({setCreating,creating}) => {
    const { Text } = Typography;
    const [colorImage, setColorImage] = useState();
    const [notName, setNotName] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const [form] = Form.useForm();
    const resetForm = () => {
        form.resetFields();
    };
    const createProduct = async (e) => {
        if (_.isEmpty(e.P_name)) {
            setNotName(true)
            return
        }
        setCreateLoading(true)
        const findBlack = colorImage.find(sc => sc.color === "black")
        const findFade = colorImage.find(sc => sc.color === "fade")
        const findWhite = colorImage.find(sc => sc.color === "white")
        const mixColor = [
            findBlack,
            findWhite,
            findFade
        ]
        const createData = {
            P_name: e.P_name,
            P_price: e.P_price ? e.P_price : 0
        }
        const data = await axiosData.createProduct(createData)
        if (data) {
            await await Promise.all(mixColor.map(async (item) => {
                if (!_.isEmpty(item)) {
                    const color = {
                        P_id: data,
                        pc_color: item.color,
                        pc_hex: item.hex,
                        pc_colorImage: item.imageUrl
                    }
                    await axiosData.createProductColor(color).then(function (data) {

                    })
                }
            })
            )
            message.success("Create Product complete")
            setCreateLoading(false)
            resetForm()
            setColorImage()
            setCreating(!creating)
        }
    }
    if(createLoading){
        return <Spin spinning></Spin>
    }
    return (
        <Row style={{ width: '100%' }}>
            <Col span={24}>
                <Form layout='vertical' form={form} onFinish={createProduct}>
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
                    <Button
                        htmlType="submit"
                    >
                        CREATE
                    </Button>
                </Form>
            </Col>
        </Row>
    )
}
export default ProductCreate