let container = document.getElementById("container");
let search = document.getElementById("search");

 // ts= n° marca de tiempo que indica la fecha y la hora en que ocurrió un evento o se creó un registro
  //apikey= key público 
  //hash es con md5(ts+private key +public key) 
let url= `http://gateway.marvel.com/v1/public/characters?ts=1000&apikey=d2ab91e9b6266759c69c0d7a4487860b&hash=1611e9b7944168c0bcfacab3f8ca599c` 

//Llamo a la Api 
const getInfo = async (url) => {
  try {
    let response = await fetch(url);

    if (response.ok) {
      let data = await response.json();
      let characters = data.data.results;
      console.log("Los personajes cargados son: ", characters)

      //función que contiene la función watchCharacter y la búsqueda de personaje
searchCharacter(characters)
    } else {
      console.log("Error N°: " + response.status);
    }
  } catch (error) {
    console.error("Ocurrió un error:", error);
  } 
} ;

getInfo(url);


//función de visualización de los archivos (1)
watchCharacter = (array)=>{
  container.innerHTML=""
  for (let character of array){
    let text = document.createElement("p");
    text.innerHTML= `<div class="character"><img class="picture" src=${character.thumbnail.path}.${character.thumbnail.extension} alt="Imagen de ${character.name}"><p>${character.name}</p></div>`
    container.appendChild(text)
  }
}

//función de interacción de busqueda (2)
searchCharacter= (array)=> {
 if (array.length===0){
  container.innerHTML="No se encontraron resultados"
} else {
watchCharacter(array)
}}




//Evento de busqueda (3)
search.addEventListener("input", function(){
  //agrego parametro a realizar
let newURL = url + `&nameStartsWith=${search.value}`;
getInfo (newURL);
})


let btn_reset=document.getElementById("reset");

btn_reset.addEventListener("click",()=>
{
  search.value="";
  getInfo(url)
})

