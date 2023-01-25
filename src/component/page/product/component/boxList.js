import { useState } from "react";
import { Row, Col, Typography, Image, Tag } from "antd";
import { EditFilled } from '@ant-design/icons';
const BoxList = ({ productData, setPage, setEditData }) => {
    const { Text } = Typography;
    const [colorSelect, setColorSelect] = useState(0)
    return (
        <Row
            style={{
                padding: '10px',
                border: '1px solid silver',
                borderRadius: '8px'
            }}
        >
            <Col span={3}>
                <Image
                    src={productData.productColor[colorSelect].pc_colorImage}
                    preview={false}
                    style={{ width: '60px', height: '60px', objectFit: 'contain', borderRadius: '8px' }}
                />
            </Col>
            <Col span={6} style={{ paddingTop: '18px' }}>
                <Text className="textBodyTable">{productData.P_name}</Text>
            </Col>
            <Col span={3} style={{ paddingTop: '18px' }}>
                <Text className="textBodyTable">{productData.P_price}</Text>
            </Col>
            <Col span={4} style={{ paddingTop: '18px' }}>
                {productData.productColor.map((item, index) => {
                    return <Tag
                        onClick={() => { setColorSelect(index) }}
                        color={item.pc_hex}
                        style={{ cursor: 'pointer' }}
                    >
                        {item.pc_color}
                    </Tag>
                })}
            </Col>
            <Col span={3} style={{ paddingTop: '18px' }}>
                <Text className="textBodyTable">0</Text>
            </Col>
            <Col span={3} style={{ paddingTop: '18px' }}>
                <Text className="textBodyTable">{productData.P_status === "1"? `open` : `cancle`}</Text>
            </Col>
            <Col span={2} style={{ paddingTop: '18px' }}>
                <Row justify={"center"}>
                    <EditFilled style={{ fontSize: '16px' }} onClick={() => { setPage(2); setEditData(productData) }} />
                </Row>

            </Col>
        </Row>
    )
}
export default BoxList