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

function addArtist() {
  body = document.getElementsByTagName('body');  

  artistsDiv = document.createElement('div');
  artistsDiv.id = 'artists-div';  

  artistImage = document.createElement('img');
  
  artistsTextDiv = document.createElement('div');
  artistsTextDiv.id = 'artists-text-div';  

  artistName = document.createElement('span');
  artistName.id = 'artist-name';

  artistDesc = document.createElement('span');
  artistDesc.id = 'artist-desc';
}