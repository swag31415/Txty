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

// Complete text via GPT-3
async function complete(key, query) {
  resp = await fetch("https://api.openai.com/v1/engines/text-davinci-002/completions", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`
    },
    body: JSON.stringify({
      prompt: query,
      temperature: 0.7,
      max_tokens: 256
    })
  })
  data = await resp.json()
  return data.choices[0].text
}
