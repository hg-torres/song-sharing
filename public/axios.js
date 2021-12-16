
    
    document.getElementById('submitBtn').addEventListener('click', (event) =>{
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
    console.log(song)
    })
    .catch(err => console.error(err))

    })
    
    // // const movieId = 2
    // // const changes = {
    // // release: 2021
    // // }
    

    // //update
    // axios.put(`/api/movies/${movieId}`, changes)
    // .then(() => console.log('movie updated!'))
    // .catch(err => console.error(err))
    
    // // const movieId = 3
    

    // //delete
    // axios.delete(`/api/movies/${movieId}`)
    // .then(() => console.log('movie deleted!'))
    // .catch(err => console.error(err))

//get database and display
axios.get('/api/songs')
  .then(({ data: songs }) => {
    console.log(songs)
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
                <button type="delete" class="btn btn-danger" id="deleteBtn">Delete</button>
              </div >
            </div >
          </div >`
      div.append(songElem)

      // document.getElementById('displaySongs').innerHTML = item.description
    })

  })
  .catch(err => console.error(err))