import { AreaChartOutlined, SkinFilled } from '@ant-design/icons';
import { useState } from 'react';
import { Layout, Menu, Grid } from 'antd';
import { useNavigate } from 'react-router-dom';
const SiderBar = ({ selectPath }) => {
    const { Sider } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const breakpoint = Grid.useBreakpoint();
    const isMobile = !breakpoint.lg;
    const antLayoutSider = {
        position: "relative",
        background: '#000'
    };
    const antLayoutSiderMobile = {
        position: "fixed",
        height: "100vh",
        zIndex: 999,
    };
    const navigate = useNavigate();
    const getItem = (label, key, icon, children) => {
        return {
            key,
            icon,
            children,
            label,
        };
    }
    const items = [
        getItem('Dashboard', 'dashboard', <AreaChartOutlined />),
        getItem('Manage Product', 'productManage', <SkinFilled />, [
            getItem('product', 'product'),
            // getItem('Bill', '4'),
            // getItem('Alex', '5'),
        ]),
        // getItem('User', 'sub1', <UserOutlined />, [
        //     getItem('Tom', '3'),
        //     getItem('Bill', '4'),
        //     getItem('Alex', '5'),
        // ]),
        // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
        // getItem('Files', '9', <FileOutlined />),
    ];
    const goPage = (value) => {
        if (value.key === "dashboard") {
            navigate("/")
            return
        }
        navigate(`/${value.key}`)
        return
    }
    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(collapsed) => setCollapsed(collapsed)}
            collapsedWidth={isMobile ? 0 : 80}
            breakpoint="lg"
            width={250}
            style={isMobile ? antLayoutSiderMobile : antLayoutSider}
        >
            <div
                style={{
                    height: 32,
                    margin: 16,
                    background: 'rgba(255, 255, 255, 0.2)',
                }}
            />
            <Menu
                theme="dark"
                defaultSelectedKeys={[`${selectPath}`]}
                defaultOpenKeys={[`${selectPath === 'product' ? "productManage" : null}`]}
                mode="inline"
                items={items}
                onClick={(e) => { goPage(e); }}
            />
        </Sider>
    )
}
export default SiderBar