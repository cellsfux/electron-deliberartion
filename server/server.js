var sqlite3= require('sqlite3').verbose();
var db = new sqlite3.Database('./data.sqlite3');





db.serialize(()=>{
    db.run("CREATE TABLE IF NOT EXISTS test(id INTEGER PRIMARY KEY AUTOINCREMENT, info TEXT)");

    db.run("CREATE TABLE  IF NOT EXISTS promotion(id INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT,  created_at TEXT)");

    db.run("CREATE TABLE  IF NOT EXISTS grille(id INTEGER PRIMARY KEY AUTOINCREMENT, id_promotion INTEGER, nom_grille TEXT, anne_academic TEXT )");


    db.run("CREATE TABLE  IF NOT EXISTS cours(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, id_grille INTEGER,   max_total INTEGER)");

    db.run("CREATE TABLE  IF NOT EXISTS student(id INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT, id_grille INTEGER,  post_nom TEXT)");


    db.run("CREATE TABLE  IF NOT EXISTS deliberation(id INTEGER PRIMARY KEY AUTOINCREMENT, id_cours INTEGER, id_student INTEGER,  poits_obtenus INTEGER, id_promotion INTEGER, id_grille INTEGER, name_cours TEXT, max_cours INTEGER,  anne_acad TEXT )");

    db.run("CREATE TABLE  IF NOT EXISTS notification(id INTEGER PRIMARY KEY AUTOINCREMENT, icone TEXT, title TEXT, description TEXT, url TEXT, status TEXT, created_at TEXT )")
    
    
    //var stat= db.prepare("INSERT INTO notification VALUES (?, ?, ?, ? , ?, ? ,?)");
    // for(var i=0; i< 10; i++){
         // stat.run(null, 'bx bx-cart', 'Bienvenu sur cellsflux', 'Trouver nos produits cellsflux...', 'https:cellsflux.com/products', 'new', '10-20-2022 10:30:04');
        // stat.run(null, 'bx bx-user', 'Gestion d\'agents', 'Nouveau produits sur cellsflux...', 'https:cellsflux.com/products', 'new', '10-20-2022 10:30:04');
    // }
    // stat.finalize(); 
     //db.each("SELECT rowId As id, info FROM test", (err, row)=>{
       // console.log(row.id+" : "+row.info);
    // })
})

db.close();