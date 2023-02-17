const { ipcMain } = require("electron");
var sqlite3= require('sqlite3').verbose();
var db = new sqlite3.Database('./data.sqlite3');

//FETCH ONE 
ipcMain.on('on_fetch_one_grille',(event, id)=>{
db.serialize(()=>{
     db.each("SELECT * FROM grille where id="+id+"", (err, row)=>{
        event.reply('fetch_one_grille', row)
     })
})   
 })


 //Ajout de cours
 ipcMain.on('add_cours', (event, data)=>{
    db.serialize(()=>{
        var stat= db.prepare("INSERT INTO cours VALUES (?, ?, ?, ?)");
        stat.run(null, data.name_cours, data.id_grille, data.pronderation);
         stat.finalize(); 
        
           event.reply('success_save_cours', "le cours  "+data.name_cours+" est ajouter avec success");
   })
 })


 //ajout d'un etudiant
 ipcMain.on('add_student', (event, data)=>{
    db.serialize(()=>{
        var stat= db.prepare("INSERT INTO student VALUES (?, ?, ?, ?)");
        stat.run(null, data.name,  data.id_grille, data.p_name);
         stat.finalize(); 
        
         db.each('SELECT * FROM student ORDER BY id DESC LIMIT 1 ', (err, row)=>{
            event.reply('last_id_student', row);
         })
          
   })
 })



  //Deliberation save data
  ipcMain.on('add_deliberation', (event, data)=>{
    db.serialize(()=>{
        var stat= db.prepare("INSERT INTO deliberation VALUES (?, ?, ?, ?, ?, ?,?, ?, ?)");
        stat.run(null, data.id_cours, data.id_stud, data.point_obt, data.id_promotion, data.id_grille, data.cours_name, data.max_cours, data.create_at);
         stat.finalize(); 
         event.reply('success_msg_deliberation', 'Vous avec enregistrer avec success les cotes');
          
   })
 })


 ipcMain.on('alls_cours', (event, id_grille)=>{
    db.serialize(()=>{
        
        
         db.each("SELECT * FROM cours where id_grille="+id_grille+"", (err, row)=>{
             
            

            event.reply('fetch_alls_cours_from_id_grille', row)
         })
   })
})





//============================= CALCUL DE LA DELIBERATION ====================================//

//On chargere tous les etudiants 
ipcMain.on('all_students', (event, id_grille)=>{
  db.serialize(()=>{
     
  db.each('SELECT * FROM student WHERE id_grille='+id_grille+'', (error, row)=>{
    
    event.reply('all_students_data', row);
  })
  })
})

//Find one students

ipcMain.on('fetch_student', (event, id_student)=>{
         db.serialize(()=>{
            db.each('SELECT * FROM student WHERE id='+id_student+'', (err, row)=>{
                
                event.reply('one_student', row)
            })
         })
} )


//on cehercher tous les cours d'une grille pour faire les th
//ON shercher chaque cours se trouvant sur la grille
ipcMain.on('all_cours_on_th', (event, id_grille)=>{
    db.serialize(()=>{
        db.each("SELECT * FROM cours WHERE id_grille="+id_grille+"", (err, row)=>{

            event.reply('cousrs_data_th', row )
        });

       
    })
})


ipcMain.on('delibation', (event, id_student)=>{
    db.serialize(()=>{
   let data=  db.each('SELECT * FROM deliberation WHERE id_student='+id_student+'', (err, row)=>{

            
            event.reply('deliberation_data', row )
        })

        console.log(data)
        
    })
})


ipcMain.on('one_cours', (event, id_cours)=>{
    db.serialize(()=>{
        db.each('SELECT title, max_total FROM cours WHERE id='+id_cours+'', (err, row)=>{
            event.reply('this_cours', row)
        })
    })
})

