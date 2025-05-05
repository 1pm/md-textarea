import { PREFIX } from '@/index'
import type { MdTextareaOptions } from '@/index'
import type { Command } from '@/commands'
import getTarget from '@/utils/getTarget'

const event: Command = (
  targetEl: HTMLTextAreaElement,
  e: Event,
  { classPrefix }: MdTextareaOptions
) => {
  e.preventDefault()
  const { el } = getTarget(targetEl)
  el.classList.remove(`${classPrefix ?? PREFIX}--dragover`)
}

export default event
