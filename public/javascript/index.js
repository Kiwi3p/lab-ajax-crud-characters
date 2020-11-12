const charactersAPI = new APIHandler('http://localhost:8000');

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    charactersAPI.getFullList()
    .then((response) => {
      console.log('response from API', response);
      const data = response.data;
      
      let listItems = '';
      data.forEach(character => {
          listItems+= `
          <div class="character-info" class="character-info">
          <div class="name">Character Name: ${character.name}</div>
          <div class="occupation">Character Occupation: ${character.occupation}</div>
          <div class="cartoon">Is a Cartoon?: ${character.cartoon}</div>
          <div class="weapon">Character Weapon: ${character.weapon}</div>
          <hr>
          </div>
          `
      });
      document.getElementById('char-info').innerHTML = listItems;
  });
  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {
    let fetchOne = document.getElementById('char-id').value;
    //let listItems = '';
    //document.getElementById('good-stuff').innerHTML = '';
    console.log('Fetch One', fetchOne)
    charactersAPI.getOneRegister(fetchOne)
    .then((response) => {
      console.log('response from API', response);
      const character = response.data;

      let listItems = '';
         listItems += `
          <div class="character-info" class="character-info">
          <div class="name">Character Name: ${response.data.name}</div>
          <div class="occupation">Character Occupation: ${character.occupation}</div>
          <div class="cartoon">Is a Cartoon?: ${character.cartoon}</div>
          <div class="weapon">Character Weapon: ${character.weapon}</div>
          <hr>
          </div>
          `
          document.getElementById('good-stuff').innerHTML = listItems;
        });

      
  });

  document.getElementById('delete-one').addEventListener('click', function (event) {
    let delOne = document.getElementById('del-id').value;
    charactersAPI.deleteOneRegister(delOne)
        console.log('Deleting character', delOne);

        const toDelete = confirm('Are you sure you want to delete?');

        if (toDelete) {

        axios
        .delete(`${charactersAPI.BASE_URL}/characters/${delOne}`) //deleting id... basically deleting -> http://localhost:8000/{id}
      }   
  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
    let upOne = document.getElementById('up-one').value;
    charactersAPI.updateOneRegister(upOne);
    console.log('updating character', upOne);
    event.preventDefault();
    const updatedCharacter = {
        name: document.getElementById('update-name-input').value,
        occupation: document.getElementById('update-occupation-input').value,
        weapon: document.getElementById('update-weapon-input').value,
        cartoon: document.getElementById('update-cartoon-input').value
    }
    const characterId = document.getElementById('up-one').value;
    axios.put(`http://localhost:8000/characters/${characterId}`, updatedCharacter)
  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    event.preventDefault();
    charactersAPI.createOneRegister();
    const name = document.getElementById('name-input').value;
    const occupation = document.getElementById('occupation-input').value;
    const weapon = document.getElementById('weapon-input').value;
    const cartoon = document.getElementById('cartoon-input').checked;

    const newCharacter = {
        name,
        occupation,
        weapon,
        cartoon
    }
    console.log('new character', newCharacter);
    axios
    .post('http://localhost:8000/characters/', newCharacter) //look out for 'http'
    .then(() => {
        document.getElementById('new-character-form').reset();
    })
    .catch((error) => {
        console.log('error occurred while posting a new character', error);
    })
  });
});
