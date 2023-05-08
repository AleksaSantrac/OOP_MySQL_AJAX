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

function like(id){
    $.ajax({
        url: 'handler/updateReview.php',
        type: 'put',
        data: { 
            "id": id
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

        },
        success: function(response){
            if(response == "") {
                console.log(localStorage.getItem("id"));
                return 'a';
            }
            console.log(localStorage.getItem("id")+"fd")
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



function insertPostContainer(id, user, post, grade) {
    const postContainer = document.createElement('div');
    postContainer.classList.add('post-container');
    
    const userHeader = document.createElement('h1');
    userHeader.textContent = user;
    
    const postText = document.createElement('p');
    postText.textContent = post;

    const likes = document.createElement('p');
    likes.textContent = "Likes: "+grade;
    
    const likeButton = document.createElement('button');
    likeButton.textContent = 'Like';
    likeButton.classList.add('btn');
    likeButton.setAttribute('onclick', `like(${id})`);
    
    postContainer.appendChild(userHeader);
    postContainer.appendChild(postText);
    postContainer.appendChild(likes);
    postContainer.appendChild(likeButton);
    
    const page = document.querySelector('.page');
    page.appendChild(postContainer);
  }