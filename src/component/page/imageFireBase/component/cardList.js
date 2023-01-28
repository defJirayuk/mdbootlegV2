import { Row, Col, Image, Typography, message, Popconfirm } from 'antd';
import { CopyOutlined, DeleteFilled } from '@ant-design/icons';
import * as axiosData from '../../../service/service';
import _ from 'lodash';
import { getStorage, ref, deleteObject } from "firebase/storage";
const CardList = ({ imageData }) => {
    const storage = getStorage();
    const { Text } = Typography;
    const clickCopy = () => {
        navigator.clipboard.writeText(imageData.url);
        message.success("Copy url success")
    }
    const deleteImage = async () => {
        const data = {
            image: imageData.url
        }
        const imageInDB = await axiosData.getProductColorByImage(data)
        if (_.isEmpty(imageInDB)) {
            const desertRef = ref(storage, imageData.path);
            await deleteObject(desertRef).then(() => {
                message.success("Delete image completed")
            })
        } else {
            message.error(`Can't Delete,This image using by Product ${imageInDB[0].P_id}`)
        }
    }
    return (
        <Col span={5} style={{ textAlign: 'center', marginTop: '20px', marginRight: '3%' }}>
            <Row justify={"center"} style={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}>
                <Col span={24}>
                    <Image src={imageData.url} style={{ width: '90%', height: '280px', objectFit: 'contain' }} preview={false} />
                </Col>
                <Col span={20} >
                    <Row style={{ padding: '15px 0px' }}>
                        <Col span={19}>
                            <Text ellipsis style={{ cursor: 'default' }}>{imageData.path}</Text>
                        </Col>
                        <Col span={5} style={{ textAlign: 'end' }}>
                            <CopyOutlined onClick={() => { clickCopy() }} style={{ cursor: 'pointer' }} />
                            <Popconfirm
                                title="Delete Image"
                                description="Are you sure to delete this image?"
                                onConfirm={deleteImage}
                                // onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                            // placement="bottomRight"
                            >
                                <DeleteFilled style={{ cursor: 'pointer', marginLeft: '8px' }} />
                            </Popconfirm>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Col>
    )
}
export default CardList