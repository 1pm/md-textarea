import commands from '@/commands'
import events from '@/events'
import type { Event as MdEvent } from '@/events'
import shortcuts from '@/shortcuts'
import type { Shortcut } from '@/shortcuts'

export type MdTextareaOptions = {
  initialText?: string
  events?: MdEvent[]
  shortcuts?: Shortcut[]
  uploadFile?: (file: File) => Promise<string>
  classPrefix?: string
}

const PREFIX = 'mdTextarea'

const init = (
  targetEl: HTMLTextAreaElement,
  options: MdTextareaOptions = {}
) => {
  if (targetEl.nodeName !== 'TEXTAREA') {
    console.error('Target is not textarea element')
    return
  }

  if (options?.initialText) {
    targetEl.value = options?.initialText
  }

  ;(options?.events || events).forEach(({ command, name }) => {
    targetEl.addEventListener(name, (e: Event) => {
      command(targetEl, e, options)
    })
  })
  ;(options?.shortcuts || shortcuts).forEach(
    ({ command, key, shift, alt, ctrl }) => {
      targetEl.addEventListener('keydown', (e: KeyboardEvent) => {
        const isMac = navigator.platform.toLowerCase().startsWith('mac')
        const isModifierPressed = isMac ? e.metaKey : e.ctrlKey

        if (
          isModifierPressed &&
          e.key === key &&
          (!shift || e.shiftKey) &&
          (!alt || e.altKey) &&
          (!ctrl || e.ctrlKey)
        ) {
          command(targetEl, e, options)
        }
      })
    }
  )
}

export { PREFIX, commands, events, shortcuts, init }
