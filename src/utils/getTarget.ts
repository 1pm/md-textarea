import replaceInString from '@/utils/replaceInString'

export default function (targetEl: HTMLTextAreaElement) {
  return {
    get el() {
      return targetEl
    },
    get value() {
      return targetEl.value
    },
    set value(value: string) {
      if (typeof document.execCommand !== 'function') {
        targetEl.value = value
      } else {
        targetEl.focus()
        targetEl.setSelectionRange(0, targetEl.value.length)
        document.execCommand('insertText', false, value)
      }
    },
    get selectionStart() {
      return targetEl.selectionStart ?? 0
    },
    get selectionEnd() {
      return targetEl.selectionEnd ?? 0
    },
    get prefix() {
      return this.value.slice(0, this.selectionStart)
    },
    get suffix() {
      return this.value.slice(this.selectionEnd)
    },
    get selection() {
      return targetEl.value.slice(this.selectionStart, this.selectionEnd)
    },
    set selection(replacement: string) {
      const start = this.selectionStart
      const end = this.selectionEnd

      this.value = replaceInString(targetEl.value, start, end, replacement)

      this.setSelectionRange(start, start + replacement.length)
      targetEl.focus()
    },
    get selectionLineStart() {
      const lineStartIndex = this.prefix.lastIndexOf('\n')

      if (lineStartIndex === -1) {
        return 0
      }

      return lineStartIndex + 1
    },
    get selectionLineEnd() {
      const lineEndIndex = this.suffix.indexOf('\n')

      if (lineEndIndex === -1) {
        return this.selectionEnd + this.suffix.length
      }

      return this.selectionEnd + lineEndIndex
    },
    get prefixLines() {
      if (this.selectionLineStart === 0) {
        return ''
      }

      return this.value.slice(0, this.selectionLineStart - 1)
    },
    get suffixLines() {
      return this.value.slice(this.selectionLineEnd + 1)
    },
    get selectionLines() {
      const { selectionLineStart, selectionLineEnd } = this

      return this.value.slice(selectionLineStart, selectionLineEnd)
    },
    async setSelectionRange(start: number, end?: number) {
      targetEl.setSelectionRange(start, end ?? start)
      targetEl.focus()
    },
  }
}
