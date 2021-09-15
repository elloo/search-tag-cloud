const searchForm = document.getElementById('fetchImagesWrapper')
searchForm.addEventListener('submit', displayNewImage)

async function displayNewImage(e, tagSearchTerm){
  e.preventDefault()
  const imageToDisplay = document.getElementById('imageToDisplay')
  const attribution = document.getElementById('attribution')
  const submittedTerm = document.getElementById('searchTerm').value
  const searchTerm = tagSearchTerm ? tagSearchTerm : submittedTerm
  if (searchTerm.match(/[^a-z]/gi)){
    alert('Alphabetical letters and ONE word only!')
  } else {
    const requestUrl = `https://api.unsplash.com/search/photos?query=${searchTerm}&client_id=R2vv_O0n02TBFMvHRKuDW0l_mubcSqoIy3_qokCiWr0`
    const randomImage = await getNewImage(requestUrl)
    if (randomImage){
      addTag(searchTerm.toLowerCase())
      const photographerUrl = `${randomImage.user.links.html}?utm_source=Photo_tag_cloud&utm_medium=referral`
      const unsplashUrl = 'https://unsplash.com/?utm_source=Photo_tag_cloud&utm_medium=referral'
      const attributionString = `<i>Photo by <a href="${photographerUrl}">${randomImage.user.name}</a> on <a href="${unsplashUrl}">Unsplash</a></i>`
      attribution.innerHTML = attributionString
      imageToDisplay.src = randomImage.urls.regular
    } else {
      const placeholder = 'https://via.placeholder.com/550x350.png?text=Nothing+to+see+here...'
      imageToDisplay.src =  placeholder
      attribution.innerHTML = ''
    }
  }
}

async function getNewImage(requestUrl) {
const randomNumber = Math.floor(Math.random() * 10)
return fetch(requestUrl)
  .then((response) => response.json())
  .then((data) => {
    const image = data.results[randomNumber]
    return image
  })
  .catch((error) => console.error('Fetch error: ', error));
}