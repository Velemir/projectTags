// listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// save bookmark
function saveBookmark(e) {
  // prevent for submitting
  e.preventDefault();

  // get form values
  let siteName = document.getElementById('siteName').value;
  let siteUrl = document.getElementById('siteUrl').value;

  let bookmark = {
    name: siteName,
    url: siteUrl
  }

  // test if booksmarks exists
  if(localStorage.getItem('bookmarks') === null) {
    let bookmarks = [];
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
}

// fetch bookmarks

function fetchBookmarks() {
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  let bookmarksResults = document.getElementById('bookmarksResults');
  let name, url;

  for (let i = 0; i < bookmarks.length; i++) {
    name = bookmarks[i].name;
    url = bookmarks[i].url;
    bookmarksResults.innerHTML += '<div class="well">'+
                                  '<h3>' + name + " " +
                                  '<a class="btn btn-default" target="_blank" + href="' + url + '">Visit</a> ' +
                                  '<a onCLick="deleteBookmark(\''+url+'\')" class="btn btn-danger" target="_blank" + href="#">Delete</a> ' +
                                  '<h3>'+
                                  '</div>';
  }

}
