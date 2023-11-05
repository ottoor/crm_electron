"use strict";
const electron = require("electron");
const path = require("path");
const utils = require("@electron-toolkit/utils");
const https = require("https");
const fs = require("fs");
const os = require("os");
const electronUpdater = require("electron-updater");
function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const path__namespace = /* @__PURE__ */ _interopNamespaceDefault(path);
class EventRouter {
  #api = {};
  #routers;
  constructor() {
    this.routers = new Array();
  }
  //添加单个路由
  addRoute(route) {
    this.routers.push(route);
  }
  //添加多个路由
  addRoutes(routers2) {
    this.routers = this.routers.concat(routers2);
  }
  //移除指定名称的路由
  removeRoute(name) {
    for (let i = 0; i < this.routers.length; i++) {
      if (this.routers[i].name === name) {
        this.routers.splice(i, 1);
      }
    }
  }
  //触发指定名称的路由回调
  router(data) {
    for (let i = 0; i < this.routers.length; i++) {
      let r = this.routers[i];
      if (data.name === r.name && r.callback) {
        r.callback(this.#api, data);
      }
    }
  }
  //添加api
  addApi(key, api) {
    this.#api[key] = api;
  }
}
class EventRoute {
  #name;
  #event;
  #callback;
  /** 创建路由实例
   * * @param {string} name - 路由名称。
   * * @param {string} event - 要监听的事件。
   * * @param {object} data - 传递给回调函数的数据。
   * * @param {function} callback - 当事件被触发时要执行的回调函数。
   * */
  constructor(name, event, callback) {
    this.name = name;
    this.event = event;
    this.callback = callback;
  }
}
const routers = new Array();
routers.push(
  new EventRoute("download-http-file", "event", (api, data = {}) => {
    let url = data.data;
    let filename = url.substring(url.lastIndexOf("/") + 1);
    https.get(url, (res) => {
      console.log(os.homedir());
      api.dialog.showSaveDialog({
        title: "请选择保存位置...",
        defaultPath: path.format({ dir: os.homedir() + "\\Downloads\\", base: filename }),
        filters: [
          { name: "Microsoft Excel 文件", extensions: ["xlsx"] }
        ]
      }).then((result) => {
        const file = fs.createWriteStream(result.filePath);
        res.pipe(file);
        file.on("finish", () => {
          file.close();
          api.dialog.showMessageBox({
            title: "提示信息",
            message: "下载完成",
            type: "info"
          });
        }).on("error", (err) => {
        });
      });
    });
  })
);
routers.push(
  new EventRoute("hide-loading-show-mian", "event", (api, data = {}) => {
    api.loadingWindow.destroy();
    setTimeout(() => {
      api.window.show();
    }, 500);
  })
);
routers.push(
  new EventRoute("quit-window", "event", (api, data = {}) => {
    api.app.quit();
  })
);
routers.push(
  new EventRoute("close-window", "event", (api, data = {}) => {
    hideWindow();
  })
);
routers.push(
  new EventRoute("max-window", "event", (api, data = {}) => {
    api.window.maximize();
  })
);
routers.push(
  new EventRoute("min-window", "event", (api, data = {}) => {
    api.window.minimize();
  })
);
const context = {
  allowQuitting: false,
  // 是否退出应用
  isShow: false,
  //  控制显示隐藏
  listWindow: null
};
const showWindow = () => {
  if (context.listWindow && !context.listWindow.isDestroyed()) {
    context.isShow = true;
    context.listWindow.show();
  }
};
const hideWindow = () => {
  if (context.listWindow && !context.listWindow.isDestroyed()) {
    context.isShow = false;
    context.listWindow.hide();
  }
};
const createListWindow = () => {
  context.listWindow = new electron.BrowserWindow({
    width: 1200,
    height: 350,
    show: false,
    frame: false,
    alwaysOnTop: true,
    //窗口置顶
    transparent: true,
    //窗口透明
    hasShadow: false,
    //去除阴影
    autoHideMenuBar: true,
    ...process.platform === "linux" ? {
      icon: path.join(__dirname, "../../build/icon.png")
    } : {},
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: false
    }
  });
  context.listWindow.on("ready-to-show", () => {
    let heihgt = electron.screen.getPrimaryDisplay().size.height;
    context.listWindow.setBounds({
      y: heihgt - 400
    });
    context.listWindow.show();
  });
  context.isShow = true;
  context.listWindow.on("close", () => {
    context.listWindow.hide();
  });
  if (process.env["ELECTRON_RENDERER_URL"]) {
    context.listWindow.loadURL(process.env["ELECTRON_RENDERER_URL"] + "/#/down");
  } else {
    context.listWindow.loadFile(path.join(__dirname, "../renderer/index.html"), {
      hash: "/down"
    });
  }
};
routers.push(
  new EventRoute("open-window-down", "event", (api, data = {}) => {
    if (context.listWindow == null) {
      createListWindow();
    } else {
      if (context.isShow) {
        hideWindow();
      } else {
        showWindow();
      }
    }
  })
);
let isKiosk = false;
routers.push(
  new EventRoute("custom-adsorption", "event", (api, data = {}) => {
    if (!isKiosk) {
      let res = data.data;
      context.listWindow.setPosition(res.appX, res.appY);
    }
  })
);
routers.push(
  new EventRoute("download", "event", (api, data = {}) => {
    let url = data.data.url;
    let filename = url.substring(url.lastIndexOf("/") + 1);
    https.get(url, (res) => {
      api.dialog.showSaveDialog({
        title: "下载",
        defaultPath: filename
      }).then((data2) => {
        const file = fs.createWriteStream(data2.filePath);
        res.pipe(file);
        file.on("finish", () => {
          file.close();
          api.dialog.showMessageBox({
            title: "提示信息",
            message: "下载完成",
            type: "info"
          });
        }).on("error", (err) => {
          api.dialog.showMessageBox({
            title: "提示信息",
            message: err,
            type: "error"
          });
        });
      });
    });
  })
);
routers.push(
  new EventRoute("chat", "event", (api, data = {}) => {
    const chat = new electron.BrowserWindow({
      width: 1050,
      height: 700,
      show: false,
      autoHideMenuBar: true,
      ...process.platform === "linux" ? {
        icon: path.join(__dirname, "../../build/icon.png")
      } : {},
      webPreferences: {
        preload: path.join(__dirname, "../preload/index.js"),
        sandbox: false
      }
    });
    chat.on("ready-to-show", () => {
      chat.show();
    });
    if (process.env["ELECTRON_RENDERER_URL"]) {
      chat.loadURL(process.env["ELECTRON_RENDERER_URL"] + "/#/chat");
    } else {
      chat.loadFile(path.join(__dirname, "../renderer/index.html"));
    }
  })
);
routers.push(
  new EventRoute("kiosk", "event", (api, data = {}) => {
    isKiosk = data.kiosk;
  })
);
class AppUpdater {
  constructor(loadingWin) {
    if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
      Object.defineProperty(electron.app, "isPackaged", {
        get() {
          return true;
        }
      });
      electronUpdater.autoUpdater.updateConfigPath = path.join(__dirname, "../../dev-app-update.yml");
    }
    electronUpdater.autoUpdater.on("checking-for-update", () => {
      console.log("111当开始检查更新的时候触发");
    });
    electronUpdater.autoUpdater.on("update-available", () => {
      console.log("222当有可用更新的时候触发。 更新将自动下载。");
    });
    electronUpdater.autoUpdater.on("update-not-available", () => {
      console.log("333没有可更新的了");
      loadingWin.webContents.send("main-to-renderer", {
        name: "hide-loading-show-mian",
        event: "event",
        msg: "当没有可用更新的时候触发",
        data: null
      });
    });
    electronUpdater.autoUpdater.on("download-progress", (progressInfo) => {
      loadingWin.webContents.send("main-to-renderer", {
        name: "download-progress",
        event: "event",
        msg: "正在下载",
        data: progressInfo.percent
      });
    });
    electronUpdater.autoUpdater.on("update-downloaded", () => {
      loadingWin.webContents.send("main-to-renderer", {
        name: "hide-loading-show-mian",
        event: "event",
        msg: "当没有可用更新的时候触发",
        data: null
      });
    });
    if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
      electronUpdater.autoUpdater.checkForUpdates();
    } else {
      electronUpdater.autoUpdater.checkForUpdatesAndNotify();
    }
  }
}
class loadingFrame {
  #loadingWindow = null;
  //创建窗口
  create() {
    this.#loadingWindow = new electron.BrowserWindow({
      width: 600,
      height: 350,
      frame: false,
      show: false,
      ...process.platform === "linux" ? {
        icon: path.join(__dirname, "../../build/icon.png")
      } : {},
      webPreferences: {
        preload: path.join(__dirname, "../preload/index.js"),
        sandbox: false
      }
    });
    this.#loadingWindow.on("ready-to-show", () => {
      this.#loadingWindow.show();
      new AppUpdater(this.#loadingWindow);
    });
    this.#loadingWindow.loadFile(path.join(__dirname, "../../resources/loading/loading.html"));
  }
  //显示窗口
  show() {
    this.#loadingWindow.show();
  }
  //隐藏窗口
  hide() {
    this.#loadingWindow.hide();
  }
  //关闭 & 销毁窗口
  destroy() {
    this.#loadingWindow.close();
  }
}
let loadingWindow = new loadingFrame();
function createWindow() {
  const mainWindow = new electron.BrowserWindow({
    width: 1296,
    height: 720,
    minWidth: 1296,
    minHeight: 720,
    show: false,
    // titleBarStyle:'hidden',
    frame: false,
    // autoHideMenuBar: true,
    ...process.platform === "linux" ? {
      icon: path__namespace.join(__dirname, "../../build/icon.png")
    } : {},
    webPreferences: {
      preload: path__namespace.join(__dirname, "../preload/index.js"),
      sandbox: false
    }
  });
  loadingWindow.create();
  const eventRouter = new EventRouter();
  eventRouter.addApi("app", electron.app);
  eventRouter.addApi("dialog", electron.dialog);
  eventRouter.addApi("BrowserWindow", electron.BrowserWindow);
  eventRouter.addApi("window", mainWindow);
  eventRouter.addApi("loadingWindow", loadingWindow);
  eventRouter.addApi("screen", electron.screen);
  eventRouter.addRoutes(routers);
  electron.ipcMain.handle("renderer-to-main", (e, data) => {
    eventRouter.router(data);
  });
  mainWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(path__namespace.join(__dirname, "../renderer/index.html"));
  }
}
electron.app.whenReady().then(() => {
  utils.electronApp.setAppUserModelId("com.electron");
  electron.app.on("browser-window-created", (_, window) => {
    utils.optimizer.watchWindowShortcuts(window);
  });
  createWindow();
  electron.ipcMain.handle("updates", async (event, args) => {
    const mainWindowItem = new electron.BrowserWindow({
      width: 600,
      height: 300,
      show: false,
      autoHideMenuBar: true,
      ...process.platform === "linux" ? {
        icon: path__namespace.join(__dirname, "../../build/icon.png")
      } : {},
      webPreferences: {
        preload: path__namespace.join(__dirname, "../preload/index.js"),
        sandbox: false
      }
    });
    mainWindowItem.on("ready-to-show", () => {
      mainWindowItem.show();
    });
    if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
      mainWindowItem.loadURL(process.env["ELECTRON_RENDERER_URL"]);
    } else {
      mainWindowItem.loadFile(path__namespace.join(__dirname, "../renderer/index.html"));
    }
  });
  electron.app.on("activate", function() {
    if (electron.BrowserWindow.getAllWindows().length === 0)
      createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
