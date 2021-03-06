import db from '../../database/firestore.js'
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";


const SelectedField = JSON.parse(localStorage.getItem('goal'));


const fieldData = await getDoc(doc(db, "fields", `${SelectedField}`));

function prerequisites(prereq){
    var prereq_list = `<ul class="prerequisites">Prerequisites : `;
    prereq.forEach((p) => {
        prereq_list += `<li>${p}</li>`
    })
    prereq_list += "</ul>";
    return prereq_list;
}


function description(link, logo, title, desc, prereq){
    return (
        `<section class="description">
            <div class="provider">
                <div class="provider_logo"><a href="${link}" target = "_blank"><img src="${logo}" alt="ChannelDp"></a></div>
                <div class="provider_name"><h3>${title}</h3></div>
            </div>
            <p class="some_text">${desc}</p>
            ${prerequisites(prereq)}
            <div class = "course_action">
                <button class = "is_fav" id = "html">!Fav</button>
                <button class = "add_to_list">Watch later</button>
            </div>
        </section>`
    )
}


/* 
TO BE ADDED BEFORE PUSHING  OR  MERGING 

<img class = "demo_player" src = "../images/resources/beginner/css/courses/f.jpg" alt = "course demo player">

*/

function resource_container(course_detail){
    return (
        `<li class = "resource_details">
            <iframe class = "demo_player" src="https://www.youtube.com/embed/${course_detail.videoId}?start=2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            ${description(course_detail.channelLink, course_detail.logo, course_detail.title, course_detail.description, course_detail.prerequisites)}
        </li>`
    )
}



function resources(db){
    var resource_list = `<li class="resources" id = "${db.course}">`;
    resource_list += `<h2 class = "resource_name">${db.course}</h2>
    <section class="resource_container">`;
    for(var i = 0; i<db.resources.length; i++){
        resource_list += resource_container(db.resources[i]);
    }
    resource_list += "</section></li>";
    return resource_list;
}


const beginnerArea = document.querySelector("#beginner_level_rendering");
const intermediateArea = document.querySelector("#intermediate_level_rendering")
const expertArea = document.querySelector("#expert_level_rendering")


const beginnerData = fieldData.data().beginner;
const intermediateData = fieldData.data().intermediate;
const expertData = fieldData.data().expert;



// RENDER LEVEL RESOURCE DATA TO BROWSER
function renderToLevel(levelArea, levelData){
    levelData.forEach((d) => {
        levelArea.innerHTML += `${resources(d)}`;
    })
}

renderToLevel(beginnerArea, beginnerData);
renderToLevel(intermediateArea, intermediateData);
renderToLevel(expertArea, expertData);




/* --------SCROLL BUTTONS-------  */

const beg_prev = document.querySelector("#beg_prev");
const beg_next = document.querySelector("#beg_next");
const int_prev = document.querySelector("#int_prev");
const int_next = document.querySelector("#int_next");
const exp_prev = document.querySelector("#exp_prev");
const exp_next = document.querySelector("#exp_next");

var beg_pos = 0;
var int_pos = 0;
var exp_pos = 0;


function checkScrollVisibilityOnLoad(){
    if(beginnerArea.childElementCount > 1){
        beg_next.style.display = 'block';
    }
    if(intermediateArea.childElementCount > 1){
        int_next.style.display = 'block';
    }
    if(expertArea.childElementCount > 1){
        exp_next.style.display = 'block';
    }
}

checkScrollVisibilityOnLoad();


function checkScrollVisibility(leftBtn, rightBtn, levelPos, levelAreaElements){
    if(levelPos <= 0){
        leftBtn.style.display = 'none';
    }
    else{
        leftBtn.style.display = 'block';
    }

    if(levelPos >= levelAreaElements - 1){
        rightBtn.style.display = 'none';
    }
    else{
        rightBtn.style.display = 'block';
    }
}


beg_prev.addEventListener("click", () => {
    if(beg_pos > 0){
        beg_pos -= 1;
        checkScrollVisibility(beg_prev, beg_next, beg_pos, beginnerArea.childElementCount);
        beginnerArea.scroll({
            top : 0,
            left : beginnerArea.offsetWidth*beg_pos,
            behavior : 'smooth'
        })
    }
})

beg_next.addEventListener("click", () => {
    if(beg_pos < beginnerArea.childElementCount-1){
        beg_pos += 1;
        checkScrollVisibility(beg_prev, beg_next, beg_pos, beginnerArea.childElementCount);
        beginnerArea.scroll({
            top : 0,
            left : beginnerArea.offsetWidth*beg_pos,
            behavior : 'smooth'
        })
    }
})

int_prev.addEventListener("click", () => {
    if(int_pos > 0){
        int_pos -= 1;
        checkScrollVisibility(int_prev, int_next, int_pos, intermediateArea.childElementCount);
        intermediateArea.scroll({
            top : 0,
            left : intermediateArea.offsetWidth*int_pos,
            behavior : 'smooth'
        })
    }
})

int_next.addEventListener("click", () => {
    if(int_pos < intermediateArea.childElementCount-1){
        int_pos += 1;
        checkScrollVisibility(int_prev, int_next, int_pos, intermediateArea.childElementCount);
        intermediateArea.scroll({
            top : 0,
            left : intermediateArea.offsetWidth*int_pos,
            behavior : 'smooth'
        })
    }
})

exp_prev.addEventListener("click", () => {
    if(exp_pos > 0){
        exp_pos -= 1;
        checkScrollVisibility(exp_prev, exp_next, exp_pos, expertArea.childElementCount);
        expertArea.scroll({
            top : 0,
            left : expertArea.offsetWidth*exp_pos,
            behavior : 'smooth'
        })
    }
})

exp_next.addEventListener("click", () => {
    if(exp_pos < expertArea.childElementCount-1){
        exp_pos += 1;
        checkScrollVisibility(exp_prev, exp_next, exp_pos, expertArea.childElementCount);
        expertArea.scroll({
            top : 0,
            left : expertArea.offsetWidth*exp_pos,
            behavior : 'smooth'
        })
    }
})