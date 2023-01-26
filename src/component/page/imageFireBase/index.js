import { Layout } from 'antd';
import SiderBar from '../../layout/sider';
import HeaderBar from '../../layout/header';
import FooterBar from '../../layout/footer';
import FireBaseList from './list';
const ImageFireBase = () => {
    const { Content } = Layout;
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <SiderBar selectPath={`firebase`} />
            <Layout className="site-layout">
                <HeaderBar />
                <Content
                    style={{
                        margin: '0 16px',
                        padding:'20px'
                    }}
                >
                    <FireBaseList />
                </Content>
                <FooterBar />
            </Layout>
        </Layout>
    )
}
export default ImageFireBase