// get posts =========================================
let postsSection = document.getElementById("posts");

let getPostsAPIs = function (userId = 5) {
  let body = "";
  let requist = new XMLHttpRequest();
  requist.responseType = "json";;
  requist.open("GET", `https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  requist.send();
  
  requist.onload = () => {
    if(requist.status >= 200 && requist.status < 300 && requist.response != null) {
      (requist.response).map((post) => {
        body += `<div class="post"><h3 class="title">${post.title}</h3><p class="content">${post.body}</p></div>`;
      });
    }
    postsSection.innerHTML = body;
  }
}

// list users ========================================
let users = Array.from(document.getElementsByClassName("name"));
let usersSection = document.getElementById("users");

let getUsersAPIs = function () {
  let body = "";
  let requist = new XMLHttpRequest();
  requist.responseType = "json";
  requist.open("GET", "https://jsonplaceholder.typicode.com/users");
  requist.send();
  
  requist.onload = () => {
    if(requist.status >= 200 && requist.status < 300 && requist.response != null) {
      (requist.response).map((element, index) => {
        if (!index) body += `<h4 class="name active" data-userId="${element.id}">${element.name}<span class="user-name">${element.username}</span></h4>`;
        else body += `<h4 class="name" data-userId="${element.id}">${element.name}<span class="user-name">${element.username}</span></h4>`;
      });
    }
    usersSection.innerHTML = body;
    getPostsAPIs(1);
    users = Array.from(document.getElementsByClassName("name"));
    let activeUser = Array.from(document.getElementsByClassName("name active"))[0];
    users.map((ele)=>{
      ele.addEventListener("click", ()=>{
        activeUser.classList.remove("active");
        ele.classList.add("active");
        getPostsAPIs(activeUser.getAttribute("data-userId"));
        activeUser = Array.from(document.getElementsByClassName("name active"))[0];
      })
    });
  }
}

getUsersAPIs();

// select user ==================================================
