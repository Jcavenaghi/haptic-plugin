// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 550, height: 500 });

figma.ui.onmessage = async msg => {
  if (msg.type === 'update-sound') {
    await updateSound(msg.sound);

  } else if (msg.type === 'check-token') {
    const access_token = await figma.clientStorage.getAsync('access_token');
    let registered = false;
    if (access_token) {
      registered = true;
    }
    figma.ui.postMessage({ type: 'result-token', value: registered});

  } else if (msg.type === 'initialize-tokens') {
    const access_token = await figma.clientStorage.getAsync('access_token');
    const refresh_token = await figma.clientStorage.getAsync('refresh_token');
    let registered = false;
    if (access_token && refresh_token) {
      registered = true;
    }
    figma.ui.postMessage({ type: 'initialize-tokens-result', value: registered, tokens: { access_token, refresh_token} });

  } else if (msg.type === 'save-token') {
    await figma.clientStorage.setAsync('access_token', msg.token.access_token);
    await figma.clientStorage.setAsync('refresh_token', msg.token.refresh_token);

  } else if (msg.type === 'get-keys') {
    const keys = await figma.clientStorage.keysAsync();
    if (keys.length > 0) {
      figma.ui.postMessage({ type: 'keys', keys });
    } else {
      figma.ui.postMessage({ type: 'init'});
    }

  } else if (msg.type === 'get-sound') {
    const data = await figma.clientStorage.getAsync(msg.key);
    const url = await figma.clientStorage.getAsync(msg.key+"-url");
    const image = await figma.clientStorage.getAsync(msg.key+"-image");
    const external = url && image;
    figma.ui.postMessage({ type: 'sound', key: msg.key, value: data, url, image, external });

  } else if (msg.type === 'sound-uploaded') {
    await figma.clientStorage.setAsync(msg.sound.key, msg.sound.metaphors);
    await figma.clientStorage.setAsync(msg.sound.key+"-url", msg.sound.url);
    await figma.clientStorage.setAsync(msg.sound.key+"-image", msg.sound.image);

  } else if (msg.type === 'cancel') {
    figma.closePlugin();
  }
};

async function updateSound(sound: {name: string, metaphors: string}) {
  await figma.clientStorage.setAsync(sound.name, sound.metaphors);
}