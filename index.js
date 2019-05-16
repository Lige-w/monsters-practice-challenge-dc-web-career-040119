const monsterContainer = document.getElementById('monster-container')
let page = 1

document.addEventListener("DOMContentLoaded", (e) => {
    const forward = document.getElementById('forward')
    const back = document.getElementById('back')

    fetchMonsters()

    forward.addEventListener('click', e => renderNewPage(e, 1))
    back.addEventListener('click', e => renderNewPage(e, -1))
});


const fetchMonsters = () => {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then(response => response.json())
        .then(monsters => renderMonsters(monsters))
};

const renderMonsters = monsters => {
    for(let monster of monsters) {
        const monsterElement = document.createElement('div')
        const name = document.createElement('h2')
        const age = document.createElement('h4')
        const bio = document.createElement("p")

        name.innerText = monster.name
        age.innerText = monster.age
        bio.innerText = monster.description

        monsterElement.appendChild(name)
        monsterElement.appendChild(age)
        monsterElement.appendChild(bio)

        monsterContainer.appendChild(monsterElement)
    }
}

const renderNewPage = (e, diff) => {
    page += diff
    if(page > 0) {
        document.getElementById('page-number').innerText = page
        document.getElementById('monster-container').innerHTML = ""
        fetchMonsters()
    } else {
        page = 1
    }
}