function mudaimagem4() {
    document.getElementById("imagemcor").src = "../img/professor_color.png"

    let foto = document.getElementById('Camera');
    let file = document.getElementById('png');

}

function mousesai4() {
    document.getElementById("imagemcor").src = "../img/professor_uncolor.png"
}

function mudaimagem5() {
    document.getElementById("imagemcor1").src = "../img/mundocolor.png"
}

function mousesai5() {
    document.getElementById("imagemcor1").src = "../img/mundo.png"
}

function mudaimagem6() {
    document.getElementById("imagemcor2").src = "../img/molequinhocolor.png"
}

function mousesai6() {
    document.getElementById("imagemcor2").src = "../img/molequinho.png"
}

function mudaimagem7() {
    document.getElementById("imagemcor3").src = "../img/livroscolor.png"
}

function mousesai7() {
    document.getElementById("imagemcor3").src = "../img/livros.png"
}

function mudaimagem8() {
    document.getElementById("imagemcor4").src = "../img/professor_color.png"
    document.getElementById("imagemcor5").src = "../img/molequinhocolor.png"

}

function mousesai8() {
    document.getElementById("imagemcor4").src = "../img/professor_uncolor.png"
    document.getElementById("imagemcor5").src = "../img/molequinho.png"
}

function mudaimagem9() {
    document.getElementById("imagemcor6").src = "../img/mundocolor.png"
    document.getElementById("imagemcor7").src = "../img/livroscolor.png"



}

function mousesai9() {
    document.getElementById("imagemcor6").src = "../img/mundo.png"
    document.getElementById("imagemcor7").src = "../img/livros.png"
}

let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");

closeBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    menuBtnChange();//calling the function(optional)
});

searchBtn.addEventListener("click", () => { // Sidebar open when you click on the search iocn
    sidebar.classList.toggle("open");
    menuBtnChange(); //calling the function(optional)
});

function menuBtnChange() {
    if (sidebar.classList.contains("open")) {
        closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
    } else {
        closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");//replacing the iocns class
    }
}
