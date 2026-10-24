const input = document.querySelector("input");
const form = document.querySelector("form");
const ol = document.querySelector("ol");
const clean = document.querySelector(".clean");
const del = document.querySelector(".del");
const existingArray = JSON.parse(localStorage.getItem("existingArray")) || [];

// handle submit: push, save, and create an item for that value
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value.trim();
  if (!value) return;

  existingArray.push({ item: value, mark: false });
  localStorage.setItem("existingArray", JSON.stringify(existingArray));
  createListItem(value);

  input.value = "";
});

// render existing items from storage
existingArray.forEach((val) => createListItem(val.item));

clean.addEventListener("click", () => {
  ol.innerHTML = "";
});

del.addEventListener("click", () => {
  ol.innerHTML = "";
  localStorage.clear();
  location.reload(); //clears in memory tasks
});

function createListItem(value) {
  const li = document.createElement("li");
  li.innerHTML = `<input type="checkbox"> ${value}`;
  const cleanBtn = document.createElement("button");
  cleanBtn.innerText = "❌";
  li.appendChild(cleanBtn);
  ol.appendChild(li);

  // "❌" to remove the item from the DOM & localStorage
  /* Even though we create multiple <li> its not the same ! */
  /* Each has its own reference, i.e each <li> is connected to its own EventListner*/
  /* That is the reason why every li is not cleared */
  cleanBtn.addEventListener("click", () => {
    const index = existingArray.findIndex((ele) => ele.item === value);
    if (index !== -1) {
      existingArray.splice(index, 1);
      localStorage.setItem("existingArray", JSON.stringify(existingArray));
    }
    li.remove();
  });

  // checkbox strikethrough
  const index = existingArray.findIndex((ele) => ele.item === value);
  if (existingArray[index].mark) {
    li.classList.add("done");
    li.querySelector("input[type='checkbox']").checked = true;
  }

  // checkbox toggle
  li.querySelector("input[type='checkbox']").addEventListener("change", () => {
    const index = existingArray.findIndex((ele) => ele.item === value);
    const currentValue = existingArray[index].mark;
    console.log(existingArray[index]);

    if (!currentValue) {
      existingArray[index].mark = true;
      li.classList.add("done");
    } else {
      existingArray[index].mark = false;
      li.classList.remove("done");
    }

    localStorage.setItem("existingArray", JSON.stringify(existingArray));
  });
}
