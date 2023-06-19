fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    console.table(data)

    const divGallery = document.querySelector('.gallery') 

    data.forEach(function (imageData) {
      const imageUrl = imageData.imageUrl
      const title = imageData.title
      const categoryId = imageData.categoryId

      const figureElement = document.createElement('figure')
      const imgElement = document.createElement('img')
      const figcaptionElement = document.createElement('figcaption')
      

      imgElement.src = imageUrl
      figcaptionElement.textContent = title

      figureElement.appendChild(imgElement)
      figureElement.appendChild(figcaptionElement)
      figureElement.setAttribute('data-id', categoryId)
      figureElement.classList.add('image')

      divGallery.appendChild(figureElement)  
      
    })
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

