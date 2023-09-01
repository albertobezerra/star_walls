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

                const modalContent = document.getElementById("modalContent")
                modalContent.innerHTML = ""

                const characterImage = document.createElement("div")
                characterImage.style.backgroundImage = `url("https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg")`
                characterImage.className = "fotoModal"

                const name = document.createElement("span")
                name.className = "characterDetails"
                name.innerText = `Nome: ${character.name}`

                const characterHeight = document.createElement("span")
                characterHeight.className = "characterDetails"
                characterHeight.innerText = `Altura: ${converterAltura(character.height)}`

                const peso = document.createElement("span")
                peso.className = "characterDetails"
                peso.innerText = `Peso: ${converterPesoAdicionaMedida(character.mass)}`

                const eyeColor = document.createElement("span")
                eyeColor.className = "characterDetails"
                eyeColor.innerText = `Cor dos olhos: ${convertEyeColor(character.eye_color)}`

                const niver = document.createElement("span")
                niver.className = "characterDetails"
                niver.innerText = `Nascimento: ${converterAniversario(character.birth_year)}`

                modalContent.appendChild(characterImage)
                modalContent.appendChild(name)
                modalContent.appendChild(characterHeight)
                modalContent.appendChild(peso)
                modalContent.appendChild(eyeColor)
                modalContent.appendChild(niver)

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

function convertEyeColor(eyeColor){
    const cores = {
        blue: "Azul",
        brown:"Castanho",
        green: "Verde",
        yellow: "Amarelo",
        black: "Preto",
        pink: "Rosa",
        red: "Vermelho",
        orange: "Laranja",
        hazel: "Avelã",
        unknown: "Desconhecida",
    }
    return cores[eyeColor] || eyeColor;
}

function converterAltura(height) {
    if (height === "unknown") {
        return "Desconhecido"
    }
    return(height / 100).toFixed(2); // .toFixed determina a resposta com duas casas decimais
}

function converterPesoAdicionaMedida(mass) {
    if (mass === "unknown") {
        return "Desconhecido"
    }

    return `${mass} kg`
}

function converterAniversario(birth_year){
    if (birth_year === "unknown") {
        return "Desconhecido"
    }

    return birth_year
}