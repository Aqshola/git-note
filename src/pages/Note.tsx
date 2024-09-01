import "@/style/tiptap.css"

import { ElementObjectCssStyle } from "@/types/general";
import { Layout, Typography, theme as AntdTheme, Button, Flex, List, Select } from "antd";
import { FormOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PicCenterOutlined, PicLeftOutlined, } from '@ant-design/icons'
import { useEffect, useState } from "react";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Note, useNotesStore } from "@/stores/noteStore";
import { generateBase36ID } from "@/utility/common";
export default function Note() {
    const noteStore = useNotesStore(state => state)
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
        flexHeader: { height: "100%" },
        optionHeader: {
            minWidth: "100px"
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
        },

        listContainer: {
            padding: token.paddingLG
        },
        listItem: {
            padding: token.paddingSM,
            fontWeight: 'bold',
            cursor: 'pointer',
        },
        titleListItem: {
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap"
        }
    } satisfies ElementObjectCssStyle


    const [showSiderSetting, setShowSiderSetting] = useState<boolean>(true)
    const [showSiderNote, setShowSiderNote] = useState<boolean>(false)

    const [noteData, setNoteData] = useState<Note>({ id: "", content: "", title: "" })


    const extensions = [
        StarterKit,
        Placeholder.configure({
            placeholder: "Write your note ...",
        })]

    const editor = useEditor({
        content: noteData.content,
        extensions,
        editorProps: {
            attributes: {
                class: "tiptap-height tiptap"
            }
        },
        onUpdate({ editor }) {
            const content = editor.getJSON();
            let titleNote = ''
            if (content.content && content.content.length > 0) {
                const firstNode = content.content[0]
                if (firstNode.content) {
                    titleNote = firstNode.content.filter(text => text.type == 'text').map(text => text.text).join("")
                }
            }
            const htmlContent = editor.getHTML()
            setNoteData({ ...noteData, content: htmlContent, title: titleNote })
            noteStore.updateNote({ id: noteData.id, content: htmlContent, title: titleNote })
        }
    }, [noteData.id])


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

    function handleNewNote() {
        noteStore.setLastVisit("")
    }

    function handleOpenNote(id: string) {
        noteStore.setLastVisit(id)
    }


    useEffect(() => {
        if (noteStore.lastVisited == '' || !noteStore.lastVisited) {
            const id = generateBase36ID()
            setNoteData({ content: "", title: '', id })
            noteStore.setLastVisit(id)
            noteStore.addNote({ id, title: '', content: '' })
        } else {
            const lastVisitedId = noteStore.lastVisited
            const lastVisitedData = noteStore.getNoteByID(lastVisitedId)
            if (lastVisitedData) {
                setNoteData(lastVisitedData)
            }
        }
    }, [noteStore.lastVisited])

    return (
        <Layout style={STYLE.layout}>
            <Layout.Sider width={"250px"} style={STYLE.siderNote} collapsible trigger={null} collapsed={showSiderNote} collapsedWidth={0}>
                <Flex align="center" style={STYLE.flex1Header} justify="space-evenly">
                    <Button style={STYLE.button1Header} onClick={handleShowSiderfSetting}>
                        {!showSiderSetting && <MenuFoldOutlined />}
                        {showSiderSetting && <MenuUnfoldOutlined />}
                    </Button>
                    <Typography.Text style={STYLE.title1Header}>All Note</Typography.Text>
                    <Button onClick={handleNewNote}><FormOutlined /></Button>
                </Flex>
                <div style={STYLE.listContainer}>
                    <List bordered locale={{ emptyText: "Empty notes" }} header={false} footer={false} dataSource={noteStore.notes} renderItem={(item: Note) => (
                        <List.Item style={{ ...STYLE.listItem, backgroundColor: item.id == noteStore.lastVisited ? token.colorBgContainer : token.colorBgLayout }} onClick={() => handleOpenNote(item.id)}>
                            <Typography.Text style={STYLE.titleListItem}>{item.title}</Typography.Text>
                        </List.Item>
                    )} />
                </div>
            </Layout.Sider>

            <Layout.Sider width={"250px"} style={STYLE.sider} trigger={null} collapsible collapsed={showSiderSetting} collapsedWidth={0}>
                dad
            </Layout.Sider>

            <Layout style={STYLE.bodyLayout} >
                <Layout.Header style={STYLE.header2}>
                    <Flex align="center" style={STYLE.flexHeader} justify="space-between" >
                        <Button onClick={handleShowSiderNote}>
                            {showSiderNote && <PicLeftOutlined />}
                            {!showSiderNote && <PicCenterOutlined />}
                        </Button>
                        <Select options={[{ value: "note", label: "Note" }, { value: "canvas", label: "Canvas" }]} defaultValue={"note"} style={STYLE.optionHeader} />
                    </Flex>
                </Layout.Header>

                <Layout.Content style={STYLE.contentLayout} onClick={handleHideSiderSetting}>
                    <EditorContent editor={editor} />
                </Layout.Content>
            </Layout>
        </Layout>
    )
}