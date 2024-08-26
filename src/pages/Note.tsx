import "@/style/tiptap.css"

import { ElementObjectCssStyle } from "@/types/general";
import { Layout, Typography, theme as AntdTheme, Button, Flex } from "antd";
import { FormOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PicCenterOutlined, PicLeftOutlined, } from '@ant-design/icons'
import { useState } from "react";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
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
            height: '65px',
            padding: token.paddingXS,

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
            backgroundColor: token.colorBgLayout,
            minWidth: "300px"
        },

        bodyLayout: {
            backgroundColor: token.colorWhite
        },

        contentLayout: {
            padding: token.paddingSM
        },

        editor: {
            width: "100%",
            minHeight: "50vh"
        }
    } satisfies ElementObjectCssStyle

    const extensions = [StarterKit, Placeholder.configure({
        placeholder: "Write your note ...",

    })]
    const editor = useEditor({
        extensions,
        editorProps: {
            attributes: {
                class: "tiptap-height tiptap"
            }
        }
    })

    const [showSiderSetting, setShowSiderSetting] = useState<boolean>(true)
    const [showSiderNote, setShowSiderNote] = useState<boolean>(false)

    function handleShowSiderfSetting() {
        setShowSiderSetting(!showSiderSetting)
    }

    function handleHideSiderSetting() {
        setShowSiderSetting(true)
    }

    function handleShowSiderNote() {
        setShowSiderNote(!showSiderNote)
        setShowSiderSetting(true)
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

            <Layout style={STYLE.bodyLayout} >
                <Layout.Header style={STYLE.header2}>
                    <Button onClick={handleShowSiderNote}>
                        {showSiderNote && <PicLeftOutlined />}
                        {!showSiderNote && <PicCenterOutlined />}

                    </Button>
                </Layout.Header>

                <Layout.Content style={STYLE.contentLayout} onClick={handleHideSiderSetting}>
                    <EditorContent editor={editor} />
                </Layout.Content>
            </Layout>
        </Layout>
    )
}