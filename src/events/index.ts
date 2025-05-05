import type { Command } from '@/commands'
import dragend from '@/events/dragendEvent'
import dragenter from '@/events/dragenterEvent'
import dragleave from '@/events/dragleaveEvent'
import drop from '@/events/dropEvent'
import keydown from '@/events/keydownEvent'
import pasteText from '@/events/pasteTextEvent'
import pasteFile from '@/events/pasteFileEvent'

export type Event = {
  command: Command
  name: string
}

const events: Event[] = [
  { name: 'dragend', command: dragend },
  { name: 'dragenter', command: dragenter },
  { name: 'dragleave', command: dragleave },
  { name: 'drop', command: drop },
  { name: 'keydown', command: keydown },
  { name: 'paste', command: pasteText },
  { name: 'paste', command: pasteFile },
]

export default events
