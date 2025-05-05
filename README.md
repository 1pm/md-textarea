# MD Textarea

_Ever wanted to have support for markdown in textarea? Yeah, me too_

This is a tiny (8.1k), zero-dependency wrapper for textarea which works similar to Github's editor.

## Installation

`$ yarn add md-textarea`

## Usage

```js
// Use default commands and shortcuts
import { init } from 'md-textarea'

init(document.getElementsByTagName('textarea')[0])

// Custom initial text
import { init } from 'md-textarea'

init(document.getElementsByTagName('textarea')[0], { initialText: 'Hello world' })

// Custom file upload method
import { init } from 'md-textarea'

init(document.getElementsByTagName('textarea')[0], {
  uploadFile: async (file) => {
    await new Promise((resolve) => setTimeout(resolve, 5000))
    return 'https://picsum.photos/200/300'
  }
})

// Custom shortcuts and events
import { init, shortcuts, events } from 'md-textarea'

const customShortcuts = shortcuts // Modify shortcuts or define your own
const customEvents = events // Modify events or define your own

init(document.getElementsByTagName('textarea')[0], {
  shortcuts: customShortcuts
  events: customEvents,
})
```

### Built-in commands

- bold
- italic
- code
- heading
- link
- quote
- ol
- ul
- file upload

### Default shortcuts

_(Modifier key is `cmd` on mac, else `ctrl`)_

- `modifier+b` - bold
- `modifier+i` - italic
- `modifier+e` - code
- `modifier+k` - link
- `modifier+shift+.` - quote
- `modifier+shift+7` - ol
- `modifier+shift+8` - ul

### Default events

- dragenter - add css class `${classPrefix}--dragover`
- dragleave - remove css class `${classPrefix}--dragover`
- dragend - remove css class `${classPrefix}--dragover`
- drop - remove css class `${classPrefix}--dragover` && trigger fileUpload command if file has been dropped
- paste - paste text and format accordingly or trigger fileUpload command if file has been pasted
- keydown - if enter has been pressed, format new line accordingly to previous line's markup
