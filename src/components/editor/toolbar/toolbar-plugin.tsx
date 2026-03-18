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
import { ButtonGroup } from "@/components/ui/button-group";
import { ColorPlugin } from "@lexical/plugins/color/color-plugin";
import { ListPlugin } from "@lexical/plugins/list/list-plugin";
import { useToolbar } from "./use-toolbar";
import { handleAction, headingMap, headings, updateHeading } from "./utils";
import { toolbarItems } from "./items";
import { TablePlugin } from "@lexical/table/table";
import { CodeBlockPlugin } from "@lexical/plugins/codeblock/code-block";

export const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const { disabledActionsMap, enabledTextFormats, blockType, codeLanguage } =
    useToolbar();
  const [selectedHeading, setSelectedHeading] = useState<
    HeadingTagType | undefined
  >(undefined);

  return (
    <div className="mb-2 flex gap-2 items-center">
      {blockType != "code" && (
        <>
          <Select
            value={selectedHeading}
            onValueChange={(v) => {
              if (headings.indexOf(v as HeadingTagType) === -1) return;
              updateHeading(editor, v as HeadingTagType);
              setSelectedHeading(v as HeadingTagType);
            }}
          >
            <SelectTrigger className="w-[150px]">
              {selectedHeading ? headingMap[selectedHeading] : "Select Heading"}
            </SelectTrigger>
            <SelectContent>
              {headings.map((heading) => (
                <SelectItem key={heading} value={heading}>
                  {headingMap[heading]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Separator orientation="vertical" className="h-6!" />
          {toolbarItems.map((group, index) => (
            <React.Fragment key={index}>
              <ButtonGroup>
                {group.map((item) => (
                  <Button
                    key={item.name}
                    onClick={() => handleAction(editor, item.name)}
                    size="icon-sm"
                    variant={
                      enabledTextFormats[item.name] ? "secondary" : "outline"
                    }
                    aria-label={item.name}
                    disabled={!!disabledActionsMap[item.name]}
                  >
                    {item.icon}
                  </Button>
                ))}
              </ButtonGroup>

              <Separator orientation="vertical" className="h-6!" />
            </React.Fragment>
          ))}
          <ColorPlugin />
          <Separator orientation="vertical" className="h-6!" />
          <ListPlugin blockType={blockType} />
          <Separator orientation="vertical" className="h-6!" />
          <TablePlugin />
          <Separator orientation="vertical" className="h-6!" />
        </>
      )}

      <CodeBlockPlugin blockType={blockType} language={codeLanguage} />
    </div>
  );
};
