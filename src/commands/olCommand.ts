import build from '@/utils/buildMultilineCommand'

export default build({
  matcher: line => !/^\d+\. /.test(line),
  mapper: (line, i) => `${i > 0 ? '\n' : ''}${i + 1}. ${line}`,
  replacePattern: /^\d+\. /gm,
  extraChars: 3,
})
