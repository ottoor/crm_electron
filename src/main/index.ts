import { app, shell, BrowserWindow , ipcMain , dialog , screen , Tray , Menu } from 'electron'
import * as path from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

import EventRouter from "./router/EventRouter";
import routers from "./router/router.template";

//loading页面
import loadingFrame from './frame/loadingFrame.js'
let loadingWindow = new loadingFrame();

function createWindow(): void {
  
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width:1296,
    height:720,
    minWidth: 1296,
    minHeight: 720,
    show: false,
    // titleBarStyle:'hidden',
    frame:false,
    // autoHideMenuBar: true,
    ...(process.platform === 'linux'
      ? {
          icon: path.join(__dirname, '../../build/icon.png')
        }
      : {}),
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  //系统托盘​
  //let tray = new Tray(path.join(__dirname,'../../resources/icon.png'));

  // mainWindow.on('ready-to-show', () => {
  //   mainWindow.show()
  // })

  loadingWindow.create();

  const eventRouter = new EventRouter();
  eventRouter.addApi('app', app)
  eventRouter.addApi('dialog', dialog)
  eventRouter.addApi('BrowserWindow',BrowserWindow);
  eventRouter.addApi('window',mainWindow);
  eventRouter.addApi('loadingWindow',loadingWindow);
  eventRouter.addApi('screen',screen);
  eventRouter.addRoutes(routers);

  //接收渲染进程，主入口
  ipcMain.handle('renderer-to-main', (e, data) => {
    //data是渲染进程，传递过来的参数
    //eventRouter是一个对象
    eventRouter.router(data);
  })


  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }
}



  

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow();

   //mac os 
   /*
   const isMac = process.platform === 'darwin'
   const templates = [
     isMac ? {
           label: app.name,
           submenu: [
             { label: '关于软件' },
           ]
         }
       : {},
     {
       
       label:'aa1',
       submenu: [
         { 
           label: 'aaaa',
           click:()=>{
             app.quit();
           }
         },
       ]
     },
     {
       label:'bb2',
       submenu: [
         { label: 'bbbb' },
       ]
     },
     {
       label:'cc3',
       submenu: [
         { label: 'cccc' },
       ]
     }
  ]
  const menu = Menu.buildFromTemplate(templates);
  Menu.setApplicationMenu(menu);
  */


  ipcMain.handle('updates', async ( event, args) => {
    const mainWindowItem = new BrowserWindow({
      width: 600,
      height: 300,
      show: false,
      autoHideMenuBar: true,
      ...(process.platform === 'linux'
        ? {
            icon: path.join(__dirname, '../../build/icon.png')
          }
        : {}),
      webPreferences: {
        preload: path.join(__dirname, '../preload/index.js'),
        sandbox: false
      }
    })


    mainWindowItem.on('ready-to-show', () => {
      mainWindowItem.show()
    })

    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      mainWindowItem.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
      mainWindowItem.loadFile(path.join(__dirname, '../renderer/index.html'))
    }


  })



  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
