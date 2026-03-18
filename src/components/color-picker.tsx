import { Sketch } from '@uiw/react-color'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { PaintBucketIcon } from 'lucide-react'
import { ButtonGroup, ButtonGroupSeparator } from './ui/button-group'

interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
  icon?: React.ReactNode
}

export const ColorPicker = ({ value, onChange, icon }: ColorPickerProps) => {
  return (
    <Popover modal={true}>
      <PopoverTrigger asChild>
        <Button size="icon-sm" variant="outline" aria-label="Text Color">
          {icon || <PaintBucketIcon />}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0 w-auto" asChild>
        <ButtonGroup orientation={'vertical'}>
          <Sketch
            color={value}
            onChange={(v) => {
              onChange(v.hexa)
            }}
          />
          <ButtonGroupSeparator />
          <Button variant="outline" onClick={() => onChange('')}>
            Clear
          </Button>
        </ButtonGroup>
      </PopoverContent>
    </Popover>
  )
}
