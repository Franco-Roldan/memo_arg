// variables

const carta = document.querySelectorAll('.carta');
const cont_imgs = document.querySelectorAll('.div_img');
const start = document.querySelector('.btn_start');


document.addEventListener('DOMContentLoaded', () => {
    iniciarApp();
})
start.addEventListener('click', () => {
    mesclar(bock_card, values_card);
    start_cronometro();

})


let bock_card = {
    0 : '', 1 : '',
    2 : '', 3 : '',
    4 : '', 5 : '',
    6 : '', 7 : '',
    8 : '', 9 : '',
    10: '', 11 : '',
    12: '', 13 : '',
    14: '', 15 : '',
}
let values_card = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]

const imagenes = [
    'img/cuti.jpg',
    'img/de_paul.jpg',
    'img/dibu.jpg',
    'img/fideo.jpg',
    'img/julian.jpg',
    'img/messi.jpeg',
    'img/ota.jpg',
    'img/toro.jpg'
]


function mesclar(dic, values){
    let valores_desordenados = values.sort(function(){return Math.random() - 0.5});
    console.log(valores_desordenados);

    for(let i=0;i<16; i++ ){
        dic[i] =values_card[i]; 
        let crearimg = document.createElement('img');
        crearimg.setAttribute('src',imagenes[values_card[i]-1]);
        crearimg.setAttribute('width',100);
        crearimg.setAttribute('height',100);
        cont_imgs[i].appendChild(crearimg);
    }
    console.log(dic);
}



function iniciarApp(){
    for (let i = 0; i < carta.length; i++){
        carta[i].disabled = true;
    }
}
function desbloquear_cartas(){
    for (let i = 0; i < carta.length; i++){
        carta[i].disabled = false;
    }
}

function reiniciar_partida(){
    start.disabled = false
}



function start_cronometro(){

    desbloquear_cartas();
    let time = 60;
    start.classList.add('bloquear')
    start.disabled = true;
    carta.forEach(btn => {
        btn.style.background = ' #388E3C url(img/pelota.png) center no-repeat';
    })

    cont_imgs.forEach(img => {
         img.style.display = 'none';
     })
    var contador_time = setInterval(() => {
        time--;
        cont_seg.innerHTML = time;
        if(time == 0){
            clearInterval(contador_time);
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Se te ha acabado el tiempo',
                showConfirmButton: true,
              })
              .then((result) => {
                if (result.isConfirmed){
                    location.reload();
                }
              })
        }
        if(array_aciertos.length == 16){
            clearInterval(contador_time);
            Swal.fire({
                title: 'Has Ganado',
                icon : 'success',
                text :'¡Felicitaciones!',
                showConfirmButton: true,
            })
            .then((result) => {
                if (result.isConfirmed){
                    location.reload();
              }
            })
            
        }

    }, 1000)
}


function contador(){
    let contar = 0;
    const carta = document.querySelectorAll('.carta');
    const c_movimiento = document.querySelector('#cont_movimiento');
    carta.forEach(btn => {
        if (contar == 0){
            contar = 1;
            c_movimiento.textContent = contar;
        }
        btn.addEventListener('click', () => {

           if(contar >= parseInt(c_movimiento.textContent)){
                contar++;
                c_movimiento.textContent = contar;
            }
        })
    })

}

function show_card_acientos(){
    
    i = 0;
    cont_imgs.forEach( img => {
        
        for(let j = 0; j < array_aciertos.length; j++){
            if(i == array_aciertos[j]){
                img.style.display = 'block';
                let btn = document.getElementById(array_aciertos[j]);
                btn.disabled = true;
            }
        }
        i++
    })
}


var id_anterior;
var array_aciertos = []
var id_ahora;

function voltear(valor){
    contador();

    id_ahora = valor
    let btn_activo = document.getElementById(id_ahora);

    if(id_anterior == null){
        let i= 0;
        cont_imgs.forEach(img => {
     
            if(i == id_ahora){
                img.style.display = 'block';
            }else{
                img.style.display = 'none';
            }
            i++
        })

        for(let i = 0; i<16; i++){

            let btn_clear = document.getElementById(i);
            btn_clear.style.background = ' #388E3C url(img/pelota.png) center no-repeat';
            
        }
        show_card_acientos();

        id_anterior = id_ahora;
    }else{
        
        if(id_ahora != id_anterior){

            let btn_anterior = document.getElementById(id_anterior);

            let i = 0;
            cont_imgs.forEach(img => {
     
                if(i == id_ahora){
                    img.style.display = 'block';
                } 
                i++
            })

            if (bock_card[id_ahora] == bock_card[id_anterior] ){

                array_aciertos.push(id_ahora);
                array_aciertos.push(id_anterior);

            
            }
            id_anterior = null;
            show_card_acientos();

        }
        // console.log(id_ahora);
        // console.log(id_anterior);
        // console.log(array_aciertos)
        contar_acientos(array_aciertos);
    }


}

function contar_acientos(array_aciertos){
    let cant_acientos  = array_aciertos.length / 2;
    cont_aciertos.innerHTML = cant_acientos;

}





