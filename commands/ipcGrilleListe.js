const { ipcMain } = require("electron");
var sqlite3= require('sqlite3').verbose();
var db = new sqlite3.Database('./data.sqlite3');


ipcMain.on('fetch_one_promotion_id',(event, id)=>{
    //console.log(data

db.serialize(()=>{

     db.each("SELECT * FROM promotion WHERE id="+id+"", (err, row)=>{
        event.reply('promotion_one', row)
     })
})

 })


 ipcMain.on('add_grille',(event, data)=>{


    //console.log(data

db.serialize(()=>{

    var stat= db.prepare("INSERT INTO grille  VALUES (?, ?, ?, ?)");
          stat.run(null, data.id_promotion, data.name_grille, data.date_time);
         stat.finalize(); 

     db.each("SELECT * FROM grille WHERE id_promotion="+data.id_promotion+"  ORDER BY id DESC", (err, row)=>{
        event.reply('fetchALL_grille', row)
     })
})

 })


//Finde alle grille from promotion id
 ipcMain.on('All_grille_liste_on',(event, id)=>{
db.serialize(()=>{
     db.each("SELECT * FROM grille WHERE id_promotion="+id+"  ORDER BY id DESC", (err, row)=>{
        event.reply('All_grille_liste_fetch', row)
     })
})

 })






 //Delete grilles
 ipcMain.on('Delete_grille',(event, data)=>{
    db.serialize(()=>{
       
        db.run("DELETE FROM grille WHERE id="+data.id+" ")
        db.each("SELECT * FROM cours WHERE id_grille="+data.id+"  ", (err, res)=>{
         db.run("DELETE FROM deliberation WHERE id_cours="+res.id+" ");
        });

        db.run("DELETE FROM cours WHERE id_grille="+data.id+" ");
       
    
      

         db.each("SELECT * FROM grille WHERE id_promotion="+data.id_promotion+"  ORDER BY id DESC", (err, row)=>{
            event.reply('fetch_on_delete_grille', row)
         })
    })
    
    
     })
    


//counter grille by  id promotion
ipcMain.on('On_count_grille',(event, id)=>{
   db.serialize(()=>{
   
   
        db.each("SELECT COUNT(id) FROM grille WHERE id_promotion="+id+" ", (err, count)=>{
           event.reply('Count_grille', count)
        })
   })
   
   
    })
   




 
