import type { Command } from '@/commands'
import getTarget from '@/utils/getTarget'

const event: Command = (targetEl: HTMLTextAreaElement, e: Event) => {
  e.preventDefault()
  const target = getTarget(targetEl)
  const clipboard = (e as ClipboardEvent).clipboardData?.getData('text') ?? ''
  let isClipboardUrl = false

  try {
    isClipboardUrl = !!new URL(clipboard)
  } catch (e) {
    // nothing
  }

  if (isClipboardUrl) {
    target.selection = `[${target.selection}](${clipboard})`
    target.setSelectionRange(
      target.selectionStart + target.selection.length + clipboard.length + 4
    )
  } else if (clipboard) {
    target.selection = clipboard
    target.setSelectionRange(target.selectionStart + clipboard.length)
  }
}

export default event
