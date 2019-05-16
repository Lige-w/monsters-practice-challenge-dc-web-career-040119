const formData = {
    name: "",
    age: "",
    description: ""
}

const monsterConfigurationObject = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: ""
}

let page = 1

const monsterContainer = document.getElementById('monster-container')

document.addEventListener("DOMContentLoaded", (e) => {
    const newMonsterForm = document.getElementById('new-monster-form')
    const forward = document.getElementById('forward')
    const back = document.getElementById('back')

    fetchMonsters()

    newMonsterForm.addEventListener('submit', createMonster)

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

const createMonster = e => {
    e.preventDefault()
    const nameElement = e.target.querySelector('#name-field')
    nameElement.style.border = ""

    if (!nameElement.value) {
        nameElement.style.border = "solid red 1px"
        alert("Name field can't be blank")
    } else {
        formData.name = nameElement.value;
        formData.age = e.target.querySelector('#age-field').value
        formData.description = e.target.querySelector('#bio-field').value
        monsterConfigurationObject.body = JSON.stringify(formData)

        fetch(`http://localhost:3000/monsters/`, monsterConfigurationObject)
            .then(response => response.json())
            .then(object => {alert(`${object.name} was successfully created`)})
            .catch(error => alert(`Something went wrong: ${error.message}`))
    }
    e.target.reset()
}

