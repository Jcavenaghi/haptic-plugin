// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 550, height: 500 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === "update-sound") {
    await updateSound(msg.sound);
  } else if (msg.type === "check-token") {
    const access_token = await figma.clientStorage.getAsync("access_token");
    let registered = false;
    if (access_token) {
      registered = true;
    }
    figma.ui.postMessage({ type: "result-token", value: registered });
  } else if (msg.type === "initialize-tokens") {
    const access_token = await figma.clientStorage.getAsync("access_token");
    const refresh_token = await figma.clientStorage.getAsync("refresh_token");
    let registered = false;
    if (access_token && refresh_token) {
      registered = true;
    }
    figma.ui.postMessage({
      type: "initialize-tokens-result",
      value: registered,
      tokens: { access_token, refresh_token },
    });
  } else if (msg.type === "save-token") {
    await figma.clientStorage.setAsync("access_token", msg.token.access_token);
    await figma.clientStorage.setAsync(
      "refresh_token",
      msg.token.refresh_token
    );
  } else if (msg.type === "get-keys") {
    const keys = await figma.clientStorage.keysAsync();
    if (keys.length > 0) {
      figma.ui.postMessage({ type: "keys", keys });
    } else {
      figma.ui.postMessage({ type: "init" });
    }
  } else if (msg.type === "get-sound") {
    const data = await figma.clientStorage.getAsync(msg.key);
    const url = await figma.clientStorage.getAsync(msg.key + "-url");
    const image = await figma.clientStorage.getAsync(msg.key + "-image");
    const external = url && image;
    figma.ui.postMessage({
      type: "sound",
      key: msg.key,
      value: data,
      url,
      image,
      external,
    });
  } else if (msg.type === "sound-uploaded") {
    await figma.clientStorage.setAsync(msg.sound.key, msg.sound.metaphors);
    await figma.clientStorage.setAsync(msg.sound.key + "-url", msg.sound.url);
    await figma.clientStorage.setAsync(
      msg.sound.key + "-image",
      msg.sound.image
    );
  } else if (msg.type === "cancel") {
    figma.closePlugin();
  } else if (msg.type === "add-to-figma") {
    const array = msg.array;

    await figma.loadFontAsync({ family: "Inter", style: "Regular" });

    // Create a frame
    const frame = figma.createFrame();
    frame.resize(400, 500);
    frame.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    frame.name = "Haptic Interaction Frame";

    // Create a text element
    const text = figma.createText();
    text.characters = `Desafortunadamente, Figma aun no permite ejecutar vibraciones. Sin embargo puede seguir los siguientes pasos realizarlo en Framer:
  1. Crear una cuenta y proyecto en framer.com
  2. Utilizando el plugin Figma to HTML with Framer, copie los frames que representan la vista antes de presionar el boton en la pagina 1
  3. De misma manera, cree una segunda pagina en framer y pegue la vista luego de oprimir el boton que desencadena la vibracion
  4. Agregue el boton que permitira ejecutar la vibracion pegando el siguiente link: https://framer.com/m/Vibrate-ElkP.js@vp5tTtxDs8IVVNJUEcLu
  5. Seleccionar el boton agregado y en el panel de propiedades, en el campo de "Vibration pattern" introducir lo siguiente:`;
    text.fontSize = 16;
    text.resize(380, 350);
    text.x = 10;
    text.y = 10;
    text.fills = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }]; // Set text color to black
    frame.appendChild(text);

    // Create a note
    const note = figma.createText();
    note.characters = `${array.join(",")}`;
    note.fontSize = 14;
    note.resize(380, 120);
    note.x = 10;
    note.y = 350;
    note.fills = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }]; // Set text color to black
    frame.appendChild(note);

    frame.resize(400, 470);

    // Add the frame to the current page
    figma.currentPage.appendChild(frame);
  }
};

async function updateSound(sound: { name: string; metaphors: string }) {
  await figma.clientStorage.setAsync(sound.name, sound.metaphors);
}
