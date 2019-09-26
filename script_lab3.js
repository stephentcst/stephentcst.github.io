function toggleForm(a) {
  var x = document.getElementById(a);
  if (x.style.display == "flex") {
    x.style.display = "none";
  } else if ( x.style.display == 'none') {
    x.style.display = 'flex';
  } else {
    x.style.display = "flex";
  }
}

function getInput(a) {
  var input = document.getElementById(a);  

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
//   artistImage.setAttribute("src", vals[2]);   
  artistImage.setAttribute("alt", "artist");

  var artistsTextDiv = document.createElement('div');
  artistsTextDiv.classList('artists-text-div');  

  var artistName = document.createElement('span');
  artistName.classList('artist-name');
  var artistNameTextNode = document.createTextNode(vals[0]);

  var artistDesc = document.createElement('span');
  artistDesc.classList('artist-desc');
  var artistDescTextNode = document.createTextNode(vals[1]);

  body.appendChild(artistsDiv);
  artistsDiv.appendChild(artistImage);
  artistsDiv.appendChild(artistsTextDiv);
  artistsTextDiv.appendChild(artistName);
  artistsTextDiv.appendChild(artistDesc);
}