import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import type { HeadingTagType } from "@lexical/rich-text";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ColorPlugin } from "../plugins/color/color-plugin";
import { ListPlugin } from "../plugins/list/list-plugin";
import { useToolbar } from "./use-toolbar";
import { handleAction, headingMap, headings, updateHeading } from "./utils";
import { toolbarItems } from "./items";
import { TablePlugin } from "../table/table";
import { CodeBlockPlugin } from "../plugins/codeblock/code-block";

export const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const { disabledActionsMap, enabledTextFormats, blockType, codeLanguage } =
    useToolbar();
  const [selectedHeading, setSelectedHeading] = useState<
    HeadingTagType | undefined
  >(undefined);

  return (
    <div className="mb-2 flex gap-2 items-center">
      {blockType !== "code" && (
        <>
          <Select
            value={selectedHeading}
            onValueChange={(v) => {
              if (headings.indexOf(v as HeadingTagType) === -1) return;
              updateHeading(editor, v as HeadingTagType);
              setSelectedHeading(v as HeadingTagType);
            }}
          >
            <SelectTrigger className="w-[160px] h-10 text-xs font-medium bg-white/50 border-white/20 hover:bg-white/80 transition-colors">
              {selectedHeading && headingMap[selectedHeading]
                ? headingMap[selectedHeading]
                : "Normal Text"}
            </SelectTrigger>
            <SelectContent>
              {headings.map((heading) => (
                <SelectItem key={heading} value={heading}>
                  {headingMap[heading]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Separator orientation="vertical" className="h-4 opacity-20 mx-1" />
          {toolbarItems.map((group, index) => (
            <React.Fragment key={index}>
              <div className="flex bg-white/30 p-0.5 rounded-lg border border-white/20">
                {group.map((item) => (
                  <Button
                    key={item.name}
                    onClick={() => handleAction(editor, item.name)}
                    size="icon-xs"
                    variant="ghost"
                    className={`h-7 w-7 transition-all ${
                      enabledTextFormats[item.name]
                        ? "bg-white shadow-sm text-lagoon-deep scale-105"
                        : "text-sea-ink-soft hover:bg-white/50"
                    }`}
                    aria-label={item.name}
                    disabled={!!disabledActionsMap[item.name]}
                  >
                    {item.icon}
                  </Button>
                ))}
              </div>

              <Separator
                orientation="vertical"
                className="h-4 opacity-20 mx-1"
              />
            </React.Fragment>
          ))}
          <div className="flex gap-1 items-center bg-white/30 p-0.5 rounded-lg border border-white/20">
            <ColorPlugin />
            <Separator
              orientation="vertical"
              className="h-4 opacity-20 mx-0.5"
            />
            <ListPlugin blockType={blockType} />
            <Separator
              orientation="vertical"
              className="h-4 opacity-20 mx-0.5"
            />
            <TablePlugin />
          </div>
        </>
      )}

      <div className={blockType === "code" ? "" : "ml-auto"}>
        <CodeBlockPlugin blockType={blockType} language={codeLanguage} />
      </div>
    </div>
  );
};
