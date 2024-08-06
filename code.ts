// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 550, height: 500 });

figma.ui.onmessage = async msg => {
  if (msg.type === 'update-sound') {
    await updateSound(msg.sound);
  } else if (msg.type === 'get-keys') {
    const keys = await figma.clientStorage.keysAsync();
    if (keys.length > 0) {
      figma.ui.postMessage({ type: 'keys', keys });
    } else {
      figma.ui.postMessage({ type: 'init'});
    }
  } else if (msg.type === 'get-sound') {
    const data = await figma.clientStorage.getAsync(msg.key);
    figma.ui.postMessage({ type: 'sound', key: msg.key, value: data });
  } else if (msg.type === 'cancel') {
    figma.closePlugin();
  }
};

async function updateSound(sound) {
  await figma.clientStorage.setAsync(sound.name, sound.metaphors);
}
