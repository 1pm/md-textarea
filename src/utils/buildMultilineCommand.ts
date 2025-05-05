import getTarget from '@/utils/getTarget'
import replaceInString from '@/utils/replaceInString'
import type { Command } from '@/commands'

type Options = {
  matcher: (line: string) => boolean
  mapper: (line: string, i: number) => string
  replacePattern: RegExp
  extraChars: number
}

const buildCommand = ({
  matcher,
  mapper,
  replacePattern,
  extraChars,
}: Options): Command => {
  return (targetEl: HTMLTextAreaElement) => {
    const target = getTarget(targetEl)
    const {
      selectionLines,
      selectionLineStart,
      selectionLineEnd,
      selectionStart,
      selectionEnd,
      prefixLines,
      suffixLines,
      setSelectionRange,
    } = target

    const notAllLines = selectionLines.split('\n').find(matcher)
    const needNewLineStart = !prefixLines.endsWith('\n') && prefixLines !== ''
    const needNewLineEnd = !suffixLines.startsWith('\n') && suffixLines !== ''
    let replacement = ''

    if (!notAllLines) {
      replacement = selectionLines.replaceAll(replacePattern, '')
    } else {
      replacement = selectionLines.split('\n').map(mapper).join('')

      replacement = `${needNewLineStart ? '\n' : ''}${replacement}${needNewLineEnd ? '\n' : ''}`
    }

    target.value = replaceInString(
      target.value,
      selectionLineStart,
      selectionLineEnd,
      replacement
    )

    if (selectionStart === selectionEnd) {
      setSelectionRange(
        selectionStart +
          (!notAllLines
            ? -1 * extraChars
            : extraChars + (needNewLineStart ? 1 : 0))
      )
    } else {
      setSelectionRange(
        selectionLineStart + (!notAllLines && needNewLineStart ? 1 : 0),
        selectionLineStart +
          replacement.length -
          (!notAllLines && needNewLineEnd ? 1 : 0)
      )
    }
  }
}

export default buildCommand
