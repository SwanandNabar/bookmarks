/**
 * Created by swanand on 3/6/17.
 */

document.getElementById('myForm').addEventListener('submit',saveBookmark);

//save bookmark
function saveBookmark(e) {
    //get form values
    var siteName = document.getElementById('siteName').value;
    var siteURL = document.getElementById('siteURL').value;

    if(!validateForm(siteName,siteURL)){
        return false;
    }

    //save in object
    var  bookmark= {
        name:siteName,
        url:siteURL
    }




    /*
    //local sotrage test
    localStorage.setItem('test','hello world');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
    */

    //test if bookmark is null
    if(localStorage.getItem('bookmarks')===null){
        //init array
        var bookmarks =[];
        //add to array
        bookmarks.push(bookmark);
        //set to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }else{
        //get bookmarks from localstorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //add bookmark to array
        bookmarks.push(bookmark);
        //set it back to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    //clear form
    document.getElementById('myForm').reset();

    //re-fetch bookmarks
    fetchBookmarks();


    //prevent form from submitting
    e.preventDefault();
}



//delete bookmark
function deleteBookmark(url) {
    //get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //loop through bookmarks
    for(var i=0;i<bookmarks.length;i++){
        if(bookmarks[i].url == url){
            bookmarks.splice(i,1);
        }
    }
    //set it back to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //re-fetch bookmarks
    fetchBookmarks();
}

//fetch bookmarks
function fetchBookmarks() {
    //get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //get output ID
    var bookmarksResults = document.getElementById('bookmarksResults');

    //build output
    bookmarksResults.innerHTML = '';

    for (var i=0; i<bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well">'+
                                        '<h3>' +name+
                                        '<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
                                        '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'+
                                        '</h3>'+
                                        '</div>';
    }
    
}

//validate form
function validateForm(siteName,siteURL) {
    if (!siteName || !siteURL){
        alert('Please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteURL.match(regex)){
        alert('Please use a valid URL');
        return false;
    }

    return true;
}