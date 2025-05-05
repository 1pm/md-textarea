import { PREFIX } from '@/index'
import type { MdTextareaOptions } from '@/index'
import type { Command } from '@/commands'
import imageUploadCommand from '@/commands/imageUploadCommand'
import getTarget from '@/utils/getTarget'

const event: Command = (
  targetEl: HTMLTextAreaElement,
  e: Event,
  options: MdTextareaOptions
) => {
  e.preventDefault()
  const { el } = getTarget(targetEl)
  el.classList.remove(`${options.classPrefix ?? PREFIX}--dragover`)

  if ((e as DragEvent).dataTransfer?.files) {
    imageUploadCommand(targetEl, e, options)
  }
}

export default event
