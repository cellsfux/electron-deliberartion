



  window.onload=()=>{

  
     allspromotion_Init()


    let html='<div></div>';
    let rendueDome= document.querySelector('#table_notifications')

    notification.onNotif();
    notification.allsnotif((event, data)=>{
    


     html=html+`
      <a href="${data.url}" target="_blank" class="text-reset notification-item">
                                        <div class="d-flex">
                                            <div class="avatar-xs me-3">
                                                <span class="avatar-title bg-primary rounded-circle font-size-16">
                                                    <i class="${data.icone}"></i>
                                                </span>
                                            </div>
                                            <div class="flex-grow-1">
                                                <h6 class="mb-1" key="t-your-order">${data.title}</h6>
                                                <div class="font-size-12 text-muted">
                                                    <p class="mb-1" key="t-grammer">${data.description}</p>
                                                    <p class="mb-0"><i class="mdi mdi-clock-outline"></i> <span key="t-min-ago">${data.created_at}</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                   
      `;

  
        rendueDome.innerHTML=html;
      




    })


  }



/**
 *Alls promotions fron databas fetch
 *
 */
function allspromotion_Init(){

    promotion.count_allpromotion()
    promotion.data_countpromotion((event, data)=>{
        let chaine=JSON.stringify(data)
        let sh1=chaine.replace('{"COUNT(id)":', '')
        let number=sh1.replace('}', '')
        
        $('#counter').html('Totale Promotions '+number)
    })


    promotion.fetch_allpromotion();
    promotion.data_promotion((event, data)=>{ 
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
     });




     //Globale Grille function


 
  }



  

