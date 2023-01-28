import { Row, Col, Typography, Button } from "antd"
import { ArrowLeftOutlined } from '@ant-design/icons';
const TitleFireBase = ({ setPage, page, setOpenModal }) => {
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
                        fontWeight: '700',
                        cursor: 'default'
                    }}
                >
                    {page === 0 ?
                        "Firebase Image"
                        : page === 1 ?
                            "Product Create"
                            : "Product Update"
                    }
                </Text>
            </Col>
            <Col span={12} style={{ textAlign: 'end' }}>
                {page === 1 ?
                    null
                    :
                    <Button style={{ top: '20%' }} onClick={()=>{setOpenModal(true)}}>Upload</Button>
                }
            </Col>
        </Row>
    )
}
export default TitleFireBase