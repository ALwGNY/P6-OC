document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault()
  
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
  
    var data = {
      email : email,
      password: password
    }

    fetch('http://localhost:5678/api/users/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(function(response) {
      if (response.ok) {
        return response.json()
      } 
      else {
        throw new Error("Erreur lors de la connexion")
      }
    })

    .then(function(data) {
      var token = data.token
  
      localStorage.setItem("token", token)
      window.location.href='http://127.0.0.1:5500/FrontEnd/index.html'
  
    })
    .catch(function(error) {
      console.log(error)
    })
  })
