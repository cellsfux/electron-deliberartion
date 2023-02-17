
const information = document.getElementById('info')

information.innerText = `This app is using Chrome
 (v${versions.chrome()}), 
 Node.js (v${versions.node()}),
  and Electron (v${versions.electron()})`


  /*const button= document.getElementById('dom')

  button.addEventListener('click', ()=>{
       console.log(versions.action([{nom: 'jison'}]));
  })*/


  function jison(){
   versions.action({nom:'jison'})

   versions.result((event, data)=>{

    if(data){
    
       let div = document.querySelector('#change')
       let br = document.createElement('br')
       div.appendChild(br)
       div.append(data.info)
    }
  
   })
     
  }

