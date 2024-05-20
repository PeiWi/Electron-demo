/**
 * This file is used specifically and only for development. It installs
 * `electron-debug` & `vue-devtools`. There shouldn't be any need to
 *  modify this file, but it can be used to extend your development
 *  environment.
 */

/* eslint-disable */

// Install `electron-debug` with `devtron`
// require('electron-debug')({ showDevTools: true })
// import { BrowserWindow } from 'electron'

// // Install `vue-devtools`
// require('electron').app.on('ready', () => {
//   // let installExtension = require('electron-devtools-installer')
//   // installExtension.default(installExtension.VUEJS_DEVTOOLS)
//   //   .then(() => {})
//   //   .catch(err => {
//   //     console.log('Unable to install `vue-devtools`: \n', err)
//   //   })
//   BrowserWindow.addDevToolsExtension('node_modules/vue-devtools/vender')
// })

// Require `main` process to boot app

// import electronDebug from 'electron-debug'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import { app, BrowserWindow } from 'electron'

app.whenReady().then(() => {
  // allow for a small delay for mainWindow to be created
  setTimeout(() => {
    // Install `electron-debug` with `devtron`
    // electronDebug({
    //   showDevTools: true
    // });

    // Install vuejs devtools
    installExtension(VUEJS_DEVTOOLS)
      .then(name => {
        console.log(`Added Extension: ${name}`)
        // get main window
        const win = BrowserWindow.getFocusedWindow()
        if (win) {
          win.webContents.on('did-frame-finish-load', () => {
            win.webContents.once('devtools-opened', () => {
              win.webContents.focus()
            })
            // open electron debug
            console.log('Opening dev tools')
            win.webContents.openDevTools()
          })
        }
      })
      .catch(err => {
        console.log('An error occurred: ', err)
      })
  }, 250)
})

//import './electron-main'
require('./main')