const title = document.getElementById("title");
const description = document.getElementById("description");
const form = document.querySelector("form");
const container = document.querySelector(".container");

// to show the tasks in localStorage on the form 
const tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
//console.log(tasks);
// to show it call showAllTasks()
showAllTasks();


function showAllTasks () {
    tasks.forEach((value,index) => {
        const div = document.createElement("div");
        div.setAttribute("class","task");

        const innerDiv = document.createElement("div");
        div.append(innerDiv);

        const p = document.createElement("p");
        p.innerText = value.title;
        innerDiv.append(p);

        const span = document.createElement("span");
        span.innerText = value.description;
        innerDiv.append(span);

        const btn = document.createElement("button");
        btn.setAttribute("class","deleteBtn");
        btn.innerText = "-";

        btn.addEventListener("click",() =>{
            // first delete the tasks
            removeTasks();
            // to delete a tasks
            tasks.splice(index,1);
            // to remove from localStorage also 
            localStorage.setItem("tasks", JSON.stringify(tasks)); 
            showAllTasks();
        })

        div.append(btn);
        container.append(div);
    })
}

function removeTasks(){
    tasks.forEach(() => {
        const div = document.querySelector(".task");
        div.remove();
    });
}
    

form.addEventListener("submit",(e) => {
    e.preventDefault();
    removeTasks();
    tasks.push({
        title: title.value ,
        description: description.value,
    });
    //console.log(tasks);
    // to save the tasks we have to use localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showAllTasks();
});