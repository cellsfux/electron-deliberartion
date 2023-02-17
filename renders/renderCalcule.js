if(window.sessionStorage.getItem('id_grille')!='undefined' && window.sessionStorage.getItem('id_grille')!='')
{

    //On reherche le nom de la grille
    calcul_grille.on_fetch_one_grille(window.sessionStorage.getItem('id_grille'));
    calcul_grille.fetch_one_grille((event, data)=>{
        $('#title_navigation').html(data.nom_grille+'.cfxs');
        $('title').text(data.nom_grille);
        $('#grille_name').text(data.nom_grille+'.cfxs');
        $('#grille_name_title').text(data.nom_grille);
    })




    
    //Fetch alls cours
    calcul_grille.alls_cours(window.sessionStorage.getItem('id_grille'))
    calcul_grille.fetch_alls_cours_from_id_grille((event, data)=>{
       

         let html=`
         <div class="input-group mb-3">
         <span class="input-group-text" id="option-date"> ${data.title}</span>
         <input type="number"  data-max="${data.max_total}" data-name="${data.title}" id='Cours_calculer_points_okey' data-id="${data.id}"  max='${data.max_total}' class="form-control" 
           placeholder=""
         >

         <span class="input-group-addon bootstrap-touchspin-postfix input-group-append"><span class="input-group-text">max ${data.max_total}</span></span>
        </div>
         `;

        $('#rest_cours_addet').append(html)
    })


    var now = new Date();
 
    var annee   = now.getFullYear();
    var mois    = ('0'+now.getMonth()+1).slice(-2);
    var jour    = ('0'+now.getDate()   ).slice(-2);
    var heure   = ('0'+now.getHours()  ).slice(-2);
    var minute  = ('0'+now.getMinutes()).slice(-2);
    var seconde = ('0'+now.getSeconds()).slice(-2);
     
    let ajourdui= jour+"-"+mois+"-"+annee+"   "+heure+" : "+minute+" : "+seconde;




  //calcule de points form save
  $('#Form_calcul_cote').on('submit', (e)=>{
    e.preventDefault();
      let nom =$('#studens_name').val();
      let prenom=$('#studens_p').val();

      calcul_grille.add_student({name:nom,  id_grille:window.sessionStorage.getItem('id_grille'), p_name:prenom})
     calcul_grille.last_id_student((event, row)=>{
       
        let cousrs= document.querySelectorAll('#Cours_calculer_points_okey')
     
        cousrs.forEach((element) => {
           let id_cours= $(element).data('id');
           let value_obtenue= $(element).val();
           let id_promotion= window.sessionStorage.getItem('id_promotion')
           let id_grille= window.sessionStorage.getItem('id_grille')
           let id_studen= row.id

           let name_cours=$(element).data('name')
           let max_value=$(element).data('max')

           alert(name_cours)

           calcul_grille.add_deliberation({id_cours:id_cours,id_stud:id_studen, point_obt:value_obtenue,id_promotion:id_promotion, id_grille:id_grille, cours_name: name_cours, max_cours: max_value,  create_at: ajourdui})  
           calcul_grille.success_msg_deliberation((event, msg)=>{
            console.log(msg)
           })
        });

        toastr.success("Vous avec enregistrer avec success les cotes pour l'étudiant "+nom+" "+prenom+"", 'Message', {timeOut: 5000})

        $('#studens_name').val("");
        $('#studens_p').val("");

        cousrs.forEach((element) => {
            $(element).val('')
        });

        
     })

     
  })









    //Ajout de cours dans la bdd
    $('#form_add_COurs').on('submit', (e)=>{
        e.preventDefault();

        calcul_grille.add_cours({ name_cours: $('#name_cours').val(), id_grille: window.sessionStorage.getItem('id_grille'), pronderation: $('#ponderation').val()});
        calcul_grille.success_save_cours((event, msg)=>{
            toastr.success(msg, 'Message', {timeOut: 5000})
            $('#name_cours').val('') 
             $('#ponderation').val('')
        })


        calcul_grille.alls_cours(window.sessionStorage.getItem('id_grille'))
        calcul_grille.fetch_alls_cours_from_id_grille((event, data)=>{   
        $('#rest_cours_addet').empty();
            let html=`
             <div class="input-group mb-3">
             <span class="input-group-text" id="option-date"> ${data.title}</span>
             <input type="number"    id='Cours_calculer_points_okey' data-id="${data.id}" data-max="${data.max_total}" data-name="${data.title}"  max='${data.max_total}' class="form-control"
             
              placeholder=""
             >
    
             <span class="input-group-addon bootstrap-touchspin-postfix input-group-append"><span class="input-group-text">max ${data.max_total}</span></span>
            </div>
             `;


    
            $('#rest_cours_addet').append(html)
        })

    })








//==================CALCUL SUR LA GRILLE TABLE ======================








window.sessionStorage.setItem('data_point_obt',0)
window.sessionStorage.setItem('data_point_max',0)
//Show grille
function show_invoice(id_student){
    $('#table_invoice_data_table_jison').html('')
     calcul_grille.fetch_student(id_student)
     calcul_grille.one_student((event, data)=>{
        $('.title_modal_invoice').html(`Bulletin de  ${data.nom} ${data.post_nom}`)    
       $('.name_student').text('Nom: '+data.nom)
       $('#post_nom').text('Post :'+data.post_nom)
        

       calcul_grille.delibation(id_student)
       calcul_grille.deliberation_data((event, data_delibe)=>{
      

     
            
            let dom=`<tr id="data_cours_add_table" data-pointObt="${data.poits_obtenus}" data-total="${data.max_cours}">
               <td>${data_delibe.name_cours}</td>
               <td>${data_delibe.poits_obtenus}</td>
               <td id="max" class="text-end">${data_delibe.max_cours}</td>
                </tr>`

            $('#table_invoice_data_table_jison').append(dom)
        
            let dom_data=document.querySelectorAll('#max')

            window.sessionStorage.setItem('data_point_obt', Number( window.sessionStorage.getItem('data_point_obt')) + data_delibe.poits_obtenus)
            window.sessionStorage.setItem('data_point_max', Number(window.sessionStorage.getItem('data_point_max')) +  data_delibe.max_cours)
           $('#Totale_obtenu').html(window.sessionStorage.getItem('data_point_obt')+'/'+window.sessionStorage.getItem('data_point_max') )  
          $('#pourcentage').html(Math.round(Number(Number( (window.sessionStorage.getItem('data_point_obt'))/ Number(window.sessionStorage.getItem('data_point_max'))) * 100)*100)/100+' %')
       
          let mention=Math.round(Number(Number( (window.sessionStorage.getItem('data_point_obt'))/ Number(window.sessionStorage.getItem('data_point_max'))) * 100)*100)/100;


          if(mention<50){
            $('#menssion_delibe').html("A")
          }else if(mention<= 69){
            $('#menssion_delibe').html("S")
          }else if(mention <= 79) {
            $('#menssion_delibe').html("D")
          }else{
            $('#menssion_delibe').html("GD")
          }
       
        })
        
      
        
    })
}



    function data_delibera(id_student){
      
    }

    function liste_cours(data){
        alert('ok')
        
    }
    
    
    






calcul_grille.all_students(window.sessionStorage.getItem('id_grille'))
calcul_grille.all_students_data((event, row_students)=>{
    
   html=`
   <div class="col-xl-4 col-sm-6">
   <div class="card rounded-4 shadow-lg">
       <div class="card-body">
           <div class="d-flex align-items-center">
               <i class="bx bx-food-menu h2 text-success"></i>
               <div class="flex-grow-1 overflow-hidden">
                   <h5 class="text-truncate  text-capitalize font-size-15">
                   <a  data-bs-toggle="modal" data-bs-target="#card_inVoice" onclick="show_invoice(${row_students.id})" href="javascript:void(0)" class="text-dark">
                     ${row_students.nom+' '+row_students.post_nom }  </a></h5>
               </div>

               <div class="dropdown">
               <a href="#" class="dropdown-toggle card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                   <i class="mdi mdi-dots-horizontal font-size-18"></i>
               </a>
               <div class="dropdown-menu dropdown-menu-end" style="">
                   <a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#delete_grille" onclick="delecte_grille(${row_students.id})"  style="cursor:pointer">Supprimer </a>
                   <a class="dropdown-item"  onclick="update_grille(${row_students.id})"  style="cursor:pointer">Modifier </a>
                  
               </div>

           </div>
               
           </div>
           <ul class="list-inline mb-0">
               <li class="list-inline-item me-1">
                   <span class="badge bg-success">Data </span>
               </li>
               <li class="list-inline-item me-3">
                  students data in this content
               </li>
              
           </ul>
       </div>
     
   </div>
</div>
   `;


   $('#liste_student').append(html)
    
})












}