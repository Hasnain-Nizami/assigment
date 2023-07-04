function search(data) {
  var container = document.querySelector(".left-box");
  let lists = "";
  let dataItems = data.data.recipes;

  if (dataItems.length !== 0) {
    for (let index of dataItems) {
      var divEle = `<div class="text" onclick="handlerCook(this,'${index.id}')">
        <div class="image">
            <img src="${index.image_url}" alt="">
        </div>
        <div class="text-item">
            <p class="name">${index.title}</p>
            <p class="title">${index.publisher}</p>
        </div>
    </div>`;
      lists += divEle;
    }
    container.innerHTML = lists.toString();
  } else {
    alert("data not found");
  }
}

function repond() {
  var user = document.querySelector(".inp");
  fetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes?search=${user.value.toLowerCase()}`
  )
    .then((response) => response.json())
    .then((data) => search(data));
}

function ingredients(obj) {
  let ingList = "";
  obj.forEach((element) => {
    ingList += `<tr>
     <td><i class="fa-solid fa-check"></i> ${element.description}</td>
     <td><i class="fa-solid fa-check"></i> ${element.quantity} ${element.unit}</td>
 </tr>`;
  });
  return ingList;
}

const foodIncredient = (obj) => {
  let rightBox = document.querySelector(".right-box");
  var items = `<div class="pic">
  <img src="${obj.image_url}" alt="">
</div>
<span class="slashDiv"> </span>
<div class="serve-flex">
  <div class="serving">
      <div class="min">
          <i class="fa-regular fa-clock"></i>
          <p style="font-weight: bold;">${obj.cooking_time}</p>
          <p>MINUTE</p>
      </div>
      <div class="min">
          <i class="fa-regular fa-clock"></i>
          <p style="font-weight: bold;">${obj.servings}</p>
          <p>SERVINGS</p>
          <div class="logo-gap">
              <p class="plus">-</p>
              <p class="plus">+</p>
          </div>
      </div>
  </div>
  <div>
      <p class="circle"><i class="fa-regular fa-bookmark"></i></p>
  </div>
</div>
<div class="recipe-sec">
  <h2>RECIPE INGREDIENTS</h2>
  <table>
  ${ingredients(obj.ingredients)}
  </table>

</div>
<div class="last-sec">
  <h3>HOW TO COOK IT</h3>
  <p>the source URL for the recipe is: <a href="${obj.source_url}">${
    obj.source_url
  }</a></p>
</div>`;
  rightBox.innerHTML = items;
};

function handlerCook(item, id) {
  fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`)
    .then((response) => response.json())
    .then((data) => {
      foodIncredient(data.data.recipe);
    });
}


