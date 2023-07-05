// RECUPERATION DES TRAVAUX DEPUIS L'API

fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    
    const divGallery = document.querySelector('.gallery') 

    data.forEach(function (imageData) {
      const imageUrl = imageData.imageUrl
      const title = imageData.title
      const categoryDataId = imageData.categoryId
      const imageId = imageData.id

      const figureElement = document.createElement('figure')
      const imgElement = document.createElement('img')
      const figcaptionElement = document.createElement('figcaption')
      

      imgElement.src = imageUrl
      figcaptionElement.textContent = title

      figureElement.appendChild(imgElement)
      figureElement.appendChild(figcaptionElement)
      figureElement.setAttribute('data-id', categoryDataId)
      figureElement.setAttribute('id', imageId)
      figureElement.classList.add('image')

      divGallery.appendChild(figureElement)  
      
    })

// CATEGORY

    const filterItem = document.querySelector('.category')
    const filterImg = document.querySelectorAll('.image')

    filterItem.onclick = (selectedItem) => {
      if(selectedItem.target.classList.contains("filter")){
        filterItem.querySelector('.active').classList.remove("active")
        selectedItem.target.classList.add('active')

        let filterId = selectedItem.target.getAttribute('data-id')

        filterImg.forEach(function (image) {
          let filterImages = image.getAttribute("data-id")
          if ((filterImages == filterId || filterId =="0")) {
            image.classList.add('show')
          } else{
            image.classList.add('hide')
            image.classList.remove('show')
          }
        })
      }
    }
  })

// MODE EDITION / ADMINISTRATEUR

const storageToken = localStorage.getItem('token')

const loginButton = document.getElementById('loginbutton')
const modeEdition = document.querySelectorAll('.modeedition')
const modeEditionCategory = document.querySelector('.category')
  
if (storageToken !== null) {
  modeEdition.forEach(element => {
    element.classList.add('showflex')
  })
  modeEditionCategory.classList.add('hide')
  console.log(storageToken)
  loginButton.innerText = 'logout'
  loginButton.onclick = (resetToken) => {
    if (resetToken.target) {
    localStorage.removeItem('token')
    location.reload()
  }
}

  } else {
    modeEdition.forEach(element => {
    element.classList.add('hide')
  })
 }


// AFFICHAGE DE LA MODAL 

const modals = document.querySelectorAll("[data-modal]")

modals.forEach(function (trigger) {
  trigger.addEventListener("click", function (event) {
    event.preventDefault()
    const modal = document.getElementById(trigger.dataset.modal)
    modal.classList.add("open")
 
    const exits = modal.querySelectorAll(".modal-exit")
    exits.forEach(function (exit) {
      exit.addEventListener("click", function (event) {
        event.preventDefault()
        modal.classList.remove("open")
      })
    })
 
    const modalContainer = modal.querySelector(".modal-container")
    modalContainer.addEventListener("click", function (event) {
      event.stopPropagation()
      
    })
  })
})


