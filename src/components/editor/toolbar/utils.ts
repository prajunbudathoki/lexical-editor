import {
  $addUpdateTag,
  $getSelection,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  INDENT_CONTENT_COMMAND,
  type LexicalEditor,
  OUTDENT_CONTENT_COMMAND,
  REDO_COMMAND,
  SKIP_SELECTION_FOCUS_TAG,
  UNDO_COMMAND,
} from "lexical";

export type BlockType =
  | HeadingTagType
  | ListNodeTagType
  | "paragraph"
  | "check";

import { $createHeadingNode, type HeadingTagType } from "@lexical/rich-text";

import { $setBlocksType } from "@lexical/selection";
import type { ListNodeTagType } from "@lexical/list";

export type ToolBarAction =
  | "bold"
  | "italic"
  | "underline"
  | "highlight"
  | "strikethrough"
  | "superscript"
  | "subscript"
  | "code"
  | "align-left"
  | "align-center"
  | "align-right"
  | "align-justify"
  | "undo"
  | "redo"
  | "indent"
  | "outdent";

export function handleAction(editor: LexicalEditor, action: ToolBarAction) {
  switch (action) {
    case "bold":
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
      break;
    case "italic":
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
      break;
    case "underline":
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
      break;
    case "highlight":
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, "highlight");
      break;
    case "strikethrough":
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
      break;
    case "superscript":
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, "superscript");
      break;
    case "subscript":
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript");
      break;
    case "code":
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
      break;
    case "align-left":
      editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
      break;
    case "align-center":
      editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
      break;
    case "align-right":
      editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
      break;
    case "align-justify":
      editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
      break;
    case "undo":
      editor.dispatchCommand(UNDO_COMMAND, undefined);
      break;
    case "redo":
      editor.dispatchCommand(REDO_COMMAND, undefined);
      break;
    case "indent":
      editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
      break;
    case "outdent":
      editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
      break;
  }
}

export const headingMap: Record<HeadingTagType, string> = {
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  h5: "Heading 5",
  h6: "Heading 6",
};

export const headings: HeadingTagType[] = Object.keys(
  headingMap,
) as HeadingTagType[];

export const updateHeading = (
  editor: LexicalEditor,
  heading: HeadingTagType,
) => {
  editor.update(() => {
    $addUpdateTag(SKIP_SELECTION_FOCUS_TAG);
    const selection = $getSelection();
    $setBlocksType(selection, () => $createHeadingNode(heading));
  });
};
