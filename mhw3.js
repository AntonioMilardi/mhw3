const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'newsx.p.rapidapi.com',
		'X-RapidAPI-Key': '971dea79d7msh2d324f3b232e604p16dc89jsn10e256a04a80'
	}
};

const form = document.querySelector("#ricerca")
form.addEventListener("submit",search)

function search(event){
    event.preventDefault() //previene dal comportamento di default, ovvero il refresh della pagina
  
    const info = document.querySelector('#informazioni');
    info.innerHTML=''
    info.classList.remove('hidden')
    const content = document.querySelector("#content").value
    console.log(content)

    if(!content ){
        alert("Inserisci un argomento valido")
        info.classList.add('hidden')   
    }
         
    else{
        const text = encodeURIComponent(content);
        fetch('https://newsx.p.rapidapi.com/search?q=' +text , options).then(onResponse).then(onJson)
}  


function onResponse(response)
{
  return response.json();
}


function onJson(json)
{
  console.log(json);

    for(let i=0; i<3; i++) {

    const container = document.createElement('div')

    const titolo = json[i]['title'];
    const Autore = json[i]['author'];
    const image = json[i]['image']
    const contenuto = json[i]['summary']


    const informazioni = document.querySelector('#informazioni');

    const title = document.createElement('h1');
    title.textContent= '' +titolo;
    container.appendChild(title);

    const author = document.createElement('h1');
   author.textContent= 'Autore: ' +Autore;
    container.appendChild(author);

    const img = document.createElement('img');
    img.src= image;
    container.appendChild(img);

    const content = document.createElement('h1');
    content.textContent= '' +contenuto;
     container.appendChild(content);


     informazioni.appendChild(container)
 
    }

    } 
}