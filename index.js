console.log("hey");

let data = [];

const fetchData = async () => {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const res = await fetch(url);
  data = await res.json();
  console.log(data);
  return data;
};

const listData = (data) => {
  console.log("lisdata");
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
                           }</h2><span class="deleteBtnCont"><button class="postDeleteBtn">&#10006;</button></span></span>
                           <p>${
                             postBody.charAt(0).toUpperCase() +
                             postBody.slice(1) +
                             "."
                           }</p>
                         `;
    listContainer.appendChild(liElement);

    let deleteBtn = liElement.querySelector(".postDeleteBtn");
    deleteBtn.addEventListener("click", () => deletePost(liElement));
  });
  console.log(listContainer);
};

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", (event) => {
  let query = event.target.value.toLowerCase();
  console.log(query);
  let result = data.filter(
    (post) => post.title.includes(query) || post.body.includes(query)
  );
  listData(result);
  console.log(result);
});

const deletePost = (element) => {
  element.classList.add("slide-out");

  element.addEventListener("animationend", function () {
    const list = document.querySelector(".list");
    list.removeChild(element);
  });
};

const init = async () => {
  const data = await fetchData();
  console.log(data);
  listData(data);
};

document.addEventListener("DOMContentLoaded", () => {});

init();
