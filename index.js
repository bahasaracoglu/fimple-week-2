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
    liElement.innerHTML = `<div>
                           <h2>${element.title}</h2><button>X</button>
                           </div>
                           <p>${element.body}</p>`;
    listContainer.appendChild(liElement);
  });
  console.log(listContainer);
};

const searchInput = document.getElementById("search");

searchInput.addEventListener("input", (event) => {
  let query = event.target.value;
  console.log(query);
  let result = data.filter(
    (post) => post.title.includes(query) || post.body.includes(query)
  );
  listData(result);
  console.log(result);
});

const init = async () => {
  const data = await fetchData();
  console.log(data);
  listData(data);
};

init();
