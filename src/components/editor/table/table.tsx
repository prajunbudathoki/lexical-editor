import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $createTableNodeWithDimensions } from '@lexical/table'
import {
  $insertNodeToNearestRoot
} from '@lexical/utils'
import { Table } from 'lucide-react'
import { useState } from 'react'

export const TablePlugin = () => {
  const [editor] = useLexicalComposerContext()
  const [open, setOpen] = useState(false)
  const [rows, setRows] = useState(2)
  const [columns, setColumns] = useState(2)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon-sm" variant={'outline'}>
          <Table />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Table</DialogTitle>
          <DialogDescription>
            Enter number of rows and columns
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <FieldGroup>
            <Field>
              <FieldLabel>Rows</FieldLabel>
              <Input
                type="number"
                value={rows}
                onChange={(e) => setRows(Number(e.target.value))}
              />
            </Field>
            <Field>
              <FieldLabel>Columns</FieldLabel>
              <Input
                type="number"
                value={columns}
                onChange={(e) => setColumns(Number(e.target.value))}
              />
            </Field>
          </FieldGroup>
        </div>
        <DialogFooter>
          <Button
            variant={'default'}
            disabled={rows < 1 || columns < 1}
            onClick={() => {
              editor.update(() => {
                const table = $createTableNodeWithDimensions(rows, columns, {
                  rows: true,
                  columns: false,
                })
                $insertNodeToNearestRoot(table)
              })
              setRows(2)
              setColumns(2)
              setOpen(false)
            }}
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
