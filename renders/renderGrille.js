

if(window.sessionStorage.getItem('id_promotion')!='undefined' && window.sessionStorage.getItem('id_promotion')!='')
{


    document.getElementById('drag').ondragstart = (event) => {
        event.preventDefault()
        alert('ok')
        grilleListe.send_exclec_FILE('drag-and-drop.md');
      
           
        grilleListe.data_from_file((event, data)=>{
            console.log(data)
         })
    
    }

  

    grilleListe.find_one_promotion(window.sessionStorage.getItem('id_promotion'))
    grilleListe.data_one_promotion((event, data)=>{
        $('#title').text('Grilles de points pour '+data.nom)
        $('title').text('Cellsflux / Grilles de points pour '+data.nom)
        $('#promotion_title').text('Promotion: '+data.nom)
    })


    //on chercher toutes les grilles from promotion id
    grilleListe.All_grille_liste_on(window.sessionStorage.getItem('id_promotion'))
    grilleListe.All_grille_liste_fetch((event, data)=>{
        dom_grille(data)
        counter_promotions()
    })


    var now = new Date();
 
var annee   = now.getFullYear();
var mois    = ('0'+now.getMonth()+1).slice(-2);
var jour    = ('0'+now.getDate()   ).slice(-2);
var heure   = ('0'+now.getHours()  ).slice(-2);
var minute  = ('0'+now.getMinutes()).slice(-2);
var seconde = ('0'+now.getSeconds()).slice(-2);
 
let ajourdui= jour+"-"+mois+"-"+annee+"   "+heure+" : "+minute+" : "+seconde;


   

    $('#add_grille').on('submit', (e)=>{

        e.preventDefault();

        document.querySelector('#Grille_liste_data_lista').innerHTML='';

        grilleListe.add_grille({id_promotion:window.sessionStorage.getItem('id_promotion'), name_grille: $('#name_grille').val(), date_time: ajourdui});
        grilleListe.fetchALL_grille((event, data)=>{
            dom_grille(data)
        })
        toastr.success('Vous avez ajouter '+$('#name_grille').val()+' avec success.', 'Rapport d\'ajout', {timeOut: 5000})

        $('#name_grille').val('')
        $('#add_grille_modale').modal('hide')
        counter_promotions()
    })
}




function update_grille(id){
    toastr.info('Cettte fonctionalité n\'est pas disponible', 'info', {timeOut: 5000})
}


function delecte_grille(id){
  //$('#button_accept_delete_grille').data('id', '')
  $('#delete_griller_btn').data('id', id)

  
}


//suppression de la grille
$('#delete_griller_btn').on('click', ()=>{
    
    grilleListe.Delete_grille({id: $('#delete_griller_btn').data('id'), id_promotion: window.sessionStorage.getItem('id_promotion')})
    $('#Grille_liste_data_lista').html('')
    grilleListe.fetch_on_delete_grille((event, data)=>{
        dom_grille(data)
        counter_promotions()
    })
    $('#delete_grille').modal('hide')
    toastr.success('Vous avez supprimer avec succes cette grille', 'Rapport action', {timeOut: 5000})
})



//Couter nbr grille par promotion
function counter_promotions(){
    grilleListe.On_count_grille(window.sessionStorage.getItem('id_promotion'))
    grilleListe.Count_grille((event, data)=>{
          let chaine=JSON.stringify(data)
          let sh1=chaine.replace('{"COUNT(id)":', '')
          let number=sh1.replace('}', '')
          
          $('#counter_grille').html('Totale Grilles '+number)
      })
}



function router_grille_calcule(id){
      window.sessionStorage.setItem('id_grille', id);
      window.location='table.html'
}



function dom_grille(data){

    let dom=`  <div class="col-xl-4 col-sm-6">
    <div class="card rounded-4">
        <div class="card-body">
            <div class="d-flex align-items-center">
                <i class="bx bx-food-menu h2 text-success"></i>
                <div class="flex-grow-1 overflow-hidden">
                    <h6 class="text-truncate font-size-15"><a onclick="router_grille_calcule(${data.id})" href="javascript:void(0)" class="text-dark">
                      ${data.nom_grille}.cfxs  </a></h6>
                </div>

                <div class="dropdown">
                <a href="#" class="dropdown-toggle card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="mdi mdi-dots-horizontal font-size-18"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-end" style="">
                    <a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#delete_grille" onclick="delecte_grille(${data.id})"  style="cursor:pointer">Supprimer </a>
                    <a class="dropdown-item"  onclick="update_grille(${data.id})"  style="cursor:pointer">Modifier </a>
                   
                </div>

            </div>
                
            </div>
            <ul class="list-inline mb-0">
                <li class="list-inline-item me-1">
                    <span class="badge bg-success">Date </span>
                </li>
                <li class="list-inline-item me-3">
                    <i class= "bx bx-calendar me-1"></i> ${data.anne_academic}
                </li>
               
            </ul>
        </div>
      
    </div>
</div>`;

$('#Grille_liste_data_lista').append(dom)
}



