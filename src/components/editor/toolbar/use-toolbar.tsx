import { $isListNode, ListNode } from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $isHeadingNode } from "@lexical/rich-text";
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import {
  $findMatchingParent,
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  type LexicalNode,
} from "lexical";
import { useEffect, useState } from "react";
import type { ToolBarAction } from "./utils";
import { $isCodeNode } from "@lexical/code";

function $findTopLevelElement(node: LexicalNode) {
  let topLevelElement =
    node.getKey() === "root"
      ? node
      : $findMatchingParent(node, (e) => {
          const parent = e.getParent();
          return parent !== null && $isRootOrShadowRoot(parent);
        });

  if (topLevelElement === null) {
    topLevelElement = node.getTopLevelElementOrThrow();
  }
  return topLevelElement;
}

export function useToolbar() {
  const [editor] = useLexicalComposerContext();
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [blockType, setBlockType] = useState<string>("paragraph");
  const [codeLanguage, setCodeLanguage] = useState<string>("go");
  const [enabledTextFormats, setEnabledTextFormats] = useState<
    Partial<Record<ToolBarAction, boolean>>
  >({});

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          const currentSelection = $getSelection();
          if ($isRangeSelection(currentSelection)) {
            setEnabledTextFormats({
              bold: currentSelection.hasFormat("bold"),
              italic: currentSelection.hasFormat("italic"),
              underline: currentSelection.hasFormat("underline"),
              strikethrough: currentSelection.hasFormat("strikethrough"),
              superscript: currentSelection.hasFormat("superscript"),
              subscript: currentSelection.hasFormat("subscript"),
              highlight: currentSelection.hasFormat("highlight"),
              code: currentSelection.hasFormat("code"),
            });
            const anchorNode = currentSelection.anchor.getNode();
            const element = $findTopLevelElement(anchorNode);

            const elementKey = element.getKey();
            const elementDOM = editor.getElementByKey(elementKey);

            if (elementDOM) {
              if ($isListNode(element)) {
                const parent = $getNearestNodeOfType(element, ListNode);

                const nodetowork = parent || element;

                const listType = nodetowork.getListType();
                const listTag = nodetowork.getTag();

                setBlockType(listType == "check" ? "check" : listTag);
              } else {
                if ($isHeadingNode(element)) {
                  const tag = element.getTag();
                  setBlockType(tag);
                } else {
                  setBlockType(element.getType());
                }

                if ($isCodeNode(element)) {
                  const language = element.getLanguage();
                  setCodeLanguage(language || "go");
                }
              }
            }
          }
        });
      }),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (p) => {
          setCanUndo(p);
          return false;
        },
        0,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (p) => {
          setCanRedo(p);
          return false;
        },
        0,
      ),
    );
  }, [editor]);

  const disabledActionsMap: Partial<Record<ToolBarAction, boolean>> = {
    undo: !canUndo,
    redo: !canRedo,
  };

  return { disabledActionsMap, enabledTextFormats, blockType, codeLanguage };
}
