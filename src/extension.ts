import * as vscode from "vscode";
import chroma from "chroma-js";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.generatePalette",
    () => {
      // Prompt for a base color input (hex code or color name)
      vscode.window
        .showInputBox({
          prompt: "Enter a base color (e.g., #64af6a or red)",
        })
        .then((color) => {
          if (color) {
            const hexColor = chroma.valid(color) ? chroma(color).hex() : null;
            if (hexColor) {
              generateColorPalette(hexColor);
            } else {
              vscode.window.showErrorMessage(
                "Invalid color. Please try again."
              );
            }
          }
        });
    }
  );

  context.subscriptions.push(disposable);
}

function generateColorPalette(baseColor: string) {
  try {
    let palette = {
      Modern: generateShades(baseColor, "brighten"),
      Classic: generateShades(baseColor, "darken"),
      Vibrant: generateShades(baseColor, "saturate"),
      OldSchool: generateShades(baseColor, "desaturate"),
      Vintage: generateShades(baseColor, "setHue"),
    };

    const panel = vscode.window.createWebviewPanel(
      "colorPalette",
      "Generated Color Palette",
      vscode.ViewColumn.One,
      { enableScripts: true }
    );

    panel.webview.html = getWebviewContent(palette);
  } catch (error) {
    vscode.window.showErrorMessage(
      "Error generating color palette. Please try again."
    );
  }
}

function generateShades(baseColor: string, type: string): string[] {
  let shades: string[] = [];
  for (let i = 1; i <= 5; i++) {
    switch (type) {
      case "brighten":
        shades.push(
          chroma(baseColor)
            .brighten(i * 0.5)
            .hex()
        );
        break;
      case "darken":
        shades.push(
          chroma(baseColor)
            .darken(i * 0.5)
            .hex()
        );
        break;
      case "saturate":
        shades.push(
          chroma(baseColor)
            .saturate(i * 0.5)
            .hex()
        );
        break;
      case "desaturate":
        shades.push(
          chroma(baseColor)
            .desaturate(i * 0.5)
            .hex()
        );
        break;
      case "setHue":
        shades.push(
          chroma(baseColor)
            .set("hsl.h", `+${i * 10}`)
            .hex()
        );
        break;
    }
  }
  return shades;
}

function getWebviewContent(palette: { [key: string]: string[] }) {
  let paletteHtml = Object.keys(palette)
    .map((category) => {
      const shades = palette[category]
        .map(
          (color) => `
		  <div style="position: relative; display: flex; align-items: center; margin: 5px;">
			<div style="background-color: ${color}; width: 70px; height: 70px; border-radius: 5px; margin-right: 5px; border: 1px solid #ccc;"></div>
			<button style="padding: 5px; cursor: pointer;" onclick="copyToClipboard('${color}')">Copy ${color}</button>
		  </div>
		`
        )
        .join("");

      return `
		  <div style="margin: 10px; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
			<h3 style="margin: 0; color: #f0f0f0;">${category}</h3>
			<div style="display: flex; flex-wrap: wrap; gap: 10px;">
			  ${shades}
			</div>
		  </div>
		`;
    })
    .join("");

  return `
	  <!DOCTYPE html>
	  <html lang="en">
	  <head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Color Palette</title>
		<style>
		  body { 
			font-family: Arial, sans-serif; 
			background-color: #1e1e1e; /* Dark background */
			color: #ffffff; /* Light text */
		  }
		  h2 { color: #ffffff; }
		  button { 
			padding: 5px; 
			cursor: pointer; 
			background-color: transparent; 
			color: white; 
			border: none; 
			border-radius: 5px; 
		  }
		  button:hover { background-color: #6a6a6a; }
		  .color-box { display: inline-block; margin: 5px; border: 1px solid #ccc; }
		</style>
	  </head>
	  <body>
		<h2>Generated Color Palette</h2>
		${paletteHtml}
		<script>
		  function copyToClipboard(color) {
			navigator.clipboard.writeText(color).then(() => {
			  alert("Color " + color + " copied to clipboard!");
			});
		  }
		</script>
	  </body>
	  </html>
	`;
}

// This method is called when your extension is deactivated
export function deactivate() {}
