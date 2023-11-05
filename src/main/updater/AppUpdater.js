import { autoUpdater } from 'electron-updater'
import { app ,dialog } from 'electron'
import { is } from '@electron-toolkit/utils'
import path from 'path'
//软件要更新的所有操作
export default class AppUpdater{
    constructor( loadingWin ){  
        if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
            Object.defineProperty(app,'isPackaged',{
                get(){
                    return true;
                }
            })
            //检查是否更新，对标的线上链接是哪个？
            autoUpdater.updateConfigPath = path.join(__dirname, '../../dev-app-update.yml')
        }
        //当开始检查更新的时候触发。
        autoUpdater.on('checking-for-update',()=>{
            console.log('111当开始检查更新的时候触发');
        })

        //当有可用更新的时候触发。 更新将自动下载。
        autoUpdater.on('update-available',()=>{
            console.log('222当有可用更新的时候触发。 更新将自动下载。');
        })

        //当没有可用更新的时候触发 : 关闭loading页面，进入login页
        autoUpdater.on('update-not-available',()=>{
            console.log('333没有可更新的了');
            //主进程 通信 渲染进程    
            loadingWin.webContents.send('main-to-renderer', {
		        name: 'hide-loading-show-mian',
		        event: 'event',
		        msg: '当没有可用更新的时候触发',
		        data: null
		    })
        })

        //有更新：执行下载操作，下载中的进度
        autoUpdater.on('download-progress', (progressInfo) => {
            loadingWin.webContents.send('main-to-renderer', {
              name: 'download-progress',
              event: 'event',
              msg: '正在下载',
              data: progressInfo.percent
            })
        })

        //下载完成，准备安装到本地
        autoUpdater.on('update-downloaded', () => {
            // dialog.showMessageBox(loadingWin, {
            //     title: '安装新版本',
            //     message: '新版本已下载完成，是否立即安装？',
            //     type: 'info',
            //     buttons: ['是，立即安装']
            // }).then(() => {
            //     // 退出开始直接安装
            //     autoUpdater.quitAndInstall();
            // })

            loadingWin.webContents.send('main-to-renderer', {
		        name: 'hide-loading-show-mian',
		        event: 'event',
		        msg: '当没有可用更新的时候触发',
		        data: null
		    })
        })
        //询问服务器是否有更新。 
        if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
            autoUpdater.checkForUpdates();
        }else{
            autoUpdater.checkForUpdatesAndNotify();
        }
    }

}
