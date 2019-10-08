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
var artistID = getArtistID();

//
var myStorage = window.localStorage;

function getArtistID() {
  if (myStorage != null && myStorage.length != 0) {
    var temp = JSON.parse(myStorage.getItem('artists'));
    console.log('temp: ');
    console.log(temp);
    console.log('temp.length: ');
    console.log(temp.length);
    return temp.length + 1;
  } else {
    return 0;
  }
}

function getArtists() {
  if (myStorage.getItem('artists') != null) {
    return JSON.parse(myStorage.getItem('artists'));
  } else {
    return artists;
  }
}


//
// removes all elements from artists div and then appends all artists in artists array
//
function displayArtists() {
  // var body = document.getElementsByTagName('body')[0];  
  var i;
  var temp = getArtists();

  // removes all elements
  while (master.firstChild) {
    master.removeChild(master.firstChild);
  }

  // appends all artists in artists array
  for (i = 0; i < temp.length; ++i) {
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
  var temp = getArtists();
  var tempID = getArtistID();
  var input = document.querySelector('#input-form');
  var artistObj = {
                   id: tempID,
                   name: input.elements[0].value,
                   about: input.elements[1].value,
                   url: input.elements[2].value
                  };
  temp.push(artistObj);
  
  myStorage.setItem('artists', JSON.stringify(temp));

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
  deleteBtn.setAttribute('onclick', 'deleteArtist(' + obj['id'] + ')');

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
