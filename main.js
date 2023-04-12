let myLeads = [];

// accessing elements
const inputEl = document.getElementById('input-el');
const ulEl = document.getElementById('ul-el');
const inputBtn = document.getElementById('input-btn');
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById('savetab-btn');


let data = JSON.parse(localStorage.getItem("name"));


if(data){
    myLeads = data;
    render(myLeads);
}


// savetab-btn saves the current active window's url and adding the value to local storage
tabBtn.addEventListener('click', function(){
   chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    myLeads.push(tabs[0].url);
    localStorage.setItem("name", JSON.stringify(myLeads));
    render(myLeads);
   })
})


// saving the value of input box and adding it to local storage
inputBtn.addEventListener('click', function(){
    myLeads.push(inputEl.value);
    localStorage.setItem("name", JSON.stringify(myLeads));
    render(myLeads);
})


// removes all the data inside the local storage on double clicking the delete all button
deleteBtn.addEventListener('dblclick', function(){
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})


// displays all the data inside the array
function render(myLeads){
    let listItems = ""

    for(let i=0;i<myLeads.length;i++){
        listItems += `<li><a href='${myLeads[i]}' target='_blank'>${myLeads[i]}</a></li>`;
    }
    
    ulEl.innerHTML = listItems;
    inputEl.value="";
}