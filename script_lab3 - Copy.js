const inputFormDiv = document.querySelector('#input-form-div');
const inputForm = document.querySelector('#input-form');
var artists = [];

window.onload = function() {
  this.displayArtists();
}

function displayArtists() {
  var body = document.getElementsByTagName('body')[0];  
  var temp;
  var i;
  console.log(artists);
  for (i = 0; i < artists.length; ++i) {
    console.log(artists[i]);
    temp = document.createElement();
    body.appendChild(temp);
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

function getInput() {
  var input = document.querySelector('#input-form');  

  return [input.elements[0].value
         ,input.elements[1].value
         ,input.elements[2].value
         ];
}

function addArtist(a) {
  var vals = getInput(a);

  console.log(vals);

  var body = document.getElementsByTagName('body')[0];  

  var artistsDiv = document.createElement('div');
  artistsDiv.classList.add('artists-div');  

  var artistImage = document.createElement('img');
  artistImage.setAttribute("src", vals[2]);   
  artistImage.setAttribute("alt", "artist");

  var artistsTextDiv = document.createElement('div');
  artistsTextDiv.classList.add('artists-text-div');  

  var artistName = document.createElement('span');
  artistName.classList.add('artist-name');
  var artistNameTextNode = document.createTextNode(vals[0]);
  artistName.appendChild(artistNameTextNode);

  var artistDesc = document.createElement('span');
  artistDesc.classList.add('artist-desc');
  var artistDescTextNode = document.createTextNode(vals[1]);
  artistDesc.appendChild(artistDescTextNode);

  var delBtn = document.createElement('button');
  delBtn.classList.add('del-btn');
  var delBtnTextNode = document.createTextNode('Delete');
  delBtn.appendChild(delBtnTextNode);
  delBtn.setAttribute("type", "button");
  delBtn.setAttribute("onclick", "deleteArtist()");

  // body.appendChild(artistsDiv);
  artistsDiv.appendChild(artistImage);
  artistsDiv.appendChild(artistsTextDiv);
  artistsDiv.appendChild(delBtn);
  artistsTextDiv.appendChild(artistName);
  artistsTextDiv.appendChild(artistDesc);

  artists.push(artistsDiv);

  inputFormDiv.style.display = 'none';
  inputForm.reset();
}

function deleteArtist(a) {
  
}