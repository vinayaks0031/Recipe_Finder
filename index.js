console.log("Finding Recipes.....");
//============== List to display  ==========//
var ingre = []
var buttons = []

//========================================== Rendering Recipe Cards ==============================================//
function render_cards(data) {
    document.getElementById('container').style.height = "390vh";
    desc();
    console.log(data.results.length + " Recipes");
    var container = document.getElementById('card');
    if (data.results.length == 0) {
        not_found();
    }
    else {
        for (var i = 0; i < data.results.length; i++) {

            if (data.results[i].thumbnail == "") {
                data.results[i].thumbnail = "bg-image2.jpg";
            }
            let card = `<div class="image-box"> 
                      <img src="${data.results[i].thumbnail}"/> 
                      </div> 
                      <div class="text"> 
                      <h2>${data.results[i].title}</h2> 
                      <br> 
                      <p class="head">Ingredients</p> 
                      <p class="tail">${data.results[i].ingredients}</p> 
                      <br> 
                      <button class="btn" onclick="window.open('${data.results[i].href}')">Full Recipe here....</button>
                      </div> `;
            var ele = document.createElement('div');
            ele.className = "res-card";
            ele.setAttribute("data-aos", "flip-right");
            ele.innerHTML = card;
            container.append(ele);
        }
    }
}
//==========================================  Fetching API ====================================================//
async function search() {
    var buttons = document.getElementsByClassName("ingre_btn");
    empty(ingre);
    i = document.getElementById('ingre').value.trim();
    ingre.push(i);
    q = document.getElementById('dish').value.trim();
    ingre.push(q);
    console.log(ingre)
    rm_btn(buttons);
    if (q == "") {
        alert("Enter required details");
    }
    else {
        var container = document.getElementById('card').innerHTML = "";

        document.getElementById("res").style.visibility = "visible";
        document.getElementById("res").setAttribute("data-aos", "zoom-in-down");
        url = "https://yacdn.org/proxy/http://www.recipepuppy.com/api/?i=" + i + "&q=" + q + "&p=1";
        console.log(url);
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
        render_cards(data);
    }
}

//============================================= Not_found Function ============================================== //
function not_found() {
    var ele = document.getElementById('card');
    ele.innerHTML = '<div id="not_found" data-aos="fade-left"><h3>Nothing Found ... Please enter required details properly</h3></div>';
    setTimeout(() => {
        document.getElementById('not_found').style.visibility = "hidden";
        document.getElementById("res").style.visibility = "hidden";
    }, 5000)
}

//============================================= Reset function ================================================== //
function reset() {
    alert("This action will remove all the entered detalis and searched results");
    location.reload();
}

//============================================= Descrption box ================================================== //

function desc() {
    var area = document.getElementById('desc');
    for (var i = 0; i < ingre.length; i++) {
        if (ingre[i] != "") {
            var ele = document.createElement('button');
            ele.id = "ingre_btn";
            ele.innerHTML = ingre[i] + "&nbsp;&times;";
            area.append(ele)
        }
    }
}

//====================== Empty Array ====================== //
function empty(ingre) {
    while (ingre.length > 0) {
        ingre.pop();
    }
}

//=================== remove btn =========================== //
function rm_btn(buttons) {
    var list = document.getElementsByClassName('ingre_btn');
    var i = 0;
    while (list.length) {
        var ele = document.getElementById('ingre_btn');
        ele.parentNode.removeChild(ele);
        list.pop();
    }

    console.log(buttons,buttons.length);
}