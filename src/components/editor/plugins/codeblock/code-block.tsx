import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { $createCodeNode, $isCodeNode, getCodeLanguages } from "@lexical/code";
import { $setBlocksType } from "@lexical/selection";
import { $getSelection, $isRangeSelection } from "lexical";
import { CodeXmlIcon } from "lucide-react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

interface CodeBlockPluginProps {
  language: string;
  blockType: string;
}

const languages = [...getCodeLanguages(), "go"].sort((a, b) =>
  a.localeCompare(b),
);

export const CodeBlockPlugin = ({
  language,
  blockType,
}: CodeBlockPluginProps) => {
  const [editor] = useLexicalComposerContext();
  return (
    <>
      <Button
        variant={"outline"}
        size={"icon-sm"}
        onClick={() => {
          editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              $setBlocksType(selection, () => $createCodeNode("go"));
            }
          });
        }}
      >
        <CodeXmlIcon />
      </Button>
      {blockType == "code" && (
        <Select
          value={language}
          onValueChange={(value) => {
            editor.update(() => {
              const selection = $getSelection();
              if ($isRangeSelection(selection)) {
                selection.getNodes().forEach((node) => {
                  if ($isCodeNode(node)) {
                    node.setLanguage(value);
                  }
                });
              }
            });
          }}
        >
          <SelectTrigger>{language}</SelectTrigger>
          <SelectContent>
            {languages.map((language) => (
              <SelectItem key={language} value={language}>
                {language}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </>
  );
};
