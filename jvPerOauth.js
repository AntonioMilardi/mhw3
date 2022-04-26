
const key_petfinder = 'DKaG7MMcSKWHtREPRxG7mwIi05tbYSVFIsoBvvRmTJxPIWtgO5'
const secret_petfinder = '6c2mBayXKOpTVRNczjqkSCAU5gCgmhZzPN7q4D5q'
const pet_api_endpoint_token = 'https://api.petfinder.com/v2/oauth2/token' 
const pet_api_endpoint = 'https://api.petfinder.com/v2/animals'

function onTokenResponse(response) {
    return response.json();
  }

  function getToken(json)
  {
      token_data = json;
      console.log(json);
  }


let token_data;
fetch(pet_api_endpoint_token,
{
	method: 'POST',
	body: 'grant_type=client_credentials&client_id=' + key_petfinder + '&client_secret=' + secret_petfinder,
	headers:
	{
		'Content-Type': 'application/x-www-form-urlencoded'
	}
}
).then(onTokenResponse).then(getToken);


function search(event)
{
   
    event.preventDefault();

   
    const content = document.querySelector('#content').value;

   
    if(content) {
        const text = encodeURIComponent(content);
        console.log('Eseguo ricerca elementi riguardanti: ' + text);

            const status = 'adoptable'
            fetch('https://api.petfinder.com/v2/animals?type=' + text + '&status=' + status, 
            {
                headers: {
                    'Authorization': token_data.token_type + ' ' + token_data.access_token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(onResponse).then(onJson_pet);
        
    }
    else {
        alert("Inserisci il testo per cui effettuare la ricerca");
    }
}

function onResponse(response) {
    return response.json();
  }


  function onJson_pet(json) {
    
    console.log(json);
    const library = document.querySelector('#album-view');
    library.innerHTML = '';
    const results = json.animals
  
    if(results.length == 0)
    {
      const errore = document.createElement("h1"); 
      const messaggio = document.createTextNode("Nessun risultato!"); 
      errore.appendChild(messaggio); 
      library.appendChild(errore);
    }

    for(result of results) {
        
        console.log(result);
     
        
       const immagine = result.primary_photo_cropped; 
       const Nome = result.name;
       
       const album = document.createElement('div');
       album.classList.add('album');
       
        if(immagine !==null) {

            const img = document.createElement('img');
            img.src = result.primary_photo_cropped.small;  
          album.appendChild(img);
         

        } else {

            console.log('Foto non trovata');
            const img = document.createElement('img');
            img.src = "./no-foto.png"
            album.appendChild(img);
            console.log(img);
        }

        const Name = document.createElement('h1');
        Name.textContent = ''+ Nome;
        album.appendChild(Name);

    

        library.appendChild(album); 
        }
    
        
    }


        
  

// Aggiungo event listener al form1 per la RICERCA
const form = document.querySelector('#search_content');
form.addEventListener('submit', search)

