const inputFormDiv = document.querySelector('#input-form-div');
const inputForm = document.querySelector('#input-form');
const master = document.querySelector('#artists-master');
const blankProfile = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'

var artists = [];
var artistID = 0;

function displayArtists() {
  var body = document.getElementsByTagName('body')[0];  
  var i;

  while (master.firstChild) {
    master.removeChild(master.firstChild);
  }

  for (i = 0; i < artists.length; ++i) {
    // console.log(artists[i]['id']);
    appendArtist(i);
  }
}

function toggleForm() {
  if (inputFormDiv.style.display == "flex") {
    inputFormDiv.style.display = "none";
    inputForm.reset();
  } else if ( inputFormDiv.style.display == 'none') {
    inputFormDiv.style.display = 'flex';
  } else {
    inputFormDiv.style.display = "flex";
  }
}

function pushArtist() {
  var input = document.querySelector('#input-form');  
  var artistObj = {
                   id: artistID++,
                   name: input.elements[0].value,
                   about: input.elements[1].value,
                   url: input.elements[2].value
                  };
  artists.push(artistObj);
  displayArtists();
  inputFormDiv.style.display = "none";
  inputForm.reset();
}

function deleteArtist(index) {
  artists.splice(index, 1);
  displayArtists();
}

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
