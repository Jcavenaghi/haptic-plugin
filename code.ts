// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 550, height: 500 });

let registered = false;

figma.ui.onmessage = async msg => {
  if (msg.type === 'update-sound') {
    if (registered) {
      await updateSound(msg.sound);
    } else {
      // Make the user register with the freesound API

      registered = true;
    }
  } else if (msg.type === 'check-registration') {
    const token = await figma.clientStorage.getAsync('token');
    if (token) {
      registered = true;
    }
    figma.ui.postMessage({ type: 'registration', value: registered });
  } else if (msg.type === 'save-auth-code') {
    const success = await setUserAccessToken(msg.token);
    if (success) {
      registered = true;
      figma.ui.postMessage({ type: 'result-save-auth', value: registered });
    }
    else {
      figma.ui.postMessage({ type: 'result-save-auth', value: false });
    }
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

async function updateSound(sound: {name: string, metaphors: string}) {
  await figma.clientStorage.setAsync(sound.name, sound.metaphors);
}

async function setUserAccessToken(token: string) {
  const data = new FormData();
  data.append("client_id", "sk4SYvtNWujw8dwXsjub");
  data.append("client_secret", "BISQF8r4KvtJAnTciMYXuyigPKwBmT4B4AvibBpf");
  data.append("grant_type", "authorization_code");
  data.append("code", token);
  
  const requestOptions: RequestInit = {
    method: "POST",
    body: data
  };
  
  const request = await fetch("https://freesound.org/apiv2/oauth2/access_token/", requestOptions);
  console.log("request", request);
  const response = await request.json();
  console.log("response", response);
  
  if (response.access_token) {
    await figma.clientStorage.setAsync('access_token', response.access_token);
    await figma.clientStorage.setAsync('refresh_token', response.refresh_token);
    return true;
  } else {
    return false;
  }
}