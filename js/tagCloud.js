let searchArray = []
const fragment = document.createDocumentFragment()

function addTag(searchTerm){
    const termIndex = searchArray.findIndex(object => object.term === searchTerm)
    const tagsList = document.getElementById('tags')
    // If term exists in searchArray
    if (termIndex !== -1){
        searchArray[termIndex].searchCount++
    } else {    
        termObject = {term: searchTerm, searchCount: 1}
        searchArray.push(termObject)
    }
    orderedSearchArray = [...searchArray]
    orderedSearchArray.sort((a,b) => parseInt(b.searchCount) - parseInt(a.searchCount))
    const highestSearchCount = orderedSearchArray[0].searchCount
    searchArray.forEach(searchTerm => handleTerm(searchTerm, highestSearchCount))
    tagsList.innerHTML = ''
    tagsList.appendChild(fragment)
}

function handleTerm(termObject, highestSearchCount){
    console.log(termObject)
    const termSearchCount = termObject.searchCount
    const term = termObject.term
    const maxTagSize = 6
    const tag = document.createElement('li')
    
    let fontSize = termSearchCount / highestSearchCount * maxTagSize
    fontSize = fontSize.toFixed()
    if (fontSize <= 1) fontSize = '1'
    const fontSizeProperty = fontSize

    if (fontSizeProperty === '1' || fontSizeProperty === '2') tag.classList.add('least')
    if (fontSizeProperty === '3' || fontSizeProperty === '4') tag.classList.add('average')
    if (fontSizeProperty === '5' || fontSizeProperty === '6') tag.classList.add('most')
    
    tag.classList.add('tag')
    tag.innerHTML = `<span onclick="displayNewImage(event, '${term}')" class="tagLink" style="font-size: ${fontSizeProperty}em">${term} (${termObject.searchCount}) </span>`
    fragment.appendChild(tag)
}