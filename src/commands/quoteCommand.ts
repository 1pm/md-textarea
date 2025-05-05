import build from '@/utils/buildMultilineCommand'

export default build({
  matcher: line => !line.startsWith('> '),
  mapper: (line, i) => `${i > 0 ? '\n' : ''}> ${line}`,
  replacePattern: /^> /gm,
  extraChars: 2,
})
