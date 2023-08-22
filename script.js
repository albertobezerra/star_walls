let currentPageUrl = 'https://swapi.dev/api/people/'

window.onload = async () => {
    try{
        await loadCharacters(currentPageUrl)
    } catch (error){
        console.log(error);
        alert("Erro ao carregar os cards")
    }
}

async function loadCharacters(url){
    const mainContent = document.getElementById("main-content")
    mainContent.innerHTML = ""; //limpa os resultados anteriores
    
    try{
        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((character) => {
            const card = document.createElement("div")
            card.style.backgroundImage = `url("https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg")`
            card.className = "card"

            const characterNameBG = document.createElement("div")
            characterNameBG.className = "foto-name-bg"

            const characterName = document.createElement("span")
            characterName.className = "foto-name"
            characterName.innerText = `${character.name}`

            characterNameBG.appendChild(characterName)
            card.appendChild(characterNameBG)

            mainContent.appendChild(card)
        });

        currentPageUrl = url
        
    } catch (error){
        console.log(error);
        alert("Erro ao carregar os dados da API.")
    }
}