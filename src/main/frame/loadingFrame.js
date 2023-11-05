//创建loading窗口的 :  显示 或 隐藏
import { BrowserWindow } from 'electron'
import path from 'path'
//引入开始检查更新的api文件
import AppUpdater from '../updater/AppUpdater.js'
export default class loadingFrame{
    #loadingWindow = null
    //创建窗口
    create(){
        this.#loadingWindow = new BrowserWindow({
            width:600,
            height:350,
            frame: false,
            show: false,
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

        this.#loadingWindow.on('ready-to-show', () => {
          //显示loading窗口
          this.#loadingWindow.show();
          //执行检查更新操作
          new AppUpdater( this.#loadingWindow );
        })

        this.#loadingWindow.loadFile(path.join(__dirname, '../../resources/loading/loading.html'))
    }
    //显示窗口
    show(){
      this.#loadingWindow.show();
    }
    //隐藏窗口
    hide(){
      this.#loadingWindow.hide();
    }
    //关闭 & 销毁窗口
    destroy(){
      this.#loadingWindow.close();
    }
}