let inpBut = document.querySelector(".button");

function pageLoaded() {
  inpBut.addEventListener("click", sendRequest);
}

function usersOutput(usersPosts) {
  let usersOutputArr = [];
  console.log(usersPosts);
  /*  usersPosts1 = JSON.parse(usersPosts1);
  console.log(usersPosts1);
  usersOutputArr = usersPosts1.map((userPosts, userId) => {
    //    let userOutput = userPosts;
    let userOutput = 1;
    return userOutput;
  });

  console.log(usersOutputArr);*/
}

function combineRequests(users, posts) {
  let usersPosts = [];

  users.then((users1) => {
    users1.map((user) => {
      const user1 = user;
      posts.then((posts1) => {
        const postsOf = posts1.filter((post) => post.userId == user1.id);
        user1.post = postsOf;
        usersPosts.push(user1);
      });
    });
  });

  return usersPosts;
}

function getFetch() {
  Promise.all([
    fetch("http://jsonplaceholder.typicode.com/users"),
    fetch("http://jsonplaceholder.typicode.com/posts"),
  ])
    .then(([users, posts]) => {
      const usersObj = users.json();
      const postsObj = posts.json();
      return Promise.resolve([usersObj, postsObj]);
    })
    .then(([users, posts]) => {
      return combineRequests(users, posts);
    })
    .then((response) => {
      usersOutput(response);
    })
    .catch((err) => console.log(err));
}

function sendRequest(event) {
  event.preventDefault();
  getFetch();
}

document.addEventListener("DOMContentLoaded", pageLoaded);
