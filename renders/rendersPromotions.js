


let form= document.querySelector('#add_promotion');

form.addEventListener('submit', (e)=>{
   e.preventDefault();

   
   let promortion_name= document.querySelector('#name_promotion').value;
   let year= document.querySelector('#yars_promotion').value;
   
   document.querySelector("#All_promotion").innerHTML='';

   //savig
   promotion.add_promotion({name: promortion_name, year: year})
  
   promotion.allpromotion((event, data)=>{
        render_dom_box(data)
        counter_promotions()
   
     $('#add_promotion').modal('hide')
   })
   toastr.success('Vous avez ajouter '+promortion_name+' avec success.', 'Rapport d\'ajout', {timeOut: 5000})

   document.querySelector('#name_promotion').value=""

})



//Question modal add data-is at button accept delete
function delecte_promotion(id){
   
    $('#button_accept_delete').data('id', id);
}


//SI on accepte de supprimer 
$('#button_accept_delete').on('click', ()=>{
    $('#All_promotion').html('')

    promotion.delete_promotion($('#button_accept_delete').data('id'))
    promotion.data_delete_promotion((event, data)=>{
        render_dom_box(data)
    })

    counter_promotions();
    $('#staticBackdrop').modal('hide');
    $('#button_accept_delete').data('id', '')
    toastr.success('Vous avez supprimer avec succes une promotion.', 'Rapport de suppression', {timeOut: 5000})
})


//Nobre des promotions couter
function counter_promotions(){
    promotion.count_allpromotion()
      promotion.data_countpromotion((event, data)=>{
          let chaine=JSON.stringify(data)
          let sh1=chaine.replace('{"COUNT(id)":', '')
          let number=sh1.replace('}', '')
          
          $('#counter').html('Totale Promotions '+number)
      })
}



function update_promotion(id){
    toastr.info('Cettte fonctionalité n\'est pas disponible', 'info', {timeOut: 5000})
}






 function navigate_to_grille(id){
   
   window.sessionStorage.setItem('id_promotion', id);
    window.location='grille.html'
 }




//dom render
function render_dom_box(data){
        

    let  html=`
    <div class="col-xl-4 col-sm-6">
    <div class="card">
        <div class="card-body">
            <div class="d-flex">
                <div class="flex-grow-1 overflow-hidden">
                    <h5 class="text-truncate font-size-15"><a  onclick="navigate_to_grille(${data.id})" href="javascript:void(0)" class="text-dark">
                    ${data.nom} </a></h5>
                    <p class="text-muted mb-4">Trouvez les grilles pour la promotion de ${data.nom} ${data.created_at}</p>
                 
                </div>

                <div class="dropdown">
                <a href="#" class="dropdown-toggle card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="mdi mdi-dots-horizontal font-size-18"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-end" style="">
                    <a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="delecte_promotion(${data.id})"  style="cursor:pointer">Supprimer </a>
                    <a class="dropdown-item"  onclick="update_promotion(${data.id})"  style="cursor:pointer">Modifier </a>
                   
                </div>

            </div>
        </div>
        <div class="px-4 py-3 border-top">
            <ul class="list-inline mb-0">
                <li class="list-inline-item me-3">
                    <span class="badge bg-success">Année académique</span>
                </li>
                <li class="list-inline-item me-3">
                    <i class= "bx bx-calendar me-1"></i> ${data.created_at}

                </li>
                <li class="list-inline-item me-3">
                
                </li>
            </ul>
        </div>
    </div>
</div>
      `;

      $('#All_promotion').append(html)
}





