console.log("hey");

const fetchData = async () => {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  return data;
};

const listData = (data) => {
  const listContainer = document.querySelector(".list");

  data.forEach((element) => {
    let liElement = document.createElement("li");
    liElement.innerHTML = element.title;
    listContainer.appendChild(liElement);
  });
  console.log(listContainer);
};

const init = async () => {
  const data = await fetchData();
  console.log(data);
  listData(data);
};

init();
