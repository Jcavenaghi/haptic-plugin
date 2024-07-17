// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = async msg => {
  if (msg.type === 'select-sound') {
    const soundUrl = msg.url;
    const nodes = figma.currentPage.selection;

    if (nodes.length > 0) {
      const node = nodes[0];
      
      // Crear un iframe con la URL del sonido
      const iframeNode = figma.createRectangle();
      iframeNode.fills = [];
      iframeNode.resizeWithoutConstraints(200, 40); // Tamaño del iframe

      const svg = `
        <svg width="200" height="40" xmlns="http://www.w3.org/2000/svg">
          <foreignObject width="100%" height="100%">
            <body xmlns="http://www.w3.org/1999/xhtml">
              <audio controls>
                <source src="${soundUrl}" type="audio/wav">
                Your browser does not support the audio element.
              </audio>
            </body>
          </foreignObject>
        </svg>
      `;

      const svgBytes = new TextEncoder().encode(svg);
      const image = await figma.createImage(svgBytes);
      iframeNode.fills = [{ type: 'IMAGE', imageHash: image.hash, scaleMode: 'FILL' }];

      node.appendChild(iframeNode);
      figma.notify('Sound URL attached to the selected frame.');
    } else {
      figma.notify('Please select a frame.');
    }
  }

  if (msg.type === 'cancel') {
    figma.closePlugin();
  }
};