const searchBtn = document.getElementById('search-btn');
const characterList = document.getElementById('character');
//const favoriteList = document.getElementById('character');
const characterDetailsContent = document.querySelector('.character-details-content');
const detailsCloseBtn = document.getElementById('details-close-btn');

searchBtn.addEventListener('click', getCharacterList);
characterList.addEventListener('click', getCharacterDetails);
//favoriteList.addEventListener('click', addToFavoriteList);
detailsCloseBtn.addEventListener('click', () => {
characterDetailsContent.parentElement.classList.remove('showDetails');

});

function getCharacterList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://rickandmortyapi.com/api/character/?name=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
      
   let html = "";
        if(data.results){
            data.results.forEach(character => {
                html += ` 
                    <div class = "character-item" data-id = "${character.id}">
                        <div class = "character-img">
                             <img src = "${character.image}" alt = "">
                        </div>
                        <div class = "character-name">
                             <h3>${character.name}</h3>
                             <a href = "#" class = "details-btn">Details</a>
                             
                        </div>
                    </div>
                `;
            });
             characterList.classList.remove('notFound');
        } else {
            html = "Sorry, we didn't find any character!";
            characterList.classList.add('notFound');
        }

        characterList.innerHTML = html;
    });
}

function getCharacterDetails(e){
    e.preventDefault();
    if(e.target.classList.contains('details-btn')){
        let characterItem = e.target.parentElement.parentElement;
        let id = characterItem.getAttribute("data-id");
    
        console.log(id);
        //console.log(`https://rickandmortyapi.com/api/character/${characterItem.id}`)
        fetch(`https://rickandmortyapi.com/api/character/${id}`)
        .then(response => response.json())
        .then(data => characterDetailsModal(data));
    }
}

function characterDetailsModal(character){
    console.log(character);
    let html = `
        <h2 class = "details-title">${character.name}</h2>
        <p class = "details-category">${character.species}</p>
        <div class = "details-instruct">
           <h3>Details:</h3>
           <p>Status: ${character.status}</p>
           <p>Gender: ${character.gender}</p>
           <p>Episode: ${character.episode}</p>
        </div>
        <div class = "details-character-img">
           <img src = "${character.image}" alt = "">
        </div> 
     `;

     characterDetailsContent.innerHTML = html;
     characterDetailsContent.parentElement.classList.add('showDetails');
}        

/* Favorite List 
function addToFavoriteList(character){
    console.log(character);
}*/