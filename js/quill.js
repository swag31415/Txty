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
  filename_input = document.getElementById("filename-input")
  function show_modal(show) { filename_input.parentElement.style.visibility = show ? "visible" : "hidden" }
  quill.keyboard.addBinding({
    key: 'S',
    shortKey: 'true',
    handler: (range, context) => {
      show_modal(true)
      window.setTimeout(() => filename_input.focus(), 50) // idk why 0 doesn't work
      return false
    }
  })
  filename_input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault()
      var blob = new Blob([quill.getText()], { type: 'text/plain;charset=utf-8' })
      saveAs(blob, filename_input.value + (filename_input.value.includes('.') ? '' : '.txt'))
      filename_input.value = ""
    }
    if (event.key === "Escape" || event.key === "Enter") {
      show_modal(false)
      quill.focus()
    }
  })
})

var quill = new Quill("#editor", {
  modules: {
    word_count: { count_box: "#word-count" },
    alignment: true,
    headers: true,
    filesave: true
  },
  placeholder: "Hey Swag!"
})