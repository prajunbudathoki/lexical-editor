import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import {
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from '@lexical/list'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import type { LexicalEditor } from 'lexical'
import { ListCheckIcon, ListIcon, ListOrderedIcon } from 'lucide-react'

interface ListPluginProps {
  blockType: string
}

function removeList(editor: LexicalEditor) {
  editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
}

export const ListPlugin = ({ blockType }: ListPluginProps) => {
  const [editor] = useLexicalComposerContext()

  return (
    <ButtonGroup>
      <Button
        variant={blockType == 'ul' ? 'secondary' : 'outline'}
        size="icon-sm"
        onClick={() => {
          if (blockType == 'ul') return removeList(editor)
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
        }}
      >
        <ListIcon />
      </Button>
      <Button
        variant={blockType == 'ol' ? 'secondary' : 'outline'}
        size="icon-sm"
        onClick={() => {
          if (blockType == 'ol') return removeList(editor)
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
        }}
      >
        <ListOrderedIcon />
      </Button>
      <Button
        variant={blockType == 'check' ? 'secondary' : 'outline'}
        size="icon-sm"
        onClick={() => {
          if (blockType == 'check') return removeList(editor)
          editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined)
        }}
      >
        <ListCheckIcon />
      </Button>
    </ButtonGroup>
  )
}
