
const clear = document.querySelector(".clear");
const dateElement = document.querySelector("#date");
const list = document.querySelector("#list");
const input = document.querySelector("#input");

//Classes names
const CHECK = "fa-check-circle-o";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//variables
let LIST = [];
let id = 0;

//get item localstorage
let data = localStorage.getItem("ToDo");

//check if data is not empty
if (data){
    LIST = JSON.parse(data);
    id = LIST.length; //set the id to the last one in the list
    loadList(LIST); //load the list to the user interface
}else{
    LIST = [];
    id = 0;
    }

//load items to the user's interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
 }

//clear the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
})


//show date
// const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
// const today = new Date();
//today.setHours(0,0,0,0)
// dateElement.innerHTML = today.toLocaleTimeString(undefined,options);

let weekDays = new Array(7);
        weekDays[0] = "Sunday";
        weekDays[1] = "Monday";
        weekDays[2] = "Tuesday";
        weekDays[3] = "Wednesday";
        weekDays[4] = "Thursday";
        weekDays[5] = "Friday";
        weekDays[6] = "Saturday";

const today = new Date();
let weekDay = weekDays[today.getDay()];
let localDate = weekDay +", " + ((today.getDate() >= 10 ) ? today.getDate() : '0'+today.getDate())
                +"."+(((today.getMonth()+1) >= 10 ) ? (today.getMonth()+1) : '0'+(today.getMonth()+1))
                +"."+today.getFullYear();

dateElement.innerHTML = localDate;

//addToDo
function addToDo(toDo, id, done, trash){
    if(trash){return;} //ko te return????

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const position = "beforeend"
    const item = `
                <li class="item">
                    <i class="co fa ${DONE}" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="de fa fa-close" job="delete" id="${id}"></i>
                </li>
                `;

    list.insertAdjacentHTML(position, item);
}


//add an item to the list user enter key
document.addEventListener("keyup",function(event){
    if(event.keyCode == 13){
        const toDo = input.value;
        
//if the input is not empty
        if(toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name:toDo,
                id:id,
                done:false,
                trash:false
            });

//add item to localstorage(this code must be added where the LIST array is apdated)
            localStorage.setItem("ToDo", JSON.stringify(LIST));

            id++;

        }
        input.value = "";
    }
});

//addToDo("Coffe", 1, false, false);

//complete to do
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false :true;

}

//remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

//target the items created dynamicaly
list.addEventListener("click", function(event){
    const element = event.target; //return the clicked element inside list
    const elementJob = element.attributes.job.value; //complete or delete - (check the attribute job value)
    
    if (elementJob =="complete"){
        completeToDo(element);
    }else if (elementJob == "delete"){
        removeToDo(element);
    }
    //add item to localstorage(this code must be added where the LIST array is apdated)
    localStorage.setItem("ToDo", JSON.stringify(LIST));
});

