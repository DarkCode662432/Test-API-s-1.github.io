// get posts =========================================
let postsSection = document.getElementById("posts");

// XMLHttpRequist Class ===============================================
// let getPostsAPIs = function (userId) {
//   let content = "";
//   let requist = new XMLHttpRequest();
//   requist.responseType = "json"; // make requist type json
//   requist.open("GET", `https://jsonplaceholder.typicode.com/posts?userId=${userId}`); // open the API with selected method
//   requist.send(); // send the requist
  // postsSection.innerHTML = "<div class='load'></div>"; // effect load untill requist finish

  // requist.onload = () => {
  //   if(requist.status >= 200 && requist.status < 300 && requist.response != null) { // if requist's status is succesfully
      // for(post of requist.response) {  // loop posts and craete it's UI
      //   content += `<div class="post"><h3 class="title">${post.title}</h3><p class="content">${post.body}</p></div>`;
  //     }
  //   }
  //   postsSection.innerHTML = content;
  // }
// }
// ====================================================================
// fetch method =======================================================
let getPostsAPIs = function (userId) {
  postsSection.innerHTML = "<div class='load'></div>"; // effect load untill requist finish
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`, {
    method: "GET",
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
  })
  .then((response) => response.json()
  .then((posts) => {
    let content = "";
    for(post of posts) // loop posts and craete it's UI
    { 
      content += `<div class="post"><h3 class="title">${post.title}</h3><p class="content">${post.body}</p></div>`;
    }
    postsSection.innerHTML = content;
  }));
}

// list users ========================================
let usersSection = document.getElementById("users");

// XMLHttpRequist Class ===============================================
// let getUsersAPIs = function () {
//   let content = "";
//   let requist = new XMLHttpRequest();
//   requist.responseType = "json"; // make requist type json
//   requist.open("GET", "https://jsonplaceholder.typicode.com/users"); // open the API with selected method
//   requist.send(); // send the requist
//   usersSection.innerHTML = "<div class='load'></div>"; // effect load untill requist finish
  
//   requist.onload = () => {
//     if(requist.status >= 200 && requist.status < 300 ) {  // if requist's status is succesfully
      // loop users and craete it's UI
    //   for (user of requist.response)  content += `<h4 class="name" onClick="userSelect(${user.id}, this)">${user.name}<span class="user-name">${user.username}</span></h4>`;
    // }
    // usersSection.innerHTML = content;
    // // active first users as defult
    // usersSection.firstChild.classList.add("active");
  // }
// }
// ====================================================================
// fetch method =======================================================
let getUsersAPIs = function () {
  usersSection.innerHTML = "<div class='load'></div>"; // effect load untill requist finish
  fetch(`https://jsonplaceholder.typicode.com/users`, {
    method: "GET",
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
  })
  .then((response) => response.json()
  .then((users) => {
    // get posts for the first time you run the website
    getPostsAPIs(1);

    let content = "";
    for (user of users)
    {
      content += `<h4 class="name" onClick="userSelect(${user.id}, this)">${user.name}<span class="user-name">${user.username}</span></h4>`;
    }
    usersSection.innerHTML = content;
    // active first users as defult
    usersSection.firstChild.classList.add("active");
}));
}


// this function import the posts when user select user name, and make user selected
function userSelect(id, ele) {
  // get posts of selected user
  getPostsAPIs(id);
  // remove active class from old selected users
  let selectedUsers = document.getElementsByClassName("name active");
  for (selectedUser of selectedUsers) {
    selectedUser.classList.remove("active");   
  }

  // add active class to current selected users
  ele.classList.add("active"); 
}
///////////////////////////////////////////////////////////////////////////////////////

// import get users function to create UI of users list
getUsersAPIs();

