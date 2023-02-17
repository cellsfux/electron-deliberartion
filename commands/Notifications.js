const { ipcMain } = require("electron");
var sqlite3= require('sqlite3').verbose();
var db = new sqlite3.Database('./data.sqlite3');


ipcMain.on('seach_notifications',(event)=>{
    //console.log(data)


db.serialize(()=>{
    db.run("CREATE TABLE IF NOT EXISTS test(info TEXT)");

   // var stat= db.prepare("INSERT INTO test VALUES (?)");

    // for(var i=0; i< 10; i++){
         // stat.run('info-'+i);
    // }
    // stat.finalize(); 

     db.each("SELECT * FROM notification", (err, row)=>{
        event.reply('alls_notification', row)
     })
})


     
 })
