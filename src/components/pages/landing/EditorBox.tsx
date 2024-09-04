import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Handle, NodeProps, Position } from "reactflow";

type FlowBox = {
  data: any;
  isConnectable: boolean;
};
export default function EditorBox({ data, isConnectable }: NodeProps) {
  const extensions = [
    StarterKit,
    Placeholder.configure({
      placeholder: "Write your note ...",
    }),
  ];
  const editor = useEditor(
    {
      content: "halo",
      extensions,
      editorProps: {
        attributes: {
          class: "tiptap",
        },
      },
    },
    []
  );
  return (
    <div
      className="editor-node"
      style={{
        border: "1px solid black",
        padding: "10px",
        borderRadius: "12px",
      }}
    >
      <Handle
        id="aa"
        type="target"
        isConnectable={isConnectable}
        position={Position.Top}
      />
      <Handle
        id="ab"
        type="target"
        isConnectable={isConnectable}
        position={Position.Left}
      />
      <EditorContent editor={editor} />
      <Handle
        id="ba"
        type="source"
        isConnectable={isConnectable}
        position={Position.Right}
      />
      <Handle
        id="bb"
        type="source"
        isConnectable={isConnectable}
        position={Position.Bottom}
      />
    </div>
  );
}
