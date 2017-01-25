// listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// save bookmark
function saveBookmark(e) {
  // prevent for submitting
  e.preventDefault();

  // get form values
  let siteName = document.getElementById('siteName').value;
  let siteUrl = document.getElementById('siteUrl').value;

  if (!validateForm(siteName, siteUrl)) {
      return false;
  }

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
  document.getElementById('myForm').reset();
  fetchBookmarks();
  console.log("Adding bookmark: " + bookmark.url);
}

// delete bookbark
function deleteBookmark(url) {
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  for (var i = 0; i < bookmarks.length; i++) {
    if((bookmarks[i].url) == url) {
      bookmarks.splice(i, 1);
    }
  }
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  console.log("Deleted bookmark url: " + url);
  fetchBookmarks();
}

// fetch bookmarks
function fetchBookmarks() {
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  let bookmarksResults = document.getElementById('bookmarksResults');
  let name, url;
  bookmarksResults.innerHTML = "";

  for (let i = 0; i < bookmarks.length; i++) {
    name = bookmarks[i].name;
    url = bookmarks[i].url;
    bookmarksResults.innerHTML += '<div class="well">'+
                                  '<h3>' + name + " " +
                                  '<a class="btn btn-default" target="_blank" href="' + url + '">Visit</a> ' +
                                  '<a onCLick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                  '<h3>'+
                                  '</div>';
  }

}

function validateForm(siteName, siteUrl) {
  let expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  let regex = new RegExp(expression);

  if(!siteName || !siteUrl) {
    errorPopup("Please fill the form");
    return false;
  }

  if(!siteUrl.match(regex)) {
    errorPopup("Please use a valid url");
    return false;
  }

  return true;
}

function errorPopup(text) {
  $("#popupBody").text(text);
  $("#popup").modal("show");
}
