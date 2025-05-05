import getTarget from '@/utils/getTarget'
import type { Command } from '@/commands'

const command: Command = (targetEl: HTMLTextAreaElement) => {
  const target = getTarget(targetEl)
  const { selection, selectionStart } = target

  if (target.selection.length === 0) {
    target.selection = '[](url)'
    target.setSelectionRange(selectionStart + 1)
  } else {
    target.selection = `[${selection}](url)`
    target.setSelectionRange(
      selectionStart + selection.length + 3,
      selectionStart + selection.length + 6
    )
  }
}

export default command
