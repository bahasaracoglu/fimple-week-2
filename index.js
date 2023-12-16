let data;
console.log("dataa", data);

const fetchData = async () => {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const res = await fetch(url);
  data = await res.json();
  return data;
};

const getPostDetail = async (post) => {
  const postId = post.id;
  const url = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;
  const res = await fetch(url);
  const commentData = await res.json();
  console.log("postModal", commentData);
  return commentData;
};

const showComments = (comments) => {
  const modal = document.querySelector(".modal");
  console.log(modal);
  modal.style.display = "block";
  const commentList = document.querySelector(".comment-list");
  commentList.innerHTML = "";

  comments.forEach((comment) => {
    const commentName = comment.name;
    const commentBody = comment.body;
    const liElement = document.createElement("li");
    liElement.innerHTML = `<div><h2>
                            ${commentName}</h2>
                            <p> ${commentBody}</p>
                            </div>`;

    commentList.appendChild(liElement);
  });
};

const modal = document.querySelector(".modal");
const closeModalBtn = document.getElementById("closeModalBtn");
closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

const listData = (data) => {
  console.log("listdata");
  const listContainer = document.querySelector(".list");
  listContainer.innerHTML = "";

  data.forEach((element) => {
    let liElement = document.createElement("li");
    liElement.setAttribute("class", "postCard");
    let postBody = element.body;
    liElement.innerHTML = `
                          <span class=cardTitleCont> 
                           <h2>${
                             element.title
                           }</h2><span class="deleteBtnCont"><button class="postDeleteBtn"><i class="material-icons">close</i></button></span></span>
                           <p>${
                             postBody.charAt(0).toUpperCase() +
                             postBody.slice(1) +
                             "."
                           }</p>
                         `;
    listContainer.appendChild(liElement);

    let deleteBtn = liElement.querySelector(".postDeleteBtn");
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      deletePost(liElement);
    });
    liElement.addEventListener("click", async (e) => {
      const comments = await getPostDetail(element);
      showComments(comments);
    });
  });
  console.log(listContainer);
};

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchButton");
const searchClearBtn = document.getElementById("searchClear");

let timer;
const filterData = (query) => {
  console.log("filter", data);
  clearTimeout(timer);
  timer = setTimeout(() => {
    let result = data.filter(
      (post) => post.title.includes(query) || post.body.includes(query)
    );
    console.log("result", result);
    if (result.length > 0) {
      listData(result);
    } else {
      const listContainer = document.querySelector(".list");
      listContainer.innerHTML =
        "<div class='notFound'><img src='./john-travolta.gif'/><h2>Result Not Found :(</h2><p>Whoops... we couldn't find what you're looking for</p></div>";
    }
    console.log(result);
  }, 600);
};

searchInput.addEventListener("input", (event) => {
  let query = event.target.value.toLowerCase();
  console.log(query);
  filterData(query);
});

searchClearBtn.addEventListener("click", () => {
  searchInput.value = "";
  searchInput.focus();
  filterData("");
});

const deletePost = (element) => {
  element.classList.add("slide-out");

  element.addEventListener("animationend", function () {
    const list = document.querySelector(".list");
    list.removeChild(element);
  });
};

const init = async () => {
  data = await fetchData();
  console.log(data);
  listData(data);
};

init();
