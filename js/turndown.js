const tds = new TurndownService({
  headingStyle: 'atx',
  hr: '---',
  codeBlockStyle: 'fenced',
  emDelimiter: '*'
})

// Gets the level for a quill list
function get_quill_list_level(li) {
  indent_class = li.className.match(/(?:^|\s)ql-indent-(\d)(?:\s|$)/)
  return indent_class ? indent_class[1] : 0
}

// spaghetti code for handling quill lists
// TODO Improve this
tds.addRule('quill-lists', {
  filter: ['li'],
  replacement: (content, node) => {
    level = get_quill_list_level(node)
    pnt = '-'
    if (node.parentElement.nodeName == 'OL') {
      neighbors = node.parentElement.children
      ord = 1
      for (i = [...neighbors].indexOf(node) - 1; i >= 0; i--) {
        cmp = get_quill_list_level(neighbors[i])
        if (cmp < level) break;
        if (cmp == level) ord++
      }
      pnt = ord + '.'
    }
    return `${'  '.repeat(level)}${pnt} ${content}\n`
  }
})