
const inputBtn = document.getElementById("input-btn");
const inputEl =  document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const saveTabBtn = document.getElementById("tab-btn");

let myLeads = [];
let leadsFromLocalStroage = JSON.parse(localStorage.getItem("myLeads"));

if(leadsFromLocalStroage){
   myLeads = leadsFromLocalStroage;
   renderLeads(myLeads)
}

function renderLeads(Leads){
    let listItem = " ";
    for(let i=0; i<Leads.length; i++){
        listItem += `
           <li>
              <a target="blank" href="${Leads[i]}">
                 ${Leads[i]}
              </a>
           </li>
        `
    }
    ulEl.innerHTML = listItem;
}

inputBtn.addEventListener("click",()=>{
    let inputVale = inputEl.value;
     if(inputVale != ""){
        myLeads.push(inputVale);
        inputEl.value = "";
        localStorage.setItem("myLeads",JSON.stringify(myLeads));
        renderLeads(myLeads);
     }
     else{
        alert("Please fill a url");
     }
});

saveTabBtn.addEventListener("click",()=>{
   chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      myLeads.push(tabs[0].url);
      localStorage.setItem("myLeads",JSON.stringify(myLeads));
      renderLeads(myLeads);
   });
})

deleteBtn.addEventListener("dblclick",()=>{
   localStorage.clear();
   myLeads = [];
   renderLeads(myLeads);
})

function generateSentence(desc,arr){
  let baseString = `The ${arr.length} ${desc} are `;
  let lastIndex = arr.length - 1;
  for(let i=0;i<arr.length;i++){
      if(i == lastIndex){
         baseString += arr[i] + ".";
      }else{
         baseString += arr[i] + ", ";
      }
  }
  return baseString;
}

const country = generateSentence("biggest countries",["China","Russia","US"]);

console.log(country);





