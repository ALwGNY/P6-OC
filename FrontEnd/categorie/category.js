fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    const divGallery = document.querySelector('.gallery');
    
    data.forEach(function(ImageData) {
        const imageUrl = ImageData.imageUrl
        const title = ImageData.title

        const figureElement = document.createElement('figure')
        const imgElement = document.createElement('img')
        const figcaptionElement = document.createElement('figcaption')

        imgElement.src = imageUrl;
        figcaptionElement.textContent = title;

        figureElement.appendChild(imgElement)
        figureElement.appendChild(figcaptionElement) 
        divGallery.appendChild(figureElement)   
    });
    console.table(data)  
})
