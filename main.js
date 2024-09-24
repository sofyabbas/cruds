let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
const delBtn = document.getElementById("deleteAll");
let mode = "create";
let temp;

const byTitle = document.getElementById("by-title");
const byCat = document.getElementById("by-cat");
const searchInput = document.getElementById("search");



function searchData() {
    // console.log(byTitle.checked)
    // console.log(byCat.checked)

    let table = "";
    if (byTitle.checked) {
        //search by title
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].title.includes(searchInput.value.toLowerCase())) {
                table +=
                    `  <tr>
                            <td>${i}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].count}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick="updateData(${i})" id="update">Update</button></td>
                            <td><button onclick="delData(${i})">Delete</button></td>
                            
                        </tr>`
            }
        }
    } else {
        //search by catigory
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.includes(searchInput.value.toLowerCase())) {
                table +=
                    `  <tr>
                            <td>${i}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].count}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick="updateData(${i})" id="update">Update</button></td>
                            <td><button onclick="delData(${i})">Delete</button></td>
                            
                        </tr>`
            }
        }
    }
    document.getElementById("tbody").innerHTML = table;
}

//console.log(title,price,taxes,ads,discount,total,category,submit)
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = result;
        total.style.backgroundColor = '#040';
    } else {
        total.innerHTML = '';
        total.style.backgroundColor = '#b92f2f';
    }
}

//add new product
let dataPro
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
} else {
    dataPro = [];
}
submit.onclick = function () {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if (title.value != "" && price.value != "" && category.value != "") {
        if (mode === "create") {
            dataPro.push(newPro);
        } else {
            dataPro[temp] = newPro;
            mode = "create"
            submit.innerHTML = "Create"
        }
        clearData()
    }

    localStorage.setItem("product", JSON.stringify(dataPro));

    showData()
}


//clear inputs
function clearData() {
    title.value = ""
    price.value = ""
    taxes.value = ""
    ads.value = ""
    discount.value = ""
    total.innerHTML = ""
    count.value = ""
    category.value = ""
}

//show data
function showData() {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table +=
            `  <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].count}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">Update</button></td>
                        <td><button onclick="delData(${i})">Delete</button></td>
                        
                    </tr>`
    }
    document.getElementById("tbody").innerHTML = table;
    if (dataPro.length > 0) {
        delBtn.innerHTML = `
        <button onclick="deleteAll()">Delete All</button>`
    } else {
        delBtn.innerHTML = "";
    }
}

showData();

//delete record
function delData(i) {
    console.log("done");
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}



//delte all

function deleteAll() {
    localStorage.clear();
    dataPro.splice(0);
    showData();
}


//update data

function updateData(i) {

    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    title.value = dataPro[i].title;
    discount.value = dataPro[i].discount;
    count.value = dataPro[i].count;
    getTotal();
    category.value = dataPro[i].category;
    submit.innerHTML = "UPDATE";

    mode = "update";
    temp = i;

    scroll({
        top: 0,
        behavior: "smooth"
    })

}
