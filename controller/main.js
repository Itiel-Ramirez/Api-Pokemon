async function fetchPokemon() {
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
  }

  function displayPokemonData(data) {
    const pokemonDataDiv = document.getElementById('pokemonData');
    pokemonDataDiv.innerHTML = `
      <h3 class="name">${data.name.toUpperCase()} (#${data.id})</h3>
      <img src="${data.sprites.front_default}" alt="${data.name}">
      <p>Height: ${data.height}</p>
      <p>Weight: ${data.weight}</p>
      <p>Types: ${data.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
    `;
  }

  

