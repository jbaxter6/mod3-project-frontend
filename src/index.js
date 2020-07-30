const baseUrl = 'http://localhost:3000/api/v1/users'
const interestUrl = 'http://localhost:3000/api/v1/interests'

const fieldset = document.createElement('fieldset')
fieldset.id ="form-checkbox"

const legend = document.createElement('legend')
legend.classList = "form-header"
legend.textContent = "Choose your Interests:"
fieldset.appendChild(legend)

document.addEventListener("DOMContentLoaded", function(e){
    fetchUsers()
    
})

const fetchUsers = () => {
    fetch(baseUrl)
    .then(response => response.json())
    .then(users => renderUsers(users))
}

const renderUsers = (users) => {
    users.forEach(user => renderUser(user))
}

const renderUser = user => {
    const userCollection= document.querySelector('.float-container')
    
    const userCard = document.createElement('div')
    userCard.className = "float-child"
    userCollection.appendChild(userCard)

    const userImage = document.createElement('img')
    userImage.src = user.image
    userImage.className = "user-image"
    userCard.appendChild(userImage)

    const userDetails = document.createElement('div')
    userDetails.className = "user-details"
    userDetails.innerHTML = `
    <h3>Name: ${user.name}</h3>
    <p>Tagline: ${user.tagline}</p>
    <p>Age: ${user.age}</p>
    <p>Gender: ${user.gender}</p>
    <p>Do you smoke: ${user.smoker}</p>
    <p>Do you have kids: ${user.has_kids}</p>
    `
    userCard.appendChild(userDetails)
}

const fetchInterests = () => {
    fetch(interestUrl)
    .then(response => response.json())
    .then(interests => 
        renderInterests(interests))
}

const renderInterests = interests => {
    interests.forEach(interest => {
        renderInterest(interest)
    })
}
    
const renderInterest = interest => {
    const fieldset = document.querySelector('#form-checkbox')


    const div = document.createElement('div')
    div.id = 'box-id'
    div.innerHTML = `
    <input type="checkbox" id=${interest.id} name="${interest.name}" value="${interest.name}">
    <label for="interest">${interest.name}</label>
    `
    fieldset.appendChild(div)    
}




const form = document.querySelector('.add-user-form')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(e.target)
    createUser(e.target)

    form.appendChild(fieldset)
    
})

const createUser = form => {

    fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: form.name.value,
            age: form.age.value,
            gender: form.gender.value,
            smoker: form.smoker.value,
            has_kids: form.has_kids.value,
            tagline: form.tagline.value,
            image: form.image.value
        })
    })
    .then(response => response.json())
    .then(user => renderUser(user))

    const subbedForm = document.querySelector("#create-form")
    subbedForm.innerHTML = ""
    fetchInterests()
}

const checkbox = document.querySelector("box-id")
console.log(checkbox)

const createUserInterests = interests => {
    console.log(form.checkbox.name)
    fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            
        })
    })
    .then(response => response.json())
    .then(user => renderUser(user))
}



