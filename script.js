let currentPageUrl = 'https://swapi.dev/api/people/'

window.onload = async () => {
    try{
        await loadCharacters(currentPageUrl);
    } catch (error){
        console.log(error);
        alert("Erro ao carregar os cards");
    }

    const nextButton = document.getElementById("nextButton")
    const backButton = document.getElementById("backButton")

    nextButton.addEventListener("click", loadNextPage)
    backButton.addEventListener("click", loadPreviousPage)
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
            card.onclick = () =>{
                const modal = document.getElementById("modal")
                modal.style.visibility = "visible"
            }
            mainContent.appendChild(card)
        });

        const nextButton = document.getElementById("nextButton")
        const backButton = document.getElementById("backButton")

        nextButton.disabled = !responseJson.next
        backButton.disabled = !responseJson.previous

        backButton.style.visibility = responseJson.previous? "visible" : "hidden"

        currentPageUrl = url
        
    } catch (error){
        console.log(error);
        alert("Erro ao carregar os dados da API.")
    }
}

async function loadNextPage() {
    if (!currentPageUrl) return;
    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.next)
    } catch (error) {
        console.log(error)
        alert("Erro ao carregar a próxima página")
    }
}

async function loadPreviousPage() {
    if (!currentPageUrl) return;
    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.previous)
    } catch (error) {
        console.log(error)
        alert("Erro ao carregar a página anterior")
    }
}

function hideModal(){
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"

}