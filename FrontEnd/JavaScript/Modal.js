// RECUPERATION DES TRAVAUX
fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    const divGalleryModal = document.querySelector('.gallerymodal')
    const divGallery = document.querySelector('.gallery')
    const deletedImageIds = []

    data.forEach(function (imageData) {
      const imageUrl = imageData.imageUrl
      const imageId = imageData.id

      const figureElement = document.createElement('figure')
      const imgElement = document.createElement('img')
      const figcaptionElement = document.createElement('figcaption')
      const spanElement = document.createElement('span')
      const iconElement = document.createElement('i')

      imgElement.src = imageUrl
      figcaptionElement.textContent = "éditer"

      iconElement.classList.add('fa-solid', 'fa-trash-can')
      spanElement.appendChild(iconElement)

      figureElement.appendChild(imgElement)
      figureElement.appendChild(figcaptionElement)
      figureElement.appendChild(spanElement)
      divGalleryModal.appendChild(figureElement)

      spanElement.addEventListener('click', function() {
        divGalleryModal.removeChild(figureElement)
        
        if (!deletedImageIds.includes(imageId)) {
          deletedImageIds.push(imageId)
                 
          fetch(`http://localhost:5678/api/works/${imageId}`, {
            method: 'DELETE',
            headers: {
              'authorization': `Bearer ${storageToken}`
            }
          })
            .then(response => {
              if (response.ok) {                
                const image = divGallery.querySelector(`.image[id="${imageId}"]`)
                if (image) {
                  divGallery.removeChild(image)
                }
              }
            })
            .catch(error => {
              console.log('Erreur lors de la requête DELETE', error)
            })
          }
      })
    })     

// CHANGEMENT DE FORMULAIRE DANS LA MODALE 

const addPhotoButton = document.querySelector('#addfoto')
const deletWorks = document.querySelector('.deletworks')
const addWorks = document.querySelector('.addworks')

addPhotoButton.addEventListener('click', function(event) {
  event.preventDefault()
  deletWorks.classList.remove('show')
  deletWorks.classList.add('hide')
  addWorks.classList.add('show')
})
const arrowLeft = document.getElementById('previous')

arrowLeft.addEventListener('click', function(event) {
  event.preventDefault()
  addWorks.classList.remove('show')
  addWorks.classList.add('hide') 
  deletWorks.classList.add('show') 
})

// IMAGE PREVIEW
const fileInput = document.getElementById('file')
  const inputImg = document.querySelector('.inputimg')
  const imgDesc = document.getElementById('imgdesc')
  
  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0]
  
    const imgElement = document.createElement('img')
    imgElement.src = URL.createObjectURL(file)
  
    imgDesc.innerHTML = ""
    inputImg.innerHTML = ""
  
    inputImg.appendChild(imgElement)
  })

// AJOUT DE NOUVEAUX TRAVAUX
const storageToken = localStorage.getItem('token')

const inputTitle = document.getElementById('title')
const categoryData = document.getElementById('category')

addWorks.addEventListener('submit', (event) => {
  event.preventDefault()

  const file = fileInput && fileInput.files[0]
  const title = inputTitle.value.trim()
  const category = categoryData.value

  if (!file || !title || !category) {

    const errorMessage = document.createElement('span')
    const errorDiv = document.getElementById('error')


    errorMessage.classList.add('formadd', 'error')
    errorMessage.innerHTML = '* Veulliez remplir tout les champs obligatoire'

    errorDiv.appendChild(errorMessage)   
  }

  const formData = new FormData()
  formData.append('image', file)
  formData.append('title', title)
  formData.append('category', category)

  fetch('http://localhost:5678/api/works', {
    method: 'POST',
    body: formData,
    headers: {
      'accept': 'application/json',
      'authorization': `Bearer ${storageToken}`,
    }
  
  })
  .then(_response => {
  })
  .catch(error => {
    console.error('Une erreur s\'est produite lors de l\'envoi du formulaire :', error)
  })
  })
})
