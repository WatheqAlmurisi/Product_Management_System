let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = "create";
let temp;

// get total function
function getTotal() {
    if (price.value != "") {
        let result = +price.value + +taxes.value + +ads.value - +discount.value;
        total.innerHTML = result;
        total.style.background = "#040";
    } else {
        total.innerHTML = "";
        total.style.background = "#a00d02";
    }
}

//create product

let dataProd = [];

if (localStorage.product != null) {
    dataProd = JSON.parse(localStorage.product);
} else {
    dataProd = [];
}

submit.onclick = function () {
    let newProd = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    };
    count.style.display = "block";
    if (
        title.value != "" &&
        price.value != "" &&
        category.value != "" &&
        newProd.count <= 200 
    ) {
        if (mood === "create" ) {

            if (newProd.count >= 1) {
                for (let i = 0; i < newProd.count; i++) {
                    dataProd.push(newProd);
                }
            }
            
        } else {
            dataProd[temp] = newProd;
            mood = "create";
            submit.innerHTML = "Create";
        }
        clearData();

    }

    //save localstorage
    localStorage.setItem("product", JSON.stringify(dataProd));

    showData();
};

function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}

//read

function showData() {
    let table = "";
    getTotal();

    for (let i = 0; i < dataProd.length; i++) {
        table += `
         <tr>
                 <td>${i + 1}</td>
                 <td>${dataProd[i].title}</td>
                 <td>${dataProd[i].price}</td>
                 <td>${dataProd[i].taxes}</td>
                 <td>${dataProd[i].ads}</td>
                 <td>${dataProd[i].discount}</td>
                 <td>${dataProd[i].total}</td>
                 <td>${dataProd[i].category}</td>
                
                 <td><button onclick="updateItem(${i})" id="update">update</td>
                 <td><button onclick="deleteItem(${i})" id="delete">delete</td>
            </tr>
        `;
    }
    document.getElementById("tbody").innerHTML = table;

    let btnDeleteAll = document.getElementById("deleteAll");
    if (dataProd.length > 0) {
        btnDeleteAll.innerHTML = `
        <button onclick="deleteAll()">Delete All (${dataProd.length})</button>`;
    } else {
        btnDeleteAll.innerHTML = "";
    }
}
showData();

//delete
function deleteItem(index) {
    dataProd.splice(index, 1);
    localStorage.product = JSON.stringify(dataProd);
    showData();
}
function deleteAll() {
    localStorage.clear();
    dataProd.splice(0);
    showData();
}

//update Item
function updateItem(index) {
    title.value = dataProd[index].title;
    price.value = dataProd[index].price;
    taxes.value = dataProd[index].taxes;
    ads.value = dataProd[index].ads;
    discount.value = dataProd[index].discount;
    getTotal();
    count.style.display = "none";
    category.value = dataProd[index].category;
    submit.innerHTML = "Update";
    mood = "update";
    temp = index;
    scroll({
        top: 0,
        behavior: "smooth",
    });
}

//Search
let searchMood = "title";

function getSearchMood(id) {
    let search = document.getElementById("search");

    if (id == "searchTitle") {
        searchMood = "title";
    } else {
        searchMood = "category";
    }
    search.placeholder = "Search By " + searchMood;
    search.focus();
    search.value = "";
    showData();
}

function searchData(value) {
    let table = "";
    for (let i = 0; i < dataProd.length; i++) {
        if (searchMood == "title") {
            if (dataProd[i].title.toLowerCase().includes(value.toLowerCase())) {
                table += `
             <tr>
                 <td>${i}</td>
                 <td>${dataProd[i].title}</td>
                 <td>${dataProd[i].price}</td>
                 <td>${dataProd[i].taxes}</td>
                 <td>${dataProd[i].ads}</td>
                 <td>${dataProd[i].discount}</td>
                 <td>${dataProd[i].total}</td>
                 <td>${dataProd[i].category}</td>
                
                 <td><button onclick="updateItem(${i})" id="update">update</td>
                 <td><button onclick="deleteItem(${i})" id="delete">delete</td>
            </tr>
        `;
            }
        } else {
            if (dataProd[i].category.toLowerCase().includes(value.toLowerCase())) {
                table += `
             <tr>
                 <td>${i}</td>
                 <td>${dataProd[i].title}</td>
                 <td>${dataProd[i].price}</td>
                 <td>${dataProd[i].taxes}</td>
                 <td>${dataProd[i].ads}</td>
                 <td>${dataProd[i].discount}</td>
                 <td>${dataProd[i].total}</td>
                 <td>${dataProd[i].category}</td>
                
                 <td><button onclick="updateItem(${i})" id="update">update</td>
                 <td><button onclick="deleteItem(${i})" id="delete">delete</td>
            </tr>
        `;
            }
        }
    }

    document.getElementById("tbody").innerHTML = table;
}

