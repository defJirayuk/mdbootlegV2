import { Layout } from 'antd';
import SiderBar from '../../layout/sider';
import HeaderBar from '../../layout/header';
import FooterBar from '../../layout/footer';
import ProductList from './list'
const Product = () => {
    const { Content } = Layout;
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <SiderBar selectPath={`product`} />
            <Layout className="site-layout">
                <HeaderBar />
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <ProductList />
                </Content>
                <FooterBar />
            </Layout>
        </Layout>
    )
}
export default Product