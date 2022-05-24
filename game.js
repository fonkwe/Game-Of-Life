
//creating the tables
let table = document.getElementById('board');
let rows = 20
let cols = 20;
function createWorld(){  
for (let r = 0; r < rows; r++){
    tr = document.createElement("tr");
        for(let c = 0; c < cols; c++){
            td = document.createElement("td");
            td.setAttribute('class', "cell");
            // td.setAttribute('class',"dead")
            td.setAttribute('id', r+"_"+c)
            td.addEventListener('click', clickCell);
            tr.appendChild(td);
        }
     table.appendChild(tr);
}
}

function clickCell(){
let loc = this.id.split("_");
let r = Number(loc[0]);
let c = Number(loc[1]);
console.log(r+"_"+c)
console.log(typeof(c))
}
 
createWorld();




















































































//Create Actions for start button______________________________________________________________________________
const start = document.getElementById("start_btn");

start.addEventListener('click', function onClick(event) {
    // let cellCurrStates = []
    // console.log("line 78 cell current state", cellCurrStates)
    // let cellNextStates = []
    
    // console.log("line 80 cell next state", cellNextStates)
    let num = 1;
    let counter = 1
    whileTrack = 0
   
    function automateClick(){setTimeout(function(){
        let cellCurrStates = []
    console.log("line 78 cell current state", cellCurrStates)
    let cellNextStates = []
    
    console.log("line 80 cell next state", cellNextStates)

// instantiate tracking arrays to track current and next states
    for(let i = 0; i < numOfCellsCurr; i++){
        cellCurrStates.push(0)
        cellNextStates.push(0)
    }


     for(let i = 1; i <= numOfCells;i++){
    
    let temp = document.getElementById(i)
    let trackCurrState = i + numOfRowsCurr + (Math.floor((i - 1)/numOfRows))*(2)
    if(temp.style.backgroundColor == "green"){
        cellCurrStates[trackCurrState] = 0
    }else{
        cellCurrStates[trackCurrState] = 1
    }
}
//_________________________________________tracking current states

//setting next states from current states following rules//_________________________________________

for(let i = 1; i <= numOfCells;i++){
    let temp = document.getElementById(i)
    //still to account for cell at the edges
    //originally off state____________________________________________________________________________________________

    let trackCurrState = i + numOfRowsCurr + (Math.floor((i - 1)/numOfRows))*(2)
    let surrCellState = (
        cellCurrStates[(trackCurrState) - (numOfRowsCurr + 1) ] + cellCurrStates[(trackCurrState) - numOfRowsCurr] + cellCurrStates[(trackCurrState)-(numOfRowsCurr - 1)] + cellCurrStates[(trackCurrState)-1] + 
        cellCurrStates[(trackCurrState)+1] + cellCurrStates[(trackCurrState)+(numOfRowsCurr - 1)] + cellCurrStates[(trackCurrState)+numOfRowsCurr] + cellCurrStates[(trackCurrState)+(numOfRowsCurr + 1)]
    )

    if(cellCurrStates[trackCurrState] == 0 && surrCellState == 3){
        cellNextStates[trackCurrState] = 1
    }
    //Any live cell with fewer than two live neighbours dies (referred to as underpopulation).//________________________________
    else if(cellCurrStates[trackCurrState] == 1 && surrCellState < 2){
        cellNextStates[trackCurrState] = 0
    }
    //Any live cell with more than three live neighbours dies (referred to as overpopulation).//________________________________
    else if(cellCurrStates[trackCurrState] == 1 && surrCellState > 3){
        cellNextStates[trackCurrState] = 0
    }
    //Any live cell with two or three live neighbours lives, unchanged, to the next generation.//______________________________
    //refactor the suming
    else if(cellCurrStates[trackCurrState] == 1 && surrCellState == 3){
        cellNextStates[trackCurrState] = 1
    }else if(cellCurrStates[trackCurrState] == 1 && surrCellState == 2){
        cellNextStates[trackCurrState] = 1
    }
    //__________________________________________________________________________________________________________________________
    else(
        cellNextStates[trackCurrState] = 0
    )
    //___________________________________________________________________________________________________________________
}
//using Next state to change collor(applying state)
for(let i = 1; i <= numOfCells;i++){
    let trackCurrState = i + numOfRowsCurr + (Math.floor((i - 1)/numOfRows))*(2)
    let temp = document.getElementById(i)
    if(cellNextStates[trackCurrState] == 1){
        temp.style.backgroundColor = "yellow"
    }else{
        temp.style.backgroundColor = "green"
    }
}

    
    console.log("line 156 cell curr state", cellCurrStates)
    console.log("line 156 cell next state", cellNextStates)
    if(whileTrack == 1){
        return 0
    }
    automateClick()
    }, 500)}
    automateClick()
});


//Math.floor(Math.random() * (max - min) + min);
//random Action//_________________________________________________
const random = document.getElementById("random_btn");

random.addEventListener('click', function onClick(event) {
let cellCurrStates = []
let cellNextStates = []
for(let i = 1; i <= numOfCells;i++){
    let trackCurrState = i + numOfRowsCurr + (Math.floor((i - 1)/numOfRows))*(2)
    cellNextStates[trackCurrState] = (Math.floor(Math.random() * (3 - 0) + 0))
}
//using Next state to change collor(applying state)
for(let i = 1; i <= numOfCells;i++){
    let temp = document.getElementById(i)
    let trackCurrState = i + numOfRowsCurr + (Math.floor((i - 1)/numOfRows))*(2)
    if(cellNextStates[trackCurrState] == 1){
        temp.style.backgroundColor = "yellow"
    }else{
        temp.style.backgroundColor = "green"
    }
}
    //console.log(cellCurrStates)
});

//reset Actions//________________________________________________
const reset = document.getElementById("reset_btn");

reset.addEventListener('click', function onClick(event) {
let cellCurrStates = []
let cellNextStates = []
for(let i = 1; i <= numOfCells;i++){
    let trackCurrState = i + numOfRowsCurr + (Math.floor((i - 1)/numOfRows))*(2)
    cellNextStates[trackCurrState] = 0
}
//using Next state to change collor(applying state)
for(let i = 1; i <= numOfCells;i++){
    let trackCurrState = i + numOfRowsCurr + (Math.floor((i - 1)/numOfRows))*(2)
    let temp = document.getElementById(i)
    if(cellNextStates[trackCurrState] == 1){
        temp.style.backgroundColor = "yellow"
    }else{
        temp.style.backgroundColor = "green"
    }
}
    //console.log(cellCurrStates)
    whileTrack = 1
});
const stopB = document.getElementById("stop_btn");

stopB.addEventListener('click', function onClick(event) {
  
    whileTrack = 1
});



