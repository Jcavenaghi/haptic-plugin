// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// This shows the HTML page in "ui.html".
figma.showUI(__html__, {width: 550, height: 500});

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = async msg => {
  if (msg.type === 'select-sound') {
    const sound = msg.sound;
    const nodes = figma.currentPage.selection;

    let frame;
    if (nodes.length > 0 && nodes[0].type === "FRAME") {
      frame = nodes[0];
    } else {
      frame = figma.createFrame();
      frame.resize(400, 400);
      frame.fills = [{ type: 'SOLID', color: { r: 1, g: 0, b: 0 } }];
      figma.currentPage.appendChild(frame);
    }

    frame.name = `Sound: ${sound.name}`;
    console.log(frame.name)
    // Agregar la imagen del sonido
    let imageNode = frame.findOne(node => node.name === 'Sound Image');
    if (!imageNode) {
      imageNode = figma.createRectangle();
      imageNode.name = 'Sound Image';
      frame.appendChild(imageNode);
    }
    const image = await loadImage(sound.image);
    imageNode.fills = [{ type: 'IMAGE', imageHash: image.hash }];
    imageNode.resize(50, 50);
    imageNode.x = 10;
    imageNode.y = 10;

    // Agregar la información del sonido
    let textNode = frame.findOne(node => node.name === 'Sound Info');
    if (!textNode) {
      textNode = figma.createText();
      textNode.name = 'Sound Info';
      frame.appendChild(textNode);
    }
    textNode.fontName = { family: 'Roboto', style: 'Regular' };
    await figma.loadFontAsync(textNode.fontName);
    textNode.characters = `Name: ${sound.name}\nMetaphors: ${sound.metaphors}`;
    textNode.x = 70;
    textNode.y = 10;

    // Agregar un botón para reproducir el sonido
    let playButtonNode = frame.findOne(node => node.name === 'Play Button');
    if (!playButtonNode) {
      playButtonNode = figma.createRectangle();
      playButtonNode.name = 'Play Button';
      frame.appendChild(playButtonNode);
    }
    playButtonNode.resize(100, 30);
    playButtonNode.cornerRadius = 5;
    playButtonNode.fills = [{ type: 'SOLID', color: { r: 0, g: 0.5, b: 1 } }];
    playButtonNode.x = 10;
    playButtonNode.y = 70;

    let buttonTextNode = playButtonNode.findOne(node => node.name === 'Button Text');
    if (!buttonTextNode) {
      buttonTextNode = figma.createText();
      buttonTextNode.name = 'Button Text';
      playButtonNode.appendChild(buttonTextNode);
    }
    buttonTextNode.fontName = { family: 'Roboto', style: 'Regular' };
    await figma.loadFontAsync(buttonTextNode.fontName);
    buttonTextNode.characters = 'Play Sound';
    buttonTextNode.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    buttonTextNode.x = 10;
    buttonTextNode.y = 5;

    playButtonNode.setPluginData('sound-url', sound.url);

    playButtonNode.on('click', () => {
      playSound(sound.url);
    });

    figma.viewport.scrollAndZoomIntoView([frame]);
  }

  if (msg.type === 'cancel') {
    figma.closePlugin();
  }
};

async function loadImage(url) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const image = figma.createImage(new Uint8Array(arrayBuffer));
  return image;
}

function playSound(url) {
  const audio = new Audio(url);
  audio.play().catch(err => console.error("Error playing sound:", err));
}