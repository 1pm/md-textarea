import type { MdTextareaOptions } from '@/index'
import bold from '@/commands/boldCommand'
import code from '@/commands/codeCommand'
import heading from '@/commands/headingCommand'
import imageUpload from '@/commands/imageUploadCommand'
import italic from '@/commands/italicCommand'
import link from '@/commands/linkCommand'
import ol from '@/commands/olCommand'
import quote from '@/commands/quoteCommand'
import ul from '@/commands/ulCommand'

export type Command =
  | ((
      targetEl: HTMLTextAreaElement,
      e: Event,
      options: MdTextareaOptions
    ) => void)
  | ((targetEl: HTMLTextAreaElement, e: Event) => void)
  | ((targetEl: HTMLTextAreaElement) => void)

const commands: Record<string, Command> = {
  bold,
  code,
  heading,
  imageUpload,
  italic,
  link,
  ol,
  quote,
  ul,
}

export default commands
