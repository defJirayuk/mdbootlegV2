import { Layout } from 'antd';
import SiderBar from '../../layout/sider';
import HeaderBar from '../../layout/header';
import FooterBar from '../../layout/footer';
const Dashboard = () => {
    const { Content } = Layout;
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <SiderBar selectPath={`dashboard`}/>
            <Layout className="site-layout">
                <HeaderBar />
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <p>dashborad</p>
                </Content>
                <FooterBar />
            </Layout>
        </Layout>
    )
}
export default Dashboard