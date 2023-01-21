import { Row, Input, Button, Form, InputNumber, Col, Typography, Alert } from "antd";
import { useState } from "react";
import ModalAddImage from "./component/modalAddColorImage";
import CardColor from "./component/cardColor";
import _ from "lodash";

const ProductCreate = () => {
    const { Text } = Typography;
    const [colorImage, setColorImage] = useState();
    const [notName, setNotName] = useState(false);

    const createProduct = async (e) => {
        console.log(e);
        if (_.isEmpty(e.P_name)) {
            setNotName(true)
            return
        }
    }
    return (
        <Row style={{ width: '100%' }}>
            <Col span={24}>
                <Form layout='vertical' onFinish={createProduct}>
                    <Form.Item
                        label={"Name Product"}
                        name={"P_name"}
                    >
                        <Input onChange={()=>{setNotName(false)}} />
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
                    <Form.Item
                        label={"Tun"}
                        name={"P_tun"}
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
                        <CardColor />
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