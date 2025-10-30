const input = document.querySelector("input");
const form = document.querySelector("form");
const ol = document.querySelector("ol");
const existingArray = JSON.parse(localStorage.getItem("existingArray")) || [];

function createListItem(value) {
  const li = document.createElement("li");
  li.innerHTML = `<input type="checkbox"> ${value}`;

  const delBtn = document.createElement("button");
  delBtn.innerText = "❌";
  li.appendChild(delBtn);

  // ONE listener per button, closed over the specific `value`
  delBtn.addEventListener("click", () => {
    const index = existingArray.indexOf(value);
    if (index !== -1) {
      existingArray.splice(index, 1);
      localStorage.setItem("existingArray", JSON.stringify(existingArray));
    }

    /* Even though we create multiple <li> its not the same ! */
    /* Each has its own reference, i.e each <li> is connected to its own EventListner*/
    /* That is the reason why every li is not deleted */
    li.remove();
  });

  // checkbox toggle
  li.querySelector("input[type='checkbox']").addEventListener("change", () => {
    li.classList.toggle("done");
  });

  ol.appendChild(li);
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
