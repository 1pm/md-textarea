import getTarget from '@/utils/getTarget'
import replaceInString from '@/utils/replaceInString'
import type { Command } from '@/commands'

const command: Command = (targetEl: HTMLTextAreaElement) => {
  const target = getTarget(targetEl)
  const { selectionLines, selectionLineStart, selectionStart, selectionEnd } =
    target

  if (selectionLines.startsWith('### ')) {
    target.value = replaceInString(
      target.value,
      selectionLineStart,
      selectionLineStart + 4,
      ''
    )
    target.setSelectionRange(selectionStart - 4, selectionEnd - 4)
  } else {
    target.value = replaceInString(
      target.value,
      selectionLineStart,
      selectionLineStart,
      '### '
    )
    target.setSelectionRange(selectionStart + 4, selectionEnd + 4)
  }
}

export default command
