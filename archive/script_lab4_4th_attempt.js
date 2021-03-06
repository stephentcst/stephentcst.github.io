// div containing input form
const inputFormDiv = document.querySelector('#input-form-div');

// input form
const inputForm = document.querySelector('#input-form');

// div to contain artists
const master = document.querySelector('#artists-master');

// UNUSED - blank profile image used for testing
const blankProfile = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'

// array to contain artist objects
var artists = [];

// counter for artist id
var artistID;

//
var myStorage = window.localStorage;



//
// removes all elements from artists div and then appends all artists in artists array
//
function displayArtists() {
  var i;

  // removes all elements
  while (master.firstChild) {
    master.removeChild(master.firstChild);
  }

  // return if local storage is empty
  if (myStorage.length == null) {
    return;
  }

  var temp = myStorage;

  console.log(temp);
  console.log(temp[0]);


  // appends all artists in artists array
  for (i = 0; i < myStorage.length; ++i) {
    // appendArtist(myStorage.getItem()i);
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
                  //  id: artistID++,
                   name: input.elements[0].value,
                   about: input.elements[1].value,
                   url: input.elements[2].value
                  };
  // artists.push(artistObj);
  
  myStorage.setItem(input.elements[0].value, JSON.stringify(artistObj));

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
  artists.splice(index, 1);

  // redisplays artists after artist is removed
  displayArtists();
}

//
// appends artist to artists-master div
//
function appendArtist(index) {
  var artistDiv = document.createElement('div');
  var artistImage = document.createElement('img');
  var artistTextDiv = document.createElement('div');
  var artistName = document.createElement('span');
  var artistAbout = document.createElement('span');
  var deleteBtn = document.createElement('button');

  var nameTextNode = document.createTextNode(artists[index]['name']);
  var aboutTextNode = document.createTextNode(artists[index]['about']);
  var deleteBtnTextNode = document.createTextNode('Delete');

  artistDiv.classList.add('artist');
  artistTextDiv.classList.add('artist-text-div');
  artistName.classList.add('artist-name');
  artistAbout.classList.add('artist-about');
  deleteBtn.classList.add('delete-btn');

  artistImage.setAttribute('src', artists[index]['url']);
  artistImage.setAttribute('alt', 'Artist');
  deleteBtn.setAttribute('type', 'button');
  deleteBtn.setAttribute('onclick', 'deleteArtist(' + index + ')');

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
