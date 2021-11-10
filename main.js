const usersList = document.querySelector('.userTable__body');
const postsList = document.querySelector('.postsTable__body');

let userData;
let postData;

// Retrieving user data
fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.json())
  .then((json) => {
    userData = json;

    // Appending new table rows per user recieved.
    userData.forEach((user) => {
      usersList.innerHTML += `<tr value="${user.id}" class="userTable__row">
      <td>${user.id}</td>
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>${user.name}</td>
      <td>${user.address.city}</td>
      </tr>`;
    });
  })
  .then(() => {
    // Setting selector here because it doesn't exist before this
    const userRows = document.querySelectorAll('.userTable__row');

    userRows.forEach((row) => {
      // Setting up click listener for each row
      row.addEventListener('click', (event) => {
        // Selecting the row id. There is probably a cleaner way to accomplish this
        let rowHTML = `${event.target.parentNode.innerHTML}`;
        let id = rowHTML.slice(
          rowHTML.indexOf('<td>') + 4,
          rowHTML.indexOf('</td>')
        );

        // Appending recieved posts to posts table
        let postsContent = '';
        postData[id - 1].forEach((post) => {
          postsContent += `<tr><td>${post.id}</td><td>${post.title}</td><td>${post.body}</td><tr>`;
        });
        postsList.innerHTML = postsContent;
      });
    });
  });

// Retrieving post data
fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => response.json())
  .then((json) => {
    postData = json;

    // Flattening for easier consumption
    let flatPosts = [];
    postData.forEach((post) => {
      if (!flatPosts[post.userId - 1]) {
        flatPosts[post.userId - 1] = [post];
      } else {
        flatPosts[post.userId - 1].push(post);
      }
    });

    postData = flatPosts;
  });
