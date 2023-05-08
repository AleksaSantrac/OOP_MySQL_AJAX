function createReview(){
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;
    $.ajax({
        url: 'handler/addReview.php',
        type: 'post',
        data: {
            "title": title,
            "content": content
        },
        success: function(response){
            alert("Sacuvano" + response);

        },
        error: function(xhr){
            alert("GRESKA" + xhr);
        }
     });
}

function deleteReview(id){
    $.ajax({
        url: 'handler/deleteReview.php',
        type: 'delete',
        data: { 
            "id": id
        },
        success: function(response){
            alert("Sacuvano" + response);
        },
        error: function(xhr){
            alert("GRESKA" + xhr);
        }
     });
}

function getReviewGrade(id){
    let grade = 0;
    $.ajax({
        url: 'handler/getReview.php',
        type: 'get',
        data: { 
            // "userID": localStorage.getItem("id"),
            // "userID": $_COOKIE
            "id": id
        },
        success: function(response){
            if(response == "") {
                console.log(localStorage.getItem("id")+"aa");
                return 'a';
            }
            console.log(localStorage.getItem("id")+"fd")
            let j=0;
            let arr = [];
            arr=response.split("\"\"");
            for(let k = 0;k<arr.length;k++ ){
                arr[k]=arr[k].replaceAll('\"', '');
            }
            html = "";
            for (let i = 0; i < arr.length; i++) {
                let id = arr[i].split("|")[0];
                let u = arr[i].split("|")[1];
                let p = arr[i].split("|")[2];
                let q = arr[i].split("|")[3];
                console.log(q);
                grade = q+1;
                // insertRow(id, u);
            }
            
        },
        error: function(xhr){
            alert("GRESKA" + xhr.status);
        }
     });
     return grade;
}

function like(id){
    $.ajax({
        url: 'handler/updateReview.php',
        type: 'put',
        data: { 
            "id": id
            // "id": 6,
            // "grade": 4
        },
        success: function(response){
            alert("Saved: " + response);
        },
        error: function(xhr){
            alert("Error: " + xhr);
        }
    });
}

window.onload = function getAll(){
    $.ajax({
        url: 'handler/getAll.php',
        type: 'get',
        data: { 
            // "userID": localStorage.getItem("id"),
            // "userID": $_COOKIE
        },
        success: function(response){
            if(response == "") {
                console.log(localStorage.getItem("id"));
                return 'a';
            }
            console.log(localStorage.getItem("id")+"fd")
            let j=0;
            let arr = [];
            arr=response.split("\"\"");
            for(let k = 0;k<arr.length;k++ ){
                arr[k]=arr[k].replaceAll('\"', '');
            }
            html = "";
            for (let i = 0; i < arr.length; i++) {
                let id = arr[i].split("|")[0];
                let u = arr[i].split("|")[1];
                let p = arr[i].split("|")[2];
                let q = arr[i].split("|")[3];
                console.log(id + u + p);
                insertPostContainer(id, u, p, q)
            }
            
        },
        error: function(xhr){
            alert("GRESKA" + xhr.status);
        }
     });
}

function insertReview(){

}

function getById(){
    $.ajax({
        url: 'handler/getById.php',
        type: 'get',
        data: { 
            // "userID": localStorage.getItem("id"),
            // "userID": $_COOKIE
        },
        success: function(response){
            if(response == "") {
                console.log(localStorage.getItem("id")+"aa");
                return 'a';
            }
            console.log(localStorage.getItem("id")+"fd")
            let j=0;
            let arr = [];
            arr=response.split("\"\"");
            for(let k = 0;k<arr.length;k++ ){
                arr[k]=arr[k].replaceAll('\"', '');
            }
            html = "";
            for (let i = 0; i < arr.length; i++) {
                let id = arr[i].split("|")[0];
                let u = arr[i].split("|")[1];
                let p = arr[i].split("|")[2];
                console.log(id + u + p);
                // insertRow(id, u);
            }
            
        },
        error: function(xhr){
            alert("GRESKA" + xhr.status);
        }
     });
}


function insertPostContainer(id, user, post) {
    const postContainer = document.createElement('div');
    postContainer.classList.add('post-container');
    
    const userHeader = document.createElement('h1');
    userHeader.textContent = user;
    
    const postText = document.createElement('p');
    postText.textContent = post;
    
    const likeButton = document.createElement('button');
    likeButton.textContent = 'Like';
    likeButton.classList.add('btn');
    likeButton.setAttribute('onclick', `like(${id})`);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('btn');
    deleteButton.setAttribute('onclick', `deleteReview(${id})`);
    
    postContainer.appendChild(userHeader);
    postContainer.appendChild(postText);
    postContainer.appendChild(likeButton);
    postContainer.appendChild(deleteButton);
    
    const page = document.querySelector('.page');
    page.appendChild(postContainer);
  }