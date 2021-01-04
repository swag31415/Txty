function show_prompt(text, is_optional, handler, on_exit) {
  const prompt_box = document.getElementById("prompt-box")
  prompt_box.placeholder = text
  prompt_box.value = ""
  prompt_box.parentElement.style.visibility = "visible"
  window.setTimeout(() => prompt_box.focus(), 50) // idk why 0 doesn"t work

  prompt_box.onkeydown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault()
      handler(prompt_box.value)
    }
    if (event.key === "Enter" || (is_optional && event.key === "Escape")) {
      prompt_box.parentElement.style.visibility = "hidden"
      if (on_exit) on_exit()
    }
  }
}