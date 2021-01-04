// Shows a modal with a single input
function show_prompt(text, is_optional, handler, on_exit) {
  const prompt_box = document.getElementById("prompt-box") // Get the input
  prompt_box.placeholder = text // Set the prompt text
  prompt_box.value = "" // Ensure value is nothing
  prompt_box.parentElement.style.visibility = "visible" // and show it
  window.setTimeout(() => prompt_box.focus(), 50) // idk why 0 doesn"t work

  prompt_box.onkeydown = (event) => { // Handle entry
    if (event.key === "Enter") { // Run the handler upon entry
      event.preventDefault()
      handler(prompt_box.value)
    }
    if (event.key === "Enter" || (is_optional && event.key === "Escape")) { // Handle closing it
      prompt_box.parentElement.style.visibility = "hidden"
      if (on_exit) on_exit() // run the optional on_exit handler
    }
  }
}