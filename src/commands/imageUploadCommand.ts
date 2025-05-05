import type { MdTextareaOptions } from '@/index'
import getTarget from '@/utils/getTarget'
import type { Command } from '@/commands'

const command: Command = async (
  targetEl: HTMLTextAreaElement,
  e: Event,
  { uploadFile }: MdTextareaOptions
) => {
  const target = getTarget(targetEl)
  let files: FileList | undefined | null

  if ((e as ClipboardEvent).clipboardData?.files) {
    files = (e as ClipboardEvent).clipboardData?.files
  } else if ((e as DragEvent).dataTransfer?.files) {
    files = (e as DragEvent).dataTransfer?.files
  } else {
    const input = e.target as HTMLInputElement
    files = input.files

    input.value = ''
  }

  if (!files) {
    return
  }

  Array.from(files).forEach(async file => {
    const { selectionStart } = target
    const placeholderText = `\n<!-- Uploading ${file.name} -->\n`
    target.selection = placeholderText
    target.setSelectionRange(selectionStart)

    if (typeof uploadFile !== 'function') {
      console.error('`uploadFile` method not defined')
    } else {
      const url = await uploadFile(file)

      const { prefixLines, suffixLines } = target
      const needNewLineStart = !prefixLines.endsWith('\n') && prefixLines !== ''
      const needNewLineEnd = !suffixLines.startsWith('\n') && suffixLines !== ''
      const imageUrl = url
      const imageText = `${needNewLineStart ? '\n\n' : ''}<img src="${imageUrl}" alt="${name}">${needNewLineEnd ? '\n\n' : ''}`
      target.value = target.value.replace(placeholderText, imageText)
      target.setSelectionRange(selectionStart)
    }
  })
}

export default command
