# Color Palette Generator

## Overview

A Visual Studio Code extension that generates color palettes based on a user-defined base color. The extension allows you to input a color name or hex code and provides 5 shades for each category: Modern, Classic, Vibrant, Old School, and Vintage.

## Features

- Input color as a name (e.g., "red") or hex code (e.g., "#64af6a").
- Generates a palette of 5 shades for different categories.
- Copy color values to the clipboard easily.

## Installation

1. Open VS Code.
2. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar or pressing `Ctrl+Shift+X`.
3. Search for "Color Palette Generator".
4. Click "Install".

## Usage

1. Open the Command Palette (`Ctrl+Shift+P`).
2. Type `Generate Color Palette` and select the command.
3. Enter a base color (either by name or hex code) in the input box.
4. A new panel will appear showing the generated color palette.
5. Click the "Copy" button next to any color to copy it to the clipboard.

## Example

- Input: `#64af6a`
- Output:
  - Modern: Shades of the color generated by brightening.
  - Classic: Shades generated by darkening.
  - Vibrant: Shades generated by saturating.
  - Old School: Shades generated by desaturating.
  - Vintage: Shades generated by adjusting hue.

## Contributions

Contributions are welcome! Feel free to submit issues or pull requests.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements

- [Chroma.js](https://gka.github.io/chroma.js/) for color manipulation.

```bash
ashd
```
