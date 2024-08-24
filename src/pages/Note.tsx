import { ElementObjectCssStyle } from "@/types/general";
import { Layout, Typography, theme as AntdTheme, Button, Flex, Divider } from "antd";
import { FormOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PicCenterOutlined, PicLeftOutlined, } from '@ant-design/icons'
import { useState } from "react";

export default function Note() {
    const { token } = AntdTheme.useToken()
    const STYLE = {
        layout: {
            minHeight: "100vh",
            backgroundColor: token.colorWhite,
            position: "relative"
        },
        header2: {
            backgroundColor: token.colorBgContainer,
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
            padding: `0px ${token.paddingSM}px`
        },

        flex1Header: {

            borderBottom: `1px solid ${token.colorBorderSecondary}`,
            height: '65px',
            padding: token.paddingXS,
            borderRight: `1px solid ${token.colorBorderSecondary}`
        },

        title1Header: {
            color: "black",
        },

        dividerHeader: {
            height: "100%"
        },

        button1Header: {

        },
        sider: {
            backgroundColor: token.colorBgContainer,
            borderRight: `1px solid ${token.colorBorderSecondary}`,
            position: "absolute",
            left: "0",
            minHeight: "100vh",
            minWidth: "250px"
        },

        siderNote: {
            backgroundColor: token.colorBgContainer,
            borderRight: `1px solid ${token.colorBorderSecondary}`,
            minWidth: "300px"
        },

        bodyLayout: {
            backgroundColor: token.colorWhite
        }
    } satisfies ElementObjectCssStyle

    const [showSiderSetting, setShowSiderSetting] = useState<boolean>(true)
    const [showSiderNote, setShowSiderNote] = useState<boolean>(false)


    function handleShowSiderfSetting() {
        setShowSiderSetting(!showSiderSetting)
    }

    function handleShowSiderNote() {
        setShowSiderNote(!showSiderNote)
    }
    return (
        <Layout style={STYLE.layout}>
            <Layout.Sider width={"250px"} style={STYLE.siderNote} collapsible trigger={null} collapsed={showSiderNote} collapsedWidth={0}>
                <Flex align="center" style={STYLE.flex1Header} justify="space-evenly">
                    <Button style={STYLE.button1Header} onClick={handleShowSiderfSetting}>
                        {!showSiderSetting && <MenuFoldOutlined />}
                        {showSiderSetting && <MenuUnfoldOutlined />}
                    </Button>
                    <Typography.Text style={STYLE.title1Header}>All Note</Typography.Text>
                    <Button><FormOutlined /></Button>
                </Flex>
            </Layout.Sider>

            <Layout.Sider width={"250px"} style={STYLE.sider} trigger={null} collapsible collapsed={showSiderSetting} collapsedWidth={0}>
                dad
            </Layout.Sider>
            <Layout style={STYLE.bodyLayout}>
                <Layout.Header style={STYLE.header2}>
                    <Button onClick={handleShowSiderNote}>
                        {showSiderNote && <PicLeftOutlined />}
                        {!showSiderNote && <PicCenterOutlined />}

                    </Button>
                </Layout.Header>


                <Layout.Content>
                    <h1>This is Header</h1>
                    <p>This is content</p>
                </Layout.Content>
            </Layout>
        </Layout>
    )
}