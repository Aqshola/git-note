import "@/style/tiptap.css";

import { ElementObjectCssStyle } from "@/types/general";
import { Button, Result, Select } from "antd";

import { useCallback, useEffect, useRef, useState } from "react";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Note, useNotesStore } from "@/stores/noteStore";
import { generateBase36ID } from "@/utility/common";
import Layout from "@/components/base/layout/Layout";
import {
  ReactFlow,
  addEdge,
  useEdgesState,
  useNodesState,
  Background,
  BackgroundVariant,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";

import EditorBox from "@/components/pages/landing/EditorBox";
import { nanoid } from "nanoid";
import Image from "@tiptap/extension-image";
import ImageResize from "tiptap-extension-resize-image";

const initialNodes: any[] = [];
const initialEdges: any[] = [];
const nodeTypes = { editorBox: EditorBox };
export default function Note() {
  const noteStore = useNotesStore((state) => state);
  const STYLE = {
    optionHeader: {
      minWidth: "100px",
      marginLeft: "auto",
    },
    buttonCanvas: {
      position: "absolute",
      right: "0",
      zIndex: 20,
    },
    divWrapper: {
      width: "100%",
      display: "block",
      position: "relative",
      minHeight: "100%",
    },
  } satisfies ElementObjectCssStyle;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [noteData, setNoteData] = useState<Note>({
    id: "",
    content: "",
    title: "",
  });
  const [modeNote, setModeNote] = useState<"note" | "flow">("note");

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: any) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const extensions = [
    StarterKit,
    Image.configure({
      allowBase64: true,
      inline: true,
    }),
    Placeholder.configure({
      placeholder: "Write your note ...",
    }),

    // ImageResize,
  ];

  const editor = useEditor(
    {
      content: noteData.content,
      extensions,
      editorProps: {
        attributes: {
          class: "tiptap-height tiptap",
        },
      },
      onUpdate({ editor }) {
        const content = editor.getJSON();
        let titleNote = "";
        if (content.content && content.content.length > 0) {
          const firstNode = content.content[0];
          if (firstNode.content) {
            titleNote = firstNode.content
              .filter((text) => text.type == "text")
              .map((text) => text.text)
              .join("");
          }
        }
        const htmlContent = editor.getHTML();
        setNoteData({ ...noteData, content: htmlContent, title: titleNote });
        noteStore.updateNote({
          id: noteData.id,
          content: htmlContent,
          title: titleNote,
        });
      },
    },
    [noteData.id]
  );

  editor?.setOptions({
    editorProps: {
      handlePaste(_, event, __) {
        const items = event.clipboardData?.items;
        if (!items || items.length == 0) return false;
        event.preventDefault();

        const blob = items[0].getAsFile();
        if (!blob) return false;
        const reader = new FileReader();
        reader.readAsDataURL(blob);

        reader.onload = (e) => {
          if (!e.target) return false;
          const dataUrl = e.target.result;
          editor
            .chain()
            .focus()
            .insertContent([
              {
                type: "image",
                attrs: { src: dataUrl },
              },
              {
                type: "paragraph",
                content: "",
              },
            ])
            .run();
        };

        return true;
      },
    },
  });

  useEffect(() => {
    if (noteStore.lastVisited == "" || !noteStore.lastVisited) {
      const id = generateBase36ID();
      setNoteData({ content: "", title: "", id });
      noteStore.setLastVisit(id);
      noteStore.addNote({ id, title: "", content: "" });
    } else {
      const lastVisitedId = noteStore.lastVisited;
      const lastVisitedData = noteStore.getNoteByID(lastVisitedId);
      if (lastVisitedData) {
        setNoteData(lastVisitedData);
      }
    }
  }, [noteStore.lastVisited]);

  function handleAddNoteCanvas() {
    setNodes([
      ...nodes,
      {
        id: nanoid(),
        position: { x: 0, y: 0 },
        data: {},
        type: "editorBox",
        targetPosition: Position.Top,
      },
    ]);
  }

  return (
    <Layout
      additionalHeader={
        <Select
          options={[
            { value: "note", label: "Note" },
            { value: "flow", label: "flow" },
          ]}
          defaultValue={"note"}
          style={STYLE.optionHeader}
          value={modeNote}
          onChange={(value: "note" | "flow") => setModeNote(value)}
        />
      }
    >
      <div ref={wrapperRef} style={STYLE.divWrapper}>
        {modeNote == "flow" && (
          <Button style={STYLE.buttonCanvas} onClick={handleAddNoteCanvas}>
            Add Note
          </Button>
        )}
        {modeNote == "note" && <EditorContent editor={editor} />}
        {modeNote == "flow" && (
          <div
            style={{
              width: "100%",
              display: "block",
              height: "87vh",
            }}
          >
            <ReactFlow
              nodes={nodes}
              nodeTypes={nodeTypes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              fitView
            >
              <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
          </div>
        )}
      </div>
    </Layout>
  );
}
