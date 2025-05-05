import type { Command } from '@/commands'
import getTarget from '@/utils/getTarget'
import replaceInString from '@/utils/replaceInString'

const event: Command = (targetEl: HTMLTextAreaElement, e: Event) => {
  if ((e as KeyboardEvent).key !== 'Enter') {
    return
  }

  const target = getTarget(targetEl)
  const { selectionStart, value, setSelectionRange } = target
  const index = value.slice(0, selectionStart).lastIndexOf('\n') + 1
  const line = value.slice(index, selectionStart)
  const firstTwoChars = line.slice(0, 2)
  const startMatch = line.match(/^\d+\. /)

  if (
    line === '- ' ||
    line === '* ' ||
    (startMatch && line === startMatch[0])
  ) {
    e.preventDefault()
    target.value = replaceInString(value, index, index + line.length, '')
    setSelectionRange(index)
  } else if (firstTwoChars === '- ' || firstTwoChars === '* ') {
    e.preventDefault()
    setTimeout(() => {
      target.value = replaceInString(
        value,
        selectionStart,
        selectionStart,
        `\n${firstTwoChars}`
      )
      setSelectionRange(selectionStart + 3)
    }, 0)
  } else if (startMatch) {
    e.preventDefault()
    const startNumber = parseInt(startMatch[0])
    setTimeout(() => {
      target.value = replaceInString(
        value,
        selectionStart,
        selectionStart,
        `\n${startNumber + 1}. `
      )
      setSelectionRange(
        selectionStart + (startNumber + 1).toString().length + 3
      )
    }, 0)
  }
}

export default event
