import { app, BrowserWindow, ipcMain, Menu, Tray } from "electron";
import path from "path";
import { startServer } from "../api/server";

if (process.env.NODE_ENV === 'development') {
    global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\');
} else {
    global.__static = path.join(process.resourcesPath, 'static');
}


let mainWindow: BrowserWindow | null = null;
let appIcon: Tray | null = null;

let iconPath = path.join(__static, 'icon.png');

let httpsServer: { close: (arg0: () => void) => void; }
let isQuitting = false;

function createWindow() {
	mainWindow = new BrowserWindow({
		show: false,
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: true,
		},
	});
	mainWindow.loadURL('https://localhost:1234/main');

	mainWindow.on('close', (event) => {
		if (!isQuitting) {
			event.preventDefault();
			mainWindow?.hide();
		} else {
			mainWindow = null;
		}
	});
}

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    app.quit();
} else {
	
	startServer();

    app.on('second-instance', (event, commandLine, workingDirectory) => {
		if (mainWindow) {
			if (mainWindow.isMinimized()) mainWindow.restore();
			mainWindow.show();
			mainWindow.focus();
		} else {
			createWindow();
		}
    });

	app.whenReady().then(() => {
		app.setLoginItemSettings({
			openAtLogin: true,
			path: app.getPath('exe'),
		});

		createWindow();
	
		appIcon = new Tray(iconPath);
	
		setTray();
	
		appIcon.on('right-click', () => {
			appIcon?.popUpContextMenu();
		});
	
		appIcon.on('double-click', () => {
			mainWindow?.show();
		});
	
		// mainWindow?.hide();
	});
	
}

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

function setTray() {
    const contextMenu = Menu.buildFromTemplate([
        { label: '顯示', click: () => { mainWindow?.show(); } },
        { label: '退出', click: () => {
            isQuitting = true;
            app.quit();
        } }
    ]);
    appIcon?.setToolTip('CTBC WebATM');
    appIcon?.setContextMenu(contextMenu);
}

app.on('will-quit', () => {
    if (httpsServer) {
        httpsServer.close(() => {
            console.log('HTTPS server closed');
        });
    } else {
        console.log('HTTPS server was not started or already closed');
    }
});

