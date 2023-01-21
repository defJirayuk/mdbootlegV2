import { Row, Col, Typography, Button } from "antd"
import { ArrowLeftOutlined } from '@ant-design/icons';
const TitleProduct = ({ setPage, page }) => {
    const { Text } = Typography;
    return (
        <Row>
            <Col span={12}>
                {page === 0 ?
                    null
                    :
                    <ArrowLeftOutlined
                        style={{ fontSize: '28px', marginRight: '10px' }}
                        onClick={() => { setPage(0) }}
                    />
                }
                <Text
                    style={{
                        fontSize: '30px',
                        fontWeight: '700'
                    }}
                >
                    {page === 0 ?
                        "Product"
                        :
                        "Product Create"
                    }
                </Text>
            </Col>
            <Col span={12} style={{ textAlign: 'end' }}>
                {page === 1 ?
                    null
                    :
                    <Button style={{ top: '20%' }} onClick={() => { setPage(1) }}>Create</Button>
                }
            </Col>
        </Row>
    )
}
export default TitleProduct