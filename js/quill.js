Quill.register("modules/word_count", function (quill, options) {
  var count_box = document.querySelector(options.count_box);
  set_word_count = (text) => {
    update = text.trim().split(/\s+|-|\//).filter(Boolean).length + " words"
    if (update != count_box.innerText)
      count_box.innerText = update
  }
  quill.on("selection-change", (range, oldRange, source) => {
    if (range) {
      var text = quill.getText(range.index, range.length);
      set_word_count((text.length > 0) ? text : quill.getText())
    }
  });
  quill.on("text-change", (delta, oldDelta, source) => {
    if (quill.getText().length > 0) {
      set_word_count(quill.getText())
    }
  });
})

function get_after(item, arr) { return arr[Math.min(arr.indexOf(item) + 1, arr.length - 1)] }
function get_before(item, arr) { return arr[Math.max(arr.indexOf(item) - 1, 0)] }

Quill.register("modules/alignment", function (quill, options) {
  const states = [undefined, "center", "right"]
  quill.keyboard.addBinding({
    key: 39, // Arrow Right
    shortKey: "true",
    handler: (range, context) => quill.format("align", get_after(context.format.align, states))
  })
  quill.keyboard.addBinding({
    key: 37, // Arrow Left
    shortKey: "true",
    handler: (range, context) => quill.format("align", get_before(context.format.align, states))
  })
})

Quill.register("modules/headers", function (quill, options) {
  const states = [undefined, 3, 2, 1] // Headers 4 and 5 are pathetic and thus excluded
  quill.keyboard.addBinding({
    key: 40, // Arrow Down
    shortKey: "true",
    handler: (range, context) => quill.format("header", get_before(context.format.header, states))
  })
  quill.keyboard.addBinding({
    key: 38, // Arrow Up
    shortKey: "true",
    handler: (range, context) => quill.format("header", get_after(context.format.header, states))
  })
})

Quill.register("modules/filesave", function (quill, options) {
  quill.keyboard.addBinding({
    key: "S",
    shortKey: "true",
    handler: (range, context) => {
      show_prompt("Enter Filename (esc to cancel)", true, (filename) => {
        var blob = new Blob([tds.turndown(quill.root)], { type: "text/plain;charset=utf-8" })
        saveAs(blob, filename + (filename.includes(".") ? "" : ".md"))
      }, () => quill.focus())
      return false
    }
  })
})

Quill.register("modules/caching", function (quill, options) {
  quill.on("text-change", () => {
    localStorage.setItem("cache", JSON.stringify(quill.getContents()))
  })
})

Quill.register("modules/gpt3", function (quill, options) {
  quill.keyboard.addBinding({
    key: 'G',
    altKey: 'true',
    handler: (range, context) => {
      range = quill.getSelection()
      if (range && localStorage.getItem('api-key') !== null) {
        [s, e] = range.length == 0 ? [0, range.index] : [range.index, range.length]
        text = quill.getText(s, e)
        complete(localStorage.getItem('api-key'), text).then(txt => quill.insertText(e, txt))
      }
    }
  })
})

Quill.register('modules/colors', function (quill, options) {
  const keymap = {
    '1': '#9bf6ff',
    '2': '#fdffb6',
    '3': '#caffbf',
    '4': '#ffd6a5',
    '5': '#ffadad',
    '6': '#a0c4ff',
    '7': '#bdb2ff',
    '8': '#ffc6ff',
    '9': 'white'
  }
  Object.entries(keymap).forEach(([k, v]) => quill.keyboard.addBinding({
    key: k,
    altKey: 'true',
    handler: (range, context) => quill.format('color', v)
  }))
})

Quill.register('modules/strike', function (quill, options) {
  quill.keyboard.addBinding({
    key: 's',
    altKey: 'true',
    handler: (range, context) => quill.format('strike', true)
  })
})

// Use <div> instead of <p> to prevent unexpected copy behavior
const Block = Quill.import('blots/block')
Block.tagName = 'DIV'
Quill.register(Block, true)

const username = localStorage.getItem("username")
const cached = localStorage.getItem("cache")

var quill = new Quill("#editor", {
  modules: {
    word_count: { count_box: "#word-count" },
    alignment: true,
    headers: true,
    filesave: true,
    caching: true,
    gpt3: true,
    colors: true,
    strike: true
  },
  placeholder: `Hey ${username}!`,
  scrollingContainer: 'html'
})

if (!username) show_prompt("Type your name!", false, (uname) => {
  quill.root.dataset.placeholder = `Hey ${uname}!`
  localStorage.setItem("username", uname)
}, () => quill.focus())

if (cached) quill.setContents(JSON.parse(cached))

// Readme stuff
async function fetch_text(url, params) {
  let res = await fetch(url, params)
  if (!res.ok) throw Error(res.statusText)
  return await res.text()
}

fetch_text('https://swag31415.github.io/Txty/readme.md').then(text => {
  text = text.match(/## Features[\s\S]*?I don't feel like listing them lmao/gm)
  text = 'Welcome to Txty! Swag\'s text editor.\n\n' + text
  quill.root.dataset.placeholder += '\n\n' + text
})