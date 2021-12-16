

document.getElementById('submitBtn').addEventListener('click', (event) => {
  event.preventDefault()

  //create a table with user input
  const song = {
    title: document.getElementById('songTitle').value,
    description: document.getElementById('songDescription').value,
    link: document.getElementById('songLink').value
  }

  //post to database
  axios.post('/api/songs', song)
    .then(({ data: song }) => {
      //console.log song to see if it worked
      console.log(song)
      //load the data after you post
      loadData()
    })
    .catch(err => console.error(err))

})

//add an eventlistener to the whole page
document.addEventListener('click', event => {
  //check if the button you pressed has a class of deleteBtn
  if (event.target.classList.contains('deleteBtn')) {
    //get the id of the delteBtn which we assigned the id in the table
    let songID = event.target.getAttribute('id')
    //delete by songID
    axios.delete(`/api/songs/${songID}`)
      .then(() => loadData()) //load data
      .catch(err => console.error(err))
  }

})


//Made a function for the axios.get so the page can reload itself
//everytime we create, update, or delete data
function loadData() {
  //get database and display
  axios.get('/api/songs')
    .then(({ data: songs }) => {
      console.log(songs)
      //erase the hmtl so it doesnt dublecate everytime you load the data
      document.getElementById('displaySongs').innerHTML = ""
      //go through our database and print out the info
      songs.forEach((item) => {
        // select the area wher we going to but the info
        let div = document.getElementById('displaySongs')
        //create a div for every item in the array
        let songElem = document.createElement('div')
        //add the class name to the created div
        songElem.classList.add('accordion-item')
        //change the innerHtml of the created div
        songElem.innerHTML = `
            <h2 class="accordion-header" id= ${item.id}>
              <button class="accordion-button" type="button" data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapse${item.id}" aria-expanded="false" aria-controls="panelsStayOpen-collapse${item.id}">
                ${item.title}
              </button>
            </h2>
            <div id="panelsStayOpen-collapse${item.id}" class="accordion-collapse collapse show"
              aria-labelledby="panelsStayOpen-heading${item.id}">
              <div class="accordion-body">
                <p> ${item.description} </p>
                <a href=${item.link} >Youtube Link</a >
                <hr>
                <button type="like" class="btn btn-primary" id="likeBtn">Like</button>
                <button type="delete" class="btn btn-danger deleteBtn" id="${item.id}">Delete</button>
              </div >
            </div >
          </div >`
        div.append(songElem)       
      })

    })
    .catch(err => console.error(err))
}

loadData()