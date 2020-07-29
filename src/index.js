const baseUrl = 'http://localhost:3000/api/v1/users'

document.addEventListener("DOMContentLoaded", function(e){
    fetchUsers()
})

const fetchUsers = () => {
    fetch(baseUrl)
    .then(response => response.json())
    .then(console.log)
}