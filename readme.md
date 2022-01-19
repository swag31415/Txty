# Txty
My very own text editor, built right into the browser. Find it [here](https://swag31415.github.io/Txty/) or as part of [the swag-site](https://swag31415.github.io/Portfolio/). I recommend saving it as your chrome home page and using it for literally everything.

## Features
### Custom Hotkeys
- Use control and up and down arrows for various headers
- Use control and left and right arrows to align text left and right
- `Control + S` to download as a file
  - Everything autosaves in the browser meaning the next time you open this page on this computer, everything will be there
  - If you have multiple tabs with this page open, only the most recently edited one will be saved
  - By default, the file saves as a markdown file, which can be opened by any text editor. To save as a different file type include the file extension.
    - For example to save as a text file type `foo.txt` where `foo` is your filename
    - Everything is converted to markdown syntax, and images are converted to base64
- If you have a GPT-3 api key you can use `localStorage.setItem('api-key', foo)` in the browser console where `foo` is the api key to enable text generation
  - Afterward, you can simply press `Alt + G` to generate some text
- Use alt and the number keys to change text color

### Common Hotkeys
- `Control + B` to bold
- `Control + U` to underline
- `Control + I` to italisize
- `Alt + S` to strike-through text
- `Control + X` to cut
- `Control + C` to copy
- `Control + V` to paste
  - By default, this preserves all formatting. To paste without formatting use `Control + Shift + V`
  - You can also paste images
- `Control + Z` to undo
- `Control + Y` to redo
- `Control + A` to select everything
- Use shift and left and right arrows to select stuff
- `Control + F` to search
- Use control and plus and minus keys to change font size
- `Control + P` to print page
  - The black background shows up in the print. To remove it uncheck "include background graphics"
  - I find setting margins to none gets the best looking prints
- ... there are more but I don't feel like listing them lmao

## License
[MIT](https://choosealicense.com/licenses/mit/)
