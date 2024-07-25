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
    figma.ui.postMessage({ type: 'keys', keys });
  } else if (msg.type === 'get-sound') {
    const data = await figma.clientStorage.getAsync(msg.key);
    figma.ui.postMessage({ type: 'sound', key: msg.key, value: data });
  } else if (msg.type === 'cancel') {
    figma.closePlugin();
  }
};

// async function loadImage(url) {
//   const response = await fetch(url);
//   const arrayBuffer = await response.arrayBuffer();
//   const image = figma.createImage(new Uint8Array(arrayBuffer));
//   return image;
// }

// function playSound(url) {
//   const audio = new Audio(url);
//   audio.play().catch(err => console.error("Error playing sound:", err));
// }

async function updateSound(sound) {
  await figma.clientStorage.setAsync(sound.name, sound.metaphors);
  console.log("KEYS MODIFIED:", await figma.clientStorage.keysAsync());
}


// async function getMetaphors(sound) {
//   return await figma.clientStorage.getAsync(sound.name) || sound.metaphors;
// }

// async function updateSoundMetadata(updatedSound) {
//   const sounds = await figma.clientStorage.getAsync('sounds') || {};
//   sounds[updatedSound.id] = updatedSound;
//   await figma.clientStorage.setAsync('sounds', sounds);
// }

// async function getSounds() {
//   const storedSounds = await figma.clientStorage.getAsync('sounds') || {};
//   return Object.values(storedSounds);
// }

// async function loadAndSendSounds() {
//   const sounds = await getSounds();
//   figma.ui.postMessage({ type: 'load-sounds', sounds });
// }

// Nueva función para cargar los sonidos desde el archivo JSON
// async function loadSoundsFromJSON() {
//   const response = await fetch('https://example.com/path/to/sounds.json'); // Reemplaza esta URL con la URL real de tu archivo JSON
//   const sounds = await response.json();
//   sounds.forEach(sound => {
//     updateSoundMetadata(sound);
//   });
//   loadAndSendSounds();
// }

// Llamada a la nueva función
// loadSoundsFromJSON();
