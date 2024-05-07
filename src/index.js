const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('node:path');
const User = require('./models/User');
const Area = require('./models/Area');


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

async function usersAll() {
  return await User.findAll({
    raw: true,
    where: {
      deleted: 0
    },
    include: [
      {
        model: Area, // El modelo de la tabla de áreas
        as: 'area', // El alias que quieres usar para referirte a la relación
        attributes: ['name'] // Las columnas que quieres seleccionar de la tabla de áreas
      }
    ]
  });
}

async function areasAll() {
  return await Area.findAll({
    raw: true,
    order:[['id', 'DESC']]
  });
}

async function insertUser(dataUser) {
  try {
    const user = await User.create(dataUser) ;
    console.log('Usuario creado: ', user.toJSON());
    return user;
  } catch (error) {
    console.error('Error al crear usuario', error) ;
    throw error;
  }
}

async function insertArea(name) {
  try {
    const area = await Area.create({name: name}) ;
    console.log('Area creada: ', area.toJSON());
    return area;
  } catch (error) {
    console.error('Error al crear el area', error) ;
    throw error;
  }
}

async function deletedArea(id) {
  try {
    // Eliminar el área con el ID específico
    const area = await Area.destroy({
      where: {
        id: id
      }
    });
    console.log('Área eliminada correctamente.');
    return area;
  } catch (error) {
    console.error('Error al eliminar el área:', error);
    throw error;
  }
}


const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'ui/areas.html'));

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  ipcMain.handle('usersAll', usersAll);
  
  ipcMain.handle('areasAll', areasAll);
  
  ipcMain.handle('areaInsert', async (event, name) => {
    try {
      const newArea = await insertArea(name);
      return { success: true, message: 'Area agregada correctamente', user: newArea };
    } catch (error) {
      console.error('Error al agregar area:', error);
      return { success: false, message: 'Error al agregar area', error: error.message };
    }
  });

  ipcMain.handle('areaDeleted', async (event, id) => {
    try {
      const delArea = await deletedArea(id);
      return { success: true, message: 'Area eliminada correctamente', user: delArea };
    } catch (error) {
      console.error('Error al eliminar area:', error);
      return { success: false, message: 'Error al eliminar area', error: error.message };
    }
  });

  ipcMain.handle('insertUser', async (event, dataUser) => {
    try {
      const newUser = await insertUser(dataUser);
      return { success: true, message: 'Usuario insertado correctamente', user: newUser };
    } catch (error) {
      console.error('Error al insertar usuario:', error);
      return { success: false, message: 'Error al insertar usuario', error: error.message };
    }
  });

  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
