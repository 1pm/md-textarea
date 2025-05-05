import commands from '@/commands'
import type { Command } from '@/commands'

export type Shortcut = {
  command: Command
  key: string
  shift?: boolean
  alt?: boolean
  ctrl?: boolean
}

const shortcuts: Shortcut[] = [
  { key: 'b', command: commands.bold },
  { key: 'i', command: commands.italic },
  { key: '.', command: commands.quote, shift: true },
  { key: 'e', command: commands.code },
  { key: 'k', command: commands.link },
  { key: '8', command: commands.ul, shift: true },
  { key: '7', command: commands.ol, shift: true },
]

export default shortcuts
