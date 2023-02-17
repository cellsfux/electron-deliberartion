const { ipcMain } = require('electron');
const XLSX= require('xlsx');



ipcMain.on('send_exclec_FILE', (event, file)=>{
    const wb= XLSX.readFile(file);
//console.log(Object.keys(wb))
//console.log(wb.SheetNames)
//console.log(Object.keys(wb.Sheets))
//console.log(wb.SheetNames)
const shetname= wb.SheetNames[3];
const ws= wb.Sheets[shetname];
const json= XLSX.utils.sheet_to_json(ws)
//console.log(ws)
//console.log(json)

event.reply('data_from_file', (json));


})




