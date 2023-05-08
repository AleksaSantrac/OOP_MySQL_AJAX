function createReview(){
    $.ajax({
        url: 'handler/addReview.php',
        type: 'post',
        data: {
            "userID": localStorage.getItem("id"),
            // "name": document.getElementById("name").value
            "title": "test",
            "content": "testContent"
        },
        success: function(response){
            alert("Sacuvano" + response);

        },
        error: function(xhr){
            alert("GRESKA" + xhr);
        }
     });
}

function deleteReview(){
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

function getAll(){
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

window.onload = function getById(){
    console.log('f');
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
            console.log(response)
            const data = JSON.parse(response);
            for (let i = 0; i < data.length; i++) {
                const id = data[i].id;
                const title = data[i].title;
                const content = data[i].content;
                const grade = data[i].grade;
                console.log(id, title, content, grade);
                insertPostContainer(id, title, content, grade);
            }
        },
        error: function(xhr){
            alert("GRESKA" + xhr.status);
        }
     });
}



function insertPostContainer(id, title, content, grade) {
    console.log(id)
    const postContainer = document.createElement('div');
    postContainer.classList.add('post-container');
    
    const userHeader = document.createElement('h1');
    userHeader.textContent = title;
    
    const postText = document.createElement('p');
    postText.textContent = content;
    
    const likeButton = document.createElement('button');
    likeButton.textContent = 'Like';
    likeButton.classList.add('btn');
    likeButton.setAttribute('onclick', `like(${id})`);
    
    postContainer.appendChild(userHeader);
    postContainer.appendChild(postText);
    postContainer.appendChild(likeButton);
    
    const page = document.querySelector('.page');
    page.appendChild(postContainer);
  }