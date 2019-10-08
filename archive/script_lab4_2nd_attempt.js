// div containing input form
const inputFormDiv = document.querySelector('#input-form-div');

// input form
const inputForm = document.querySelector('#input-form');

// div to contain artists
const master = document.querySelector('#artists-master');

// UNUSED - blank profile image used for testing
const blankProfile = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'

// array to contain artist objects
// var artists = [];

// counter for artist id
var artistID = 0;

//
var myStorage = window.localStorage;


function getLocalStorageJSON() {
  return JSON.parse(myStorage.getItem('artists'));
}

// add artist to local storage
function addToLocalStorage(object) {
  if (!JSON.parse(myStorage.getItem('artists')) == null) {
    console.log('not null');
    let temp = getLocalStorageJSON('artists');
    temp.push(object);
    myStorage.setItem('artists', JSON.stringify(temp));
  } else {
    console.log('null');
    myStorage.setItem('artists', JSON.stringify(object));
  }
  

}

// remove artist from local storage
function removeFromLocalStorage(index) {
  let temp = getLocalStorageJSON('artists');

  temp.splice(index, 1);

  myStorage.setItem('artists', JSON.stringify(temp));
}

// clears local storage
function clearLocalStorage() {
  myStorage.clear();
}





//
// removes all elements from artists div and then appends all artists in artists array
//
function displayArtists() {
  // var body = document.getElementsByTagName('body')[0];  
  var i;
  var temp = getLocalStorageJSON('artists');

  if (temp == null) {
    return;
  }

  // removes all elements
  while (master.firstChild) {
    master.removeChild(master.firstChild);
  }

  // appends all artists in artists array
  for (i = 0; i < temp.length; ++i) {
    // appendArtist(i);
    appendArtist(temp[i]);
  }
}

//
// toggles whether input form is visible or not
//
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

//
// pushes artist object to artists array
//
function pushArtist() {
  var input = document.querySelector('#input-form');  
  var artistObj = {
                   id: artistID++,
                   name: input.elements[0].value,
                   about: input.elements[1].value,
                   url: input.elements[2].value
                  };
  // artists.push(artistObj);
  addToLocalStorage('artists', artistObj);
  
  // redisplay artists after new artist is added
  displayArtists();

  inputFormDiv.style.display = "none";

  // clears form
  inputForm.reset();
}

//
// removes artist object from artists array
//
function deleteArtist(index) {
  // artists.splice(index, 1);

  removeFromLocalStorage('artists', index);

  // redisplays artists after artist is removed
  displayArtists();
}

//
// appends artist to artists-master div
//
function appendArtist(object) {
  var artistDiv = document.createElement('div');
  var artistImage = document.createElement('img');
  var artistTextDiv = document.createElement('div');
  var artistName = document.createElement('span');
  var artistAbout = document.createElement('span');
  var deleteBtn = document.createElement('button');

  var nameTextNode = document.createTextNode(object['name']);
  var aboutTextNode = document.createTextNode(object['about']);
  var deleteBtnTextNode = document.createTextNode('Delete');

  artistDiv.classList.add('artist');
  artistTextDiv.classList.add('artist-text-div');
  artistName.classList.add('artist-name');
  artistAbout.classList.add('artist-about');
  deleteBtn.classList.add('delete-btn');

  artistImage.setAttribute('src', object['url']);
  artistImage.setAttribute('alt', 'Artist');
  deleteBtn.setAttribute('type', 'button');
  deleteBtn.setAttribute('onclick', 'deleteArtist(' + object['id'] + ')');

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
