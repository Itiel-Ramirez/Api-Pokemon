fetchPokemon = async ()  => {
    const param = document.getElementById('pokemonInput').value.trim();

    const url = `https://pokeapi.co/api/v2/pokemon/${param.toLowerCase()}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Pokemon no encontrado');
      }

      const data = await response.json();
      displayPokemonData(data);
    } catch (error) {
      document.getElementById('pokemonData').innerHTML = `<p>${error.message}</p>`;
    }
  };

  fetchRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * 150) + 1;

    const url = `https://pokeapi.co/api/v2/pokemon/${randomId}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Pokémon no encontrado');
      }

      const data = await response.json();
      displayPokemonData(data);
    } catch (error) {
      document.getElementById('pokemonData').innerHTML = `<p>${error.message}</p>`;
    }
  };

  function displayPokemonData(data) {
    const pokemonDataDiv = document.getElementById('pokemonData');
    pokemonDataDiv.innerHTML = `
      <h3 class="name">${data.name.toUpperCase()} (#${data.id})</h3>
      <img src="${data.sprites.front_default}" alt="${data.name}">
      <p>Altura: ${data.height}</p>
      <p>Peso: ${data.weight}</p>
      <p>Tipo: ${data.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
    `;

    const existingModal = document.getElementById('myModal');
    if (existingModal) {
      existingModal.parentNode.removeChild(existingModal);
    }

    const modal = document.createElement('div');
    modal.id = 'myModal';
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-btn" onclick="closeModal()">&times;</span>
        <h3 id="modalPokemonName">${data.name.toUpperCase()} (#${data.id})</h3>
        <img id="modalPokemonImage" src="${data.sprites.front_default}" alt="${data.name}">
        <p id="modalPokemonAbilities">Habilidades: ${data.abilities.map(ability => ability.ability.name).join(', ')}</p>
        
        <p id="modalPokemonStats">Estadisticas: ${data.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(', ')}</p>
      </div>
    `;

    document.body.appendChild(modal);
  }

  function openModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'flex';
  }

  function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
  }
  
  document.getElementById('searchButton').addEventListener('click', fetchPokemon);
  document.getElementById('randomButton').addEventListener('click', fetchRandomPokemon);

