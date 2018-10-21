let serverip = 'http://localhost:5000/'

let search_results = document.getElementById("searchResults");
let searchbar = document.getElementById('searchbar');

searchbar.addEventListener('input', (e) => {
  search_results.style.display = "none";
  var searchquery = 'https://www.instagram.com/web/search/topsearch/?query=' + searchbar.value
  var results = fetch(searchquery)
    .then(res => res.json()
    ).then((res) => {
        var userlength = res.users.length
        let users = []
        for (var i = 0; i < 5 && i < userlength; i++) {
          users.push(res.users[i].user);
        }
        updateSearch(users);
    }).catch( (e) => {
        console.log(e);
        search_results.innerHTML = ""
    })
});

function updateSearch (users) {
  var result = ""
  for (var i = 0; i < users.length; i++) {
    result += `
      <div class="result noselect" onclick="search('${users[i].username}','${users[i].profile_pic_url}')")>
        <div class="result-thumb">
          <img class="thumbnail" src="${users[i].profile_pic_url}">
        </div>
        <div class="result-name">
          ${users[i].username}
        </div>
      </div>
    `;
  }
  search_results.innerHTML = result;
  search_results.style.display = "block";
}

function search(username, url) {
  console.log(username);
  search_results.innerHTML = ""
  searchbar.value = ""
  searchbar.placeholder = username;
  search_results.innerHTML = `
    <div>
      <img src="images/loading.svg" class="centered" style="width:120px;">
    </div>
  `
  fetch(serverip +'?user_tag='+username)
  .then(res => res.json()
  ).then((res) => {
      search_results.innerHTML = ""
      var results =  `
        <div class="profile">
          <h1>${username}</h1>
          <br>
          <img class="large-thumbnail" src="${url}">
          <br>
          <p>${res.body}</p>
          <form action="https://www.instagram.com/${username}">
            <input type="submit" value="Go to Profile" class="centered"/>
          </form>
        </div>
      `
      search_results.innerHTML = results
  })
}
