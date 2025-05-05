import type { Command } from '@/commands'
import imageUploadCommand from '@/commands/imageUploadCommand'
import type { MdTextareaOptions } from '@/index'

const event: Command = (
  targetEl: HTMLTextAreaElement,
  e: Event,
  options: MdTextareaOptions
) => {
  e.preventDefault()

  if ((e as ClipboardEvent).clipboardData?.files) {
    imageUploadCommand(targetEl, e, options)
  }
}

export default event
