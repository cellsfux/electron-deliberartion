
const { contextBridge, ipcRenderer  } = require('electron')
//const {action1} = require('./server/CoursModel')








contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  data:()=>[{nom: 'jison', prenom:'nongolola'}],
  action:(arg)=>{ 
    ipcRenderer.send('msg', arg )
  },
  result:(callback)=>ipcRenderer.on('pely', (callback))
        
})



//Notification router chanel
contextBridge.exposeInMainWorld('notification', {
     onNotif:()=>ipcRenderer.send('seach_notifications'),
     allsnotif:(callback)=>ipcRenderer.on('alls_notification', (callback))
})


//Promotions router chanel
contextBridge.exposeInMainWorld('promotion', {
  add_promotion:(data)=>ipcRenderer.send('Add_promotion', data),
  allpromotion:(callback)=>ipcRenderer.on('alls_promotion', (callback)),

  fetch_allpromotion:()=>ipcRenderer.send('send_allpromotion'),
  data_promotion: (callback)=>ipcRenderer.on('data_promotion', (callback)),

  count_allpromotion:()=>ipcRenderer.send('send_count_promotion'),
  data_countpromotion: (callback)=>ipcRenderer.on('data_count_promotion', (callback)),


  delete_promotion:(id)=>ipcRenderer.send('delete_promotion', id),
  data_delete_promotion: (callback)=>ipcRenderer.on('data_delete_promotion', (callback)),
})



//Gestion liste de grille par promotions
contextBridge.exposeInMainWorld('grilleListe', {
  find_one_promotion:(id)=>ipcRenderer.send('fetch_one_promotion_id', id),
  data_one_promotion: (callback)=>ipcRenderer.on('promotion_one', (callback)),
      
  add_grille:(data)=>ipcRenderer.send('add_grille', data),
  fetchALL_grille: (callback)=>ipcRenderer.on('fetchALL_grille', (callback)),

  All_grille_liste_on:(id)=>ipcRenderer.send('All_grille_liste_on', id),
  All_grille_liste_fetch: (callback)=>ipcRenderer.on('All_grille_liste_fetch', (callback)),

  On_count_grille:(id)=>ipcRenderer.send('On_count_grille', id),
  Count_grille   : (callback)=>ipcRenderer.on('Count_grille', (callback)),



  Delete_grille:(data)=>ipcRenderer.send('Delete_grille', data),
  fetch_on_delete_grille: (callback)=>ipcRenderer.on('fetch_on_delete_grille', (callback)),


  send_exclec_FILE: (fileName) => {
    ipcRenderer.send('send_exclec_FILE', path.join(process.cwd(), fileName))
              }, 
  data_from_file:(callback)=>ipcRenderer.on('data_from_file', (callback)),



})




//Gestion De calcule sur la grille x_id
contextBridge.exposeInMainWorld('calcul_grille', {
  on_fetch_one_grille:(id)=>ipcRenderer.send('on_fetch_one_grille', id),
  fetch_one_grille: (callback)=>ipcRenderer.on('fetch_one_grille', (callback)),
  
  add_cours: (data)=>ipcRenderer.send('add_cours', data),
   success_save_cours: (callback)=>ipcRenderer.on('success_save_cours', (callback)),
 
   alls_cours:(id_grille)=>ipcRenderer.send('alls_cours', id_grille),
   fetch_alls_cours_from_id_grille: (callback)=>ipcRenderer.on('fetch_alls_cours_from_id_grille', (callback)),

   add_student:(data)=>ipcRenderer.send('add_student',data),
   last_id_student: (callback)=>ipcRenderer.on('last_id_student', (callback)),

   add_deliberation:(data)=>ipcRenderer.send('add_deliberation', data),
   success_msg_deliberation: (callback)=>ipcRenderer.on('success_msg_deliberation', (callback)),
  
   //====== TRAITEMENT DE LA GRILLE ==========///
   //on chercher tous les étudiant dont la grillie est actualllement ouverte
   all_students:(id_grille)=>ipcRenderer.send('all_students', (id_grille)),
   all_students_data:(callback)=>ipcRenderer.on('all_students_data', (callback)),
   
   fetch_student:(id_student)=>ipcRenderer.send('fetch_student', id_student),
   one_student: (callback)=>ipcRenderer.on('one_student', (callback)),

   delibation:(id_student)=>ipcRenderer.send('delibation', id_student),
   deliberation_data:(callback)=>ipcRenderer.on('deliberation_data', (callback)),
   
   one_cours:(id_cours)=>ipcRenderer.send('one_cours', id_cours),
   this_cours:(callback)=>ipcRenderer.on('this_cours', (callback)),

   
})









