const { ipcMain } = require("electron");
var sqlite3= require('sqlite3').verbose();
var db = new sqlite3.Database('./data.sqlite3');


ipcMain.on('msg',(event, data)=>{
    //console.log(data)








db.serialize(()=>{
    db.run("CREATE TABLE IF NOT EXISTS test(info TEXT)");

   // var stat= db.prepare("INSERT INTO test VALUES (?)");

    // for(var i=0; i< 10; i++){
         // stat.run('info-'+i);
    // }
    // stat.finalize(); 

     db.each("SELECT rowId As id, info FROM test", (err, row)=>{
        event.reply('pely', row)
     })
})


     
 })
