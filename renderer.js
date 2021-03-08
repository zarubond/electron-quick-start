// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

let counter = 0;
setInterval(() => {

    console.log('image swap');
    const img = document.createElement('img');

    img.src = 'file:///node_modules/electron/dist/resources/default_app.asar/icon.png';

    img.id = 'logo';
    img.onerror = (err) => {
        console.error(err);
    }
    document.body.appendChild(img);

    setTimeout(() => {
        const logo = document.getElementById('logo');
        if (logo) {
            document.body.removeChild(logo);
        }
    }, 500);

    //const title = document.getElementById('title');
    //title.innerText = 'Testing: ' + counter;
    counter++;
}, 1000);