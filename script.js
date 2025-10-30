const input = document.querySelector("input");
const form = document.querySelector("form");
const ol = document.querySelector("ol");
const clean = document.querySelector(".clean");
const del = document.querySelector(".del")
const existingArray = JSON.parse(localStorage.getItem("existingArray")) || [];

function createListItem(value) {
  const li = document.createElement("li");
  li.innerHTML = `<input type="checkbox"> ${value}`;

  const cleanBtn = document.createElement("button");
  cleanBtn.innerText = "❌";
  li.appendChild(cleanBtn);

  // ONE listener per button, closed over the specific `value`
  cleanBtn.addEventListener("click", () => {
    const index = existingArray.indexOf(value);
    if (index !== -1) {
      existingArray.splice(index, 1);
      localStorage.setItem("existingArray", JSON.stringify(existingArray));
    }

    /* Even though we create multiple <li> its not the same ! */
    /* Each has its own reference, i.e each <li> is connected to its own EventListner*/
    /* That is the reason why every li is not cleaneted */
    li.remove();
  });

  // checkbox toggle
  li.querySelector("input[type='checkbox']").addEventListener("change", () => {
    li.classList.toggle("done");
  });

  ol.appendChild(li);

  clean.addEventListener("click", () => {
    ol.innerHTML = ""
  })
  
  del.addEventListener("click", () => {
    ol.innerHTML = "";
    localStorage.clear();
  });
}

// render existing items from storage
existingArray.forEach((v) => createListItem(v));

// handle submit: push, save, and create an item for that value
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value.trim();
  if (!value) return;

  existingArray.push(value);
  localStorage.setItem("existingArray", JSON.stringify(existingArray));
  createListItem(value);

  input.value = "";
});
