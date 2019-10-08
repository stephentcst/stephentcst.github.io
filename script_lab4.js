// local storage
var myStorage = window.localStorage;

// div containing input form
const inputFormDiv = document.querySelector('#input-form-div');

// input form
const inputForm = document.querySelector('#input-form');

// div to contain artists
const master = document.querySelector('#artists-master');

// UNUSED - blank profile image used for testing
const blankProfile = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'

// separate array used for flitering search results
var filteredArray = [];



// display artists on page load
displayArtists();



// removes all elements from artists div and then appends all artists in artists array
function displayArtists() { 
  var i;

  // if local storage is not null, assign local storage data as array in tempArray
  // else if null, return
  if (myStorage.getItem('artists') != null) {
    var tempArray = JSON.parse(myStorage.getItem('artists'));
  } else {
    return;
  }

  // removes all artists from page
  while (master.firstChild) {
    master.removeChild(master.firstChild);
  }

  // appends all artists from local storage to page
  for (i = 0; i < tempArray.length; ++i) {
    appendArtist(tempArray[i]);
  }
}



// toggles whether input form is visible or not
function toggleForm() {
  if (inputFormDiv.style.display == "flex") {
    inputFormDiv.style.display = "none";

    // clears form
    inputForm.reset();
  } else if ( inputFormDiv.style.display == 'none') {
    inputFormDiv.style.display = 'flex';
  } else {
    inputFormDiv.style.display = "flex";
  }
}



// pushes artist object to artists array
function pushArtist() {
  var input = document.querySelector('#input-form');  
  var artistObj = {
                   name: input.elements[0].value,
                   about: input.elements[1].value,
                   url: input.elements[2].value
                  };
  
  // temporary array for storing new artist object
  var tempArray = [];

  // if local storage is not null, assign local storage data as array in tempArray
  if (JSON.parse(myStorage.getItem('artists') != null)) {
    tempArray = JSON.parse(myStorage.getItem('artists'));
  }

  // add artist object to tempArray
  tempArray.push(artistObj);

  // update local storage with new array
  myStorage.setItem('artists', JSON.stringify(tempArray));

  // redisplay artists after new artist is added
  displayArtists();

  // hide add artist form
  inputFormDiv.style.display = "none";

  // clears form
  inputForm.reset();
}



// removes artist object from artists array
function deleteArtist(name, about, url) {
  var tempArray = JSON.parse(myStorage.getItem('artists'));

  // search array for element matching delete input
  for (i = 0; i < tempArray.length; ++i) {
    if (name == tempArray[i]['name'] 
    && about == tempArray[i]['about']
    && url == tempArray[i]['url']) {

      // delete element
      tempArray.splice(i, 1);
    }
  }

  // update local storage with new array
  myStorage.setItem('artists', JSON.stringify(tempArray));

  // redisplays artists after artist is removed
  displayArtists();
}



// appends artist to artists-master div
function appendArtist(obj) {
  var artistDiv = document.createElement('div');
  var artistImage = document.createElement('img');
  var artistTextDiv = document.createElement('div');
  var artistName = document.createElement('span');
  var artistAbout = document.createElement('span');
  var deleteBtn = document.createElement('button');

  var nameTextNode = document.createTextNode(obj['name']);
  var aboutTextNode = document.createTextNode(obj['about']);
  var deleteBtnTextNode = document.createTextNode('Delete');

  artistDiv.classList.add('artist');
  artistTextDiv.classList.add('artist-text-div');
  artistName.classList.add('artist-name');
  artistAbout.classList.add('artist-about');
  deleteBtn.classList.add('delete-btn');

  artistImage.setAttribute('src', obj['url']);
  artistImage.setAttribute('alt', 'Artist');
  deleteBtn.setAttribute('type', 'button');
  deleteBtn.setAttribute('onclick', 'deleteArtist(\'' + obj['name'] + '\',\'' + obj['about'] + '\',\'' +  obj['url'] + '\')');

  artistTextDiv.appendChild(artistName);
  artistTextDiv.appendChild(artistAbout);
  artistName.appendChild(nameTextNode);
  artistAbout.appendChild(aboutTextNode);
  deleteBtn.appendChild(deleteBtnTextNode);
  artistDiv.appendChild(artistImage);
  artistDiv.appendChild(artistTextDiv);
  artistDiv.appendChild(deleteBtn);

  master.appendChild(artistDiv);
}



// search for artists containing user-input search filter
function searchArtists() {
  var tempArray = JSON.parse(myStorage.getItem('artists'));

  // search form
  var search = document.querySelector('#artist-search-form');

  // search form user-input text
  search = search.elements[0].value.toLowerCase();

  filteredArray = [];
 
  // if search field is empty, display all artists and return
  if (search == '') {
    displayArtists();
    return;
  }

  // add any matching elements to filteredArray
  for (i = 0; i < tempArray.length; ++i) {
    if (tempArray[i]['name'].toLowerCase().includes(search)) {
      filteredArray.push(tempArray[i]);
    }
  }

  // redisplays artists after artist is removed
  displayFilteredArtists();
}



// display filtered artists
function displayFilteredArtists() {
  var i;

  // removes all elements
  while (master.firstChild) {
    master.removeChild(master.firstChild);
  }

  // appends all artists in artists array
  for (i = 0; i < filteredArray.length; ++i) {
    appendArtist(filteredArray[i]);
  }
}
