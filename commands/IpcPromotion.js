const { ipcMain } = require("electron");
var sqlite3= require('sqlite3').verbose();
var db = new sqlite3.Database('./data.sqlite3');


ipcMain.on('Add_promotion',(event, data)=>{
    //console.log(data)

db.serialize(()=>{
    

    var stat= db.prepare("INSERT INTO promotion VALUES (?, ?, ?)");
          stat.run(null, data.name, data.year);
         stat.finalize(); 

     db.each("SELECT * FROM promotion ORDER BY id DESC ", (err, row)=>{

        event.reply('alls_promotion', row)
     })
})

 })


 //Fecht alls data from table initialise
 ipcMain.on('send_allpromotion', (event)=>{
    db.serialize(()=>{
         db.each("SELECT * FROM promotion ORDER BY id DESC ", (err, row)=>{
   
            event.reply('data_promotion', row)
         })
    })
 })


  //Nombre of row
  ipcMain.on('send_count_promotion', (event)=>{
    db.serialize(()=>{
         db.each("SELECT COUNT(id) FROM  promotion  ", (err, count)=>{
   
            
            event.reply('data_count_promotion', count)
         })
    })
 })


 //Suppression
 ipcMain.on('delete_promotion',(event, id)=>{
    //console.log(data)

db.serialize(()=>{
    
          db.run("DELETE FROM promotion  WHERE id="+id+"");
           //db.finalize(); 

     db.each("SELECT * FROM promotion ORDER BY id DESC ", (err, row)=>{

        event.reply('data_delete_promotion', row)
     })
})

 })





 






 

