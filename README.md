<div align="center">
<img alt="Electron Eleventy Crossover Banner" src="https://raw.githubusercontent.com/soulehshaikh99/assets/master/create-electron-framework-app/readme/svg/Electron_Eleventy.svg" width="580" />
</div>
<br />
The boilerplate code to get started creating Cross-platform Desktop Apps with Electron and Eleventy as front-end technology.
<br />
<br />
<div align="center">

[![forthebadge](http://forthebadge.com/images/badges/built-by-developers.svg)](http://forthebadge.com)&nbsp;&nbsp;&nbsp;&nbsp;[![forthebadge](http://forthebadge.com/images/badges/makes-people-smile.svg)](http://forthebadge.com)<br />

[![forthebadge](http://forthebadge.com/images/badges/uses-html.svg)](http://forthebadge.com)&nbsp;&nbsp;&nbsp;[![forthebadge](http://forthebadge.com/images/badges/uses-css.svg)](http://forthebadge.com)&nbsp;&nbsp;&nbsp;[![forthebadge](http://forthebadge.com/images/badges/uses-js.svg)](http://forthebadge.com)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

</div>

## ✒️ Overview

The aim of this project is to provide Web Developers using `eleventy` the power to create cross-platform desktop apps using `electron`.

#### 🧐 What packages does the project use?

**`electron`** enables you to create desktop applications with pure JavaScript by providing a runtime with rich native (operating system) APIs. You could see it as a variant of the Node.js runtime that is focused on desktop applications instead of web servers.

**`electron-builder`** is used as a complete solution to package and build a ready for distribution (supports Numerous target formats) Electron app with "auto update" support out of the box.

**`electron-serve`** is used for Static file serving for Electron apps.

**`eleventy`** is a simpler static site generator. An alternative to Jekyll. Written in JavaScript. Transforms a directory of templates (of varying types) into HTML. Works with HTML, Markdown, Liquid, Nunjucks, Handlebars, Mustache, EJS, Haml, Pug, and JavaScript Template Literals.

**`concurrently`** is used to run multiple commands concurrently.

**`wait-on`** is used as it can wait for sockets, and http(s) resources to become available.
<br />

## 🚀 Getting Started

**Note:** If you wish to use npm over yarn then modify `package.json` by replacing `yarn` with `npm` in `electron-dev` and `preelectron-pack` scripts.
But I strongly recommend using <em>yarn</em> as it is a better choice when compared to <em>npm</em>.

### 🤓 Use this boilerplate

```bash
# Clone the Project

# Use degit scaffolding tool
$ npx degit soulehshaikh99/create-eleventy-electron-app create-eleventy-electron-app
# or GitHub CLI Users
$ gh repo clone https://github.com/soulehshaikh99/create-eleventy-electron-app.git
# or Normal Git Users
$ git clone https://github.com/soulehshaikh99/create-eleventy-electron-app.git

# Switch location to the cloned directory
$ cd create-eleventy-electron-app

# Install dependencies
$ yarn # or npm install

# Run your app
$ yarn electron-dev # or npm run electron-dev

# Package Your App
$ yarn electron-pack # or npm run electron-pack
```

### 💫 Create this boilerplate from scratch (Manual Setup)

#### 1) Start by installing `eleventy` globally

```bash
$ yarn global add eleventy
# npm i -g eleventy
``` 

#### 2) Create a project directory and switch location to it.

```bash
$ mkdir create-eleventy-electron-app
$ cd create-eleventy-electron-app
```

#### 3) Initialize project with your favorite package manager

```bash
# set entry point to main.js
# set name to create-eleventy-electron-app
$ yarn init # or npm init
```

#### 4) Download the starter eleventy project.

Just download this [src.zip](https://downgit.github.io/#/home?url=https://github.com/soulehshaikh99/create-eleventy-electron-app/tree/master/src) and extract this to your project directory `create-eleventy-electron-app`


#### 5) Install Development Dependencies

```bash
$ yarn add --dev clean-css html-minifier electron electron-builder wait-on concurrently
# npm i -D clean-css html-minifier electron electron-builder wait-on concurrently
```

#### 6) Install Production Dependency

```bash
$ yarn add electron-serve # or npm i electron-serve
```

#### 7) Your dependencies should look something like this

```json
"dependencies": {
  "electron-serve": "^1.0.0"
},
"devDependencies": {
  "clean-css": "^4.2.3",
  "concurrently": "^5.3.0",
  "electron": "^9.2.1",
  "electron-builder": "^22.8.0",
  "html-minifier": "^4.0.0",
  "wait-on": "^5.2.0"
}
```

#### 8) Create .eleventy.js file (eleventy configuration file)

```bash
# Windows Users
$ fsutil file createnew .eleventy.js 0
# notepad .eleventy.js 

# Linux and macOS Users
$ touch .eleventy.js
```


#### 10) Paste the below code in .eleventy.js file

```js
// Imports useful for minifying functionality
const cleancss = require("clean-css");
const htmlmin = require("html-minifier");

module.exports = function (eleventyConfig) {
    // The directory to copy while building the eleventy app
    eleventyConfig.addPassthroughCopy("src/assets");

    // Configuration responsible for minifying html
    eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
        if (outputPath.endsWith(".html")) {
            let minified = htmlmin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true
            });
            return minified;
        }
        return content;
    });

    // Configuration responsible for minifying css
    eleventyConfig.addFilter("cssmin", function (code) {
        return new cleancss({}).minify(code).styles;
    });

    // Configuration responsible for specifying the input and output directories to eleventy build command
    return {
        dir: {
            input: "src",
            output: "build"
        }
    };
};
```


#### 9) Create main.js file (serves as entry point for Electron App's Main Process)

```bash
# Windows Users
$ fsutil file createnew main.js 0
# notepad main.js 

# Linux and macOS Users
$ touch main.js
```

#### 10) Paste the below code in main.js file

```js
// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const path = require("path");
const serve = require("electron-serve");
const loadURL = serve({ directory: "build" });

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function isDev() {
  return !app.isPackaged;
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
    // Use this in development mode.
    icon: isDev()
      ? path.join(process.cwd(), "src/assets/favicon.png")
      : path.join(__dirname, "build/assets/favicon.png"),
    // Use this in production mode.
    // icon: path.join(__dirname, 'build/assets/favicon.png'),
    show: false,
  });

  // This block of code is intended for development purpose only.
  // Delete this entire block of code when you are ready to package the application.
  if (isDev()) {
    mainWindow.loadURL("http://localhost:8080/");
  } else {
    //Do not delete this statement, Use this piece of code when packaging app for production environment
    loadURL(mainWindow);
  }

  // Uncomment the following line of code when app is ready to be packaged.
  // loadURL(mainWindow);

  // Open the DevTools and also disable Electron Security Warning.
  // process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  // Emitted when the window is ready to be shown
  // This helps in showing the window gracefully.
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
```

#### 12) Add scripts in `package.json`

```bash
"scripts": {
  "dev": "eleventy --serve",
  "build": "eleventy",
  "electron": "wait-on http://localhost:8080 && electron .",
  "electron-dev": "concurrently \"yarn run dev\" \"yarn run electron\"",
  "preelectron-pack": "yarn run build",
  "electron-pack": "electron-builder"
}
```

#### 12) Add the following configuration in `package.json`

**Note:** build configuration is used by electron-builder, modify it if you wish to add more packaging and native distribution options for different OS Platforms.

```bash
"name": "create-eleventy-electron-app",
"main": "main.js",  # Application Entry Point, please verify entry point is set to main.js 
"build": {
  "icon": "src/assets/favicon.png",
  "productName": "Eleventy and Electron App",
  "files": [
      "build/**/*",
    "main.js"
  ],
  "win": {},  # Windows Specific Configuration
  "linux": {},  # Linux Specific Configuration
  "mac": {}  # MacOs Specific Configuration
}
```

#### 14) Test drive your app

```bash
# Run your app
$ yarn electron-dev # or npm run electron-dev

# Package Your App
$ yarn electron-pack # or npm run electron-pack
```

### 💯 Result

<div align="center">
<img alt="Electron Eleventy Window Screeenshot" src="https://raw.githubusercontent.com/soulehshaikh99/assets/master/create-electron-framework-app/readme/png/create-eleventy-electron-app.png" />
</div>

<h3>😍 Made with ❤️ from Souleh</h3>

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)
<br/>

<h3>📋 License: </h3>
Licensed under the <a href="https://github.com/soulehshaikh99/create-eleventy-electron-app/blob/master/LICENSE">MIT License</a>.