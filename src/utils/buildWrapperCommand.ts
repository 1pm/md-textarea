import getTarget from '@/utils/getTarget'
import replaceInString from '@/utils/replaceInString'
import type { Command } from '@/commands'

const buildCommand = (pattern: string): Command => {
  const length = pattern.length

  return (targetEl: HTMLTextAreaElement) => {
    const target = getTarget(targetEl)
    const { selection, selectionStart, selectionEnd } = target

    if (target.prefix.endsWith(pattern) && target.suffix.startsWith(pattern)) {
      target.value = replaceInString(
        target.value,
        selectionStart - length,
        selectionEnd + length,
        selection
      )
      target.setSelectionRange(
        selectionStart - length,
        selectionStart - length + selection.length
      )
    } else {
      target.selection = `${pattern}${selection}${pattern}`
      target.setSelectionRange(selectionStart + length, selectionEnd + length)
    }
  }
}

export default buildCommand
