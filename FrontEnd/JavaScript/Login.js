const login = document.getElementById("login")
const error = document.querySelector('.column')
const identifier = document.getElementById('identifier')
const retry = document.querySelector('.buttonretry')

login.addEventListener("submit", function(event) {
    event.preventDefault()
  
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
  

    fetch('http://localhost:5678/api/users/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    
    .then(function(response) {
      if (response.ok) {
        return response.json()
      } 
      else {
        error.classList.add('block')
        identifier.classList.add('none')
        retry.addEventListener('click', function() {
          location.reload();
        });
      }
    })

    .then(function(data) {
      var token = data.token
      localStorage.setItem('token', token)
      window.location.href='http://127.0.0.1:5500/index.html'
    })
  })
