import BoxList from "./component/boxList";
import { Row, Col, Typography } from "antd";
const MainProduct = ({ product, setPage, setEditData }) => {
    const { Text } = Typography;
    return (
        <Row style={{ marginTop: '35px' }}>
            <Col span={24}>
                <Row style={{ padding: '10px' }}>
                    <Col span={3}>
                        <Text className="textHeadTable">Image</Text>
                    </Col>
                    <Col span={6}>
                        <Text className="textHeadTable">Name</Text>
                    </Col>
                    <Col span={3}>
                        <Text className="textHeadTable">Price</Text>
                    </Col>
                    <Col span={4}>
                        <Text className="textHeadTable">Color</Text>
                    </Col>
                    <Col span={3}>
                        <Text className="textHeadTable">Sale Amount</Text>
                    </Col>
                    <Col span={3}>
                        <Text className="textHeadTable">Status</Text>
                    </Col>
                    <Col span={2} style={{ textAlign: 'center' }}>
                        <Text className="textHeadTable">Management</Text>
                    </Col>
                </Row>
            </Col>
            <Col span={24} style={{marginTop:'15px'}}>
                {product ? product.map(item => {
                    return <BoxList productData={item} setPage={setPage} setEditData={setEditData} />
                }) : null}
            </Col>
        </Row>
    )
}
export default MainProduct