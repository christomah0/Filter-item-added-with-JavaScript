const button = document.querySelector('button');
const inputItem = document.querySelector('.add_item');
const searchItem = document.querySelector('.search_item');
const itemParent = document.querySelector('ul');
const optionList = document.querySelectorAll('option');


class ManipList {
  constructor(item_parent, add_item, search_item) {
    this.add_item = add_item;
    this.search_item = search_item;
    this.item_parent = item_parent;
  }

  addItem() {
    const item = document.createElement('li');
    item.innerHTML = `${this.add_item.value}<span class="deleteBtn">X</span>`;
    this.item_parent.appendChild(item);
  }

  dropItem(clickedItem) {
    const item = clickedItem.parentElement;
    this.item_parent.removeChild(item);
  }

  filterItem() {
    this.search_item.addEventListener('keyup', (charObtained) => {
      const textObtained = charObtained.target.value.toLowerCase();
      Array.from(this.item_parent.getElementsByTagName('li')).forEach((i) => {
        const item = i.textContent.toLowerCase();
        if (item.indexOf(textObtained) != -1) {
          i.style.display = 'block';
        }
        else {
          i.style.display = 'none';
        }
      });
    });
  }
}

const objList = new ManipList(itemParent, inputItem, searchItem);


itemParent.addEventListener('click', (i) => {
  if (i.target.classList.contains('deleteBtn')) {
    objList.dropItem(i.target);
    inputItem.value = '';
  }
});

inputItem.onfocus = function () {
  inputItem.style.outline = '';
  searchItem.value = '';
}

searchItem.onfocus = function () {
  inputItem.value = '';
  inputItem.style.outline = 'none';
}

button.onmouseenter = function () {
  button.style.boxShadow = '0px 2px 3px #000000';
};

button.onmouseout = function () {
  button.style.boxShadow = 'none';
};

button.onclick = function () {
  button.style.boxShadow = '0px 1px 2px #000000 inset';
  if (inputItem.value != '') {
    inputItem.style.border = 'none';
    objList.addItem();
  }
  else {
    inputItem.style.outline = 'solid 2px #ff0000';
  }
}

objList.filterItem();
