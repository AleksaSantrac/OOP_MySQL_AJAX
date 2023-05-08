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




window.onload = function getById(){
    console.log('f');
    $.ajax({
        url: 'handler/getById.php',
        type: 'get',
        data: { 
            
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

    const likes = document.createElement('p');
    likes.textContent = "Likes: "+grade;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('btn');
    deleteButton.setAttribute('onclick', `deleteReview(${id})`);
    
    postContainer.appendChild(userHeader);
    postContainer.appendChild(postText);
    postContainer.appendChild(likes);
    postContainer.appendChild(deleteButton);

    const page = document.querySelector('.page');
    page.appendChild(postContainer);
  }