import { ColorPicker } from "@/components/color-picker";
import { ButtonGroup } from "@/components/ui/button-group";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelectionStyleValueForProperty,
  $patchStyleText,
} from "@lexical/selection";
import {
  $getSelection,
  $isRangeSelection,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { BaselineIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { mergeRegister } from "@lexical/utils";

const defaultColor = "#000000";
const defaultBgColor = "#ffffff00";

export const ColorPlugin = () => {
  const [editor] = useLexicalComposerContext();

  const [colors, setColors] = useState<{ color: string; background: string }>({
    color: defaultColor,
    background: defaultBgColor,
  });

  const updateColorValues = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const color = $getSelectionStyleValueForProperty(selection, "color");
      const bgColor = $getSelectionStyleValueForProperty(
        selection,
        "background",
      );
      setColors({ color, background: bgColor });
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateColorValues();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateColorValues();
          return false;
        },
        0,
      ),
    );
  }, [editor]);

  function updateColor(color: string, property: "color" | "background") {
    editor.update(() => {
      const selection = $getSelection();
      if (selection !== null) {
        $patchStyleText(selection, {
          [property]: color,
        });
      }
    });
  }

  return (
    <ButtonGroup>
      <ColorPicker
        value={colors.color}
        icon={<BaselineIcon />}
        onChange={(color) => {
          updateColor(color, "color");
        }}
      />
      <ColorPicker
        value={colors.background}
        onChange={(color) => {
          updateColor(color, "background");
        }}
      />
    </ButtonGroup>
  );
};
