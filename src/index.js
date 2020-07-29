const baseUrl = 'http://localhost:3000/api/v1/users'

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
    const userCollection= document.querySelector('#user-collection')

    const userCard = document.createElement('div')
    userCard.className = "userCard"
    userCollection.appendChild(userCard)

    const userImage = document.createElement('img')
    userImage.src = user.image
    userImage.className = "user-image"
    userCard.appendChild(userImage)

    const userDetails = document.createElement('div')
    userDetails.className = "user-details"
    userDetails.innerHTML = `
    <h3>Name: ${user.name}</h3>
    <p>Talk your talk: ${user.tagline}</p>
    <p>Age: ${user.age}</p>
    <p>Gender: ${user.gender}</p>
    <p>Do you smoke: ${user.smoker}</p>
    <p>Do you have kids: ${user.has_kids}</p>
    `
    userCard.appendChild(userDetails)

    // columnsDiv.classList = 'columns'

    // const div = document.createElement('div')
    // div.classList = 'column'
    // div.innerHTML = `
    // <h1>${user.name}</h1>
    // <img src="${user.image}" height="200" width="200">
    // `
    // columnsDiv.appendChild(div)
    // main.appendChild(columnsDiv)


}