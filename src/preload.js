// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('API', {
    usersAll: () => ipcRenderer.invoke('usersAll'),
    areasAll: () => ipcRenderer.invoke('areasAll'),
    userInsert: (dataUser) => ipcRenderer.send('userInsert', dataUser),
    areaInsert: (name) => ipcRenderer.invoke('areaInsert', name),
    areaDeleted: (id) => ipcRenderer.invoke('areaDeleted', id)
  // también podemos exponer variables, no solo funciones
})