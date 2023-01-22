import { Row, Col, Typography, Image } from "antd";
import { DeleteFilled } from '@ant-design/icons';
import _ from "lodash";

const CardColor = ({ colorImageItem,colorImage,setColorImage  }) => {
    const { Text } = Typography;
    const deleteColorImage = () =>{
        const arr = [colorImageItem]
        const data = _.differenceBy(colorImage,arr , 'color')
        setColorImage(data)
    }
    return (
        <Row style={{ padding: '10px', border: '1px solid #1d1d1d', marginTop: '10px' }}>
            <Col span={7}>
                <Image width={80} src={colorImageItem.imageUrl} preview={false} />
            </Col>
            <Col span={6} style={{ paddingTop: '8px' }}>
                <Text style={{ paddingLeft: '5px' }}>{colorImageItem.color}</Text>
            </Col>
            <Col span={7} style={{ paddingTop: '8px' }}>
                <Text style={{ paddingLeft: '5px' }}>{colorImageItem.hex}</Text>
            </Col>
            <Col span={4} style={{ textAlign: 'end', paddingTop: '10px' }}>
                <DeleteFilled
                    style={{ fontSize: '18px' }}
                    onClick={() => { deleteColorImage() }}
                />
            </Col>
        </Row>
    )
}
export default CardColor