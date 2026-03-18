import { createFileRoute } from "@tanstack/react-router";
import { ToolbarPlugin } from "@/components/editor/toolbar/toolbar-plugin";
import { CodeExtension } from "@lexical/code";
import { CodeHighlighterShikiExtension } from "@lexical/code-shiki";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import {
  LexicalExtensionComposer,
  type LexicalExtensionComposerProps,
} from "@lexical/react/LexicalExtensionComposer";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { TailwindExtension } from "@/components/editor/theme";
import { CheckListExtension, ListExtension } from "@lexical/list";
import { TableExtension } from "@lexical/table";
import { RichTextExtension } from "@lexical/rich-text";

export const Route = createFileRoute("/")({ component: App });

const app: LexicalExtensionComposerProps["extension"] = {
  name: "TextEditorWithToolbar",
  dependencies: [
    RichTextExtension,
    CodeExtension,
    CodeHighlighterShikiExtension,
    TailwindExtension,
    CheckListExtension,
    ListExtension,
    TableExtension,
  ],
  onError: (error: Error) => {
    console.error("Error while loading lexical editor", error);
  },
};

function App() {
  return (
    <LexicalExtensionComposer extension={app} contentEditable={null}>
      <ToolbarPlugin />
      <div className="relative">
        <ContentEditable
          aria-placeholder="Enter some text...."
          placeholder={
            <div className="absolute top-1 left-2">Enter some text...</div>
          }
          className="border-2 border-black min-h-[70svh] rounded outline-0 p-1 text-lg"
        />
      </div>
      <AutoFocusPlugin />
      <HistoryPlugin />
      <ListPlugin />
    </LexicalExtensionComposer>
  );
}
