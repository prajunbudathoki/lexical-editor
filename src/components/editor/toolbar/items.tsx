import type { ToolBarAction } from "./utils";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  Code2Icon,
  Highlighter,
  IndentDecreaseIcon,
  ItalicIcon,
  Redo2Icon,
  StrikethroughIcon,
  SubscriptIcon,
  SuperscriptIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";

type ToolbarItem = {
  name: ToolBarAction;
  icon: React.ReactNode;
};

export const toolbarItems: ToolbarItem[][] = [
  [
    {
      name: "bold",
      icon: <BoldIcon />,
    },
    {
      name: "italic",
      icon: <ItalicIcon />,
    },
    {
      name: "underline",
      icon: <UnderlineIcon />,
    },
  ],
  [
    {
      icon: <Highlighter />,
      name: "highlight",
    },
    {
      icon: <StrikethroughIcon />,
      name: "strikethrough",
    },
    {
      icon: <SuperscriptIcon />,
      name: "superscript",
    },
    {
      icon: <SubscriptIcon />,
      name: "subscript",
    },
    {
      icon: <Code2Icon />,
      name: "code",
    },
  ],
  [
    {
      icon: <AlignLeftIcon />,
      name: "align-left",
    },
    {
      icon: <AlignCenterIcon />,
      name: "align-center",
    },
    {
      icon: <AlignRightIcon />,
      name: "align-right",
    },
    {
      icon: <AlignJustifyIcon />,
      name: "align-justify",
    },
  ],
  [
    {
      icon: <Undo2Icon />,
      name: "undo",
    },
    {
      icon: <Redo2Icon />,
      name: "redo",
    },
  ],
  [
    {
      icon: <IndentDecreaseIcon />,
      name: "outdent",
    },
    {
      icon: <IndentDecreaseIcon style={{ transform: "rotate(180deg)" }} />,
      name: "indent",
    },
  ],
];
