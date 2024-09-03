import { Note, useNotesStore } from "@/stores/noteStore";
import { ElementObjectCssStyle } from "@/types/general";
import {
  FormOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PicCenterOutlined,
  PicLeftOutlined,
} from "@ant-design/icons";
import {
  Layout as AntdLayout,
  theme as AntdTheme,
  Button,
  Flex,
  List,
  Typography,
} from "antd";
import React, { useState } from "react";

type LayoutProps = {
  additionalHeader?: React.ReactNode;
  children: React.ReactNode;
};
export default function Layout(props: Readonly<LayoutProps>) {
  const { token } = AntdTheme.useToken();
  const noteStore = useNotesStore((state) => state);
  const STYLE = {
    layout: {
      minHeight: "100vh",
      backgroundColor: token.colorWhite,
      position: "relative",
      maxWidth: "1536px",
      margin: "auto",
    },

    siderNote: {
      backgroundColor: token.colorBgLayout,
      minWidth: "300px",
    },

    buttonSiderNote: {},

    flexSideNote: {
      height: "65px",
      padding: token.paddingXS,
    },

    titleSideNote: {
      color: "black",
    },

    listContainerNote: {
      padding: token.paddingLG,
    },

    listItem: {
      padding: token.paddingSM,
      fontWeight: "bold",
      cursor: "pointer",
    },
    titleListItem: {
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
    },

    siderAdditional: {
      backgroundColor: token.colorBgContainer,
      borderRight: `1px solid ${token.colorBorderSecondary}`,
      position: "absolute",
      left: "0",
      minHeight: "100vh",
      minWidth: "250px",
    },

    bodyLayout: {
      backgroundColor: token.colorWhite,
    },

    headerLayout: {
      backgroundColor: token.colorBgContainer,
      borderBottom: `1px solid ${token.colorBorderSecondary}`,
      padding: `0px ${token.paddingSM}px`,
    },

    flexHeaderLayout: {
      height: "100%",
    },

    selectModeNote: {
      minWidth: "100px",
    },

    contentLayout: {
      padding: token.paddingSM,
      width: "100%",
    },
  } satisfies ElementObjectCssStyle;

  const [collapseSiderNote, setCollapseSiderNote] = useState<boolean>(false);
  const [collapseSiderAdditional, setCollapseSiderAdditional] =
    useState<boolean>(true);

  function handleShowSiderNote() {
    setCollapseSiderNote(!collapseSiderNote);
    setCollapseSiderAdditional(true);
  }

  function handleShowSiderAdditional() {
    setCollapseSiderAdditional(!collapseSiderAdditional);
  }

  function handleHideSiderAdditional() {
    setCollapseSiderAdditional(true);
  }
  function handleNewNote() {
    noteStore.setLastVisit("");
  }

  function handleOpenNote(id: string) {
    noteStore.setLastVisit(id);
  }

  return (
    <AntdLayout style={STYLE.layout}>
      {/* SIDER NOTE */}
      <AntdLayout.Sider
        width={"250px"}
        style={STYLE.siderNote}
        collapsible
        trigger={null}
        collapsed={collapseSiderNote}
        collapsedWidth={0}
      >
        <Flex align="center" style={STYLE.flexSideNote} justify="space-evenly">
          <Button
            style={STYLE.buttonSiderNote}
            onClick={handleShowSiderAdditional}
          >
            {!collapseSiderAdditional && <MenuFoldOutlined />}
            {collapseSiderAdditional && <MenuUnfoldOutlined />}
          </Button>
          <Typography.Text style={STYLE.titleSideNote}>
            All Note
          </Typography.Text>
          <Button onClick={handleNewNote}>
            <FormOutlined />
          </Button>
        </Flex>
        <div style={STYLE.listContainerNote}>
          <List
            bordered
            locale={{ emptyText: "Empty notes" }}
            header={false}
            footer={false}
            dataSource={noteStore.notes}
            renderItem={(item: Note) => (
              <List.Item
                style={{
                  ...STYLE.listItem,
                  backgroundColor:
                    item.id == noteStore.lastVisited
                      ? token.colorBgContainer
                      : token.colorBgLayout,
                }}
                onClick={() => handleOpenNote(item.id)}
              >
                <Typography.Text style={STYLE.titleListItem}>
                  {item.title}
                </Typography.Text>
              </List.Item>
            )}
          />
        </div>
      </AntdLayout.Sider>

      {/* ADDITIONAL SIDER */}
      <AntdLayout.Sider
        width={"250px"}
        style={STYLE.siderAdditional}
        trigger={null}
        collapsible
        collapsed={collapseSiderAdditional}
        collapsedWidth={0}
      ></AntdLayout.Sider>

      <AntdLayout style={STYLE.bodyLayout}>
        <AntdLayout.Header style={STYLE.headerLayout}>
          <Flex style={STYLE.flexHeaderLayout} align="center">
            <Button onClick={handleShowSiderNote}>
              {collapseSiderNote && <PicLeftOutlined />}
              {!collapseSiderNote && <PicCenterOutlined />}
            </Button>

            {props.additionalHeader}
          </Flex>
        </AntdLayout.Header>

        <AntdLayout.Content
          style={STYLE.contentLayout}
          onClick={handleHideSiderAdditional}
        >
          {props.children}
        </AntdLayout.Content>
      </AntdLayout>
    </AntdLayout>
  );
}
