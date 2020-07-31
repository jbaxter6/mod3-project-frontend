const baseUrl = 'http://localhost:3000/api/v1/users/'
const interestUrl = 'http://localhost:3000/api/v1/interests'
const userInterestUrl = 'http://localhost:3000/api/v1/user_interests/'
// /api/v1/user_interests/:id
//  /api/v1/user_interests/:id/edit

const fieldset = document.createElement('fieldset')
const fieldForm = document.createElement('form')
fieldset.id = "form-checkbox"
let div = document.querySelector('.container')
fieldForm.append(fieldset)
div.append(fieldForm)



const subInterest = document.createElement('button')
subInterest.innerHTML = `
<input
type="submit"
name="submit"
value="Find Your Match!"
class="submit"
/>
`
const legend = document.createElement('legend')
legend.classList = "form-header"
legend.textContent = "Choose your Interests:"
fieldset.appendChild(legend)
fieldset.appendChild(subInterest)
div.appendChild(fieldForm)  

// fieldForm.addEventListener('submit', function(e){
//     e.preventDefault()
//     let interests = []
//     document.querySelectorAll('#box-id').forEach(div => { if 
//         (div.children[0].checked === true) 
//         interests.push(div.children[0].value)} 
//         )
//     createUserInterests(interests)
        
// })


document.addEventListener("DOMContentLoaded", function(e){
    
    
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
    userCard.dataset.id = user.id
    

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

    let deleteButton = document.createElement('button')
    deleteButton.dataset.id = user.id
    deleteButton.innerText = 'delete user'
   
    userCard.appendChild(deleteButton)
    deleteButton.addEventListener('click', (e) => {
        deleteFetch(e, user, userCard)
    })

    userCollection.appendChild(userCard)
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
    fieldForm.appendChild(fieldset)
}
    
const renderInterest = interest => {
    const fieldset = document.querySelector('#form-checkbox')
    const div = document.createElement('div')
    div.id = 'box-id'
    div.innerHTML = `
    <input type="checkbox" id=${interest.id} name="${interest.name}" value="${interest.name}">
    <label for="interest">${interest.name}</label>
    `
    
    fieldset.append(div)
   // console.log(fieldset)
}




const form = document.querySelector('.add-user-form')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(e.target)
    container = document.querySelector('.container')
    container.appendChild(fieldset)

    createUser(e.target)
    // createUserInterests(user)
    fetchUsers()
    
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
    .then(user => {
        renderUser(user)
        fieldForm.addEventListener('submit', function(e){
            e.preventDefault()
            let interests = []
            document.querySelectorAll('#box-id').forEach(div => { if 
                (div.children[0].checked === true) 
                interests.push(div.children[0].value)} 
                )
            createUserInterests(interests, user)
                
        })
    })


    const subbedForm = document.querySelector("#create-form")
    subbedForm.innerHTML = ""
    fetchInterests()
}


const createUserInterests = (interests, user) => {
    console.log(interests)
    fetch(userInterestUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            user_id: user.id,
            "interests": interests
            
            // console.log(user.interests)
        })
    })
    .then(response => response.json())
    .then(user_int => console.log(user_int))
}


function deleteFetch(e, user, userCard){
    fetch(baseUrl + userCard.dataset.id, {
        method: "DELETE",
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    .then(resp => resp.json())
   
    .then(userCard.remove())
}
