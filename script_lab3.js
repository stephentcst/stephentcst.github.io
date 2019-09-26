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
  var vals;  
  var i;

  for (i = 0; i < input.length; i++) {
    vals.push(input.elements[i].value);
  }

  return vals;
}

function addArtist(a) {
  var vals = getInput(a);

  body = document.getElementsByTagName('body');  

  artistsDiv = document.createElement('div');
  artistsDiv.id = 'artists-div';  

  artistImage = document.createElement('img');
  artistImage.setAttribute("src", vals.elements[2].value);
  artistImage.setAttribute("alt", "artist"); 

  artistsTextDiv = document.createElement('div');
  artistsTextDiv.id = 'artists-text-div';  

  artistName = document.createElement('span');
  artistName.id = 'artist-name';
  var artistNameTextNode = document.createTextNode(vals.elements[0].value);

  artistDesc = document.createElement('span');
  artistDesc.id = 'artist-desc';
  var artistDescTextNode = document.createTextNode(vals.elements[1].value);

  body.appendChild(artistsDiv);
  artistsDiv.appendChild(artistsImage);
  artistsDiv.appendChild(artistsTextDiv);
  artistsTextDiv.appendChild(artistName);
  artistsTextDiv.appendChild(artistDesc);
}