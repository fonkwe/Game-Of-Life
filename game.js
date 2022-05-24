//creating the tables
let table = document.getElementById('board');
let rows = 20;
let cols = 20;
let timer;
let startGame = false;
let started = false; // Set to true when use clicks start
let evolutionSpeed = 1000; // One second between generations

var currGen = [rows];
var nextGen = [rows];

function createGenArrays() {
    for (let i = 0; i < rows; i++) {
      currGen[i] = new Array(cols);
      nextGen[i] = new Array(cols);
    }
  }

  function initGenArrays() {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        currGen[i][j] = 0;
        nextGen[i][j] = 0;
      }
    }
  }

function random(){
    for(let i=0; i<rows; i++){
        for(let j=0; j<cols; j++){
            currGen[i][j] = Math.floor(Math.random() * 2);

            // console.log(typeof(currGen[i][j]))
            // console.log(currGen[i][j])

            if (currGen[i][j] == 1){
                // console.log("alive")
                table.children[i].children[j].setAttribute("class", "alive")
            }
            else {
                // console.log("dead")
                table.children[i].children[j].setAttribute("class", "dead")
            }
        }
    }

}

  function createWorld(){  
for (let r = 0; r < rows; r++){
    tr = document.createElement("tr");
        for(let c = 0; c < cols; c++){
            td = document.createElement("td");
            td.setAttribute('class', "cell");
            td.setAttribute('class',"dead")
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
if (this.className == "alive") {
        this.setAttribute("class", "dead");
        currGen[r][c] = 0;
      } else {
        this.setAttribute("class", "alive");
        currGen[r][c] = 1;
      }
}
 
// createWorld();
function updateCurrGen() {
    for (const row in currGen) {
        for (const col in currGen[row]) {
          currGen[row][col] = nextGen[row][col];
          nextGen[row][col] = 0;
        }
    }
}



function getNeighborCount(row, col) {
  let count = 0;
  let nrow = Number(row);
  let ncol = Number(col);

  // Make sure we are not at the first row
  if (nrow - 1 >= 0) {
    // Check top neighbor
    if (currGen[nrow - 1][ncol] == 1) count++;
  }
  // Make sure we are not in the first cell
  // Upper left corner
  if (nrow - 1 >= 0 && ncol - 1 >= 0) {
    //Check upper left neighbor
    if (currGen[nrow - 1][ncol - 1] == 1) count++;
  }
  // Make sure we are not on the first row last column
  // Upper right corner
  if (nrow - 1 >= 0 && ncol + 1 < cols) {
    //Check upper right neighbor
    if (currGen[nrow - 1][ncol + 1] == 1) count++;
  }
  // Make sure we are not on the first column
  if (ncol - 1 >= 0) {
    //Check left neighbor
    if (currGen[nrow][ncol - 1] == 1) count++;
  }
  // Make sure we are not on the last column
  if (ncol + 1 < cols) {
    //Check right neighbor
    if (currGen[nrow][ncol + 1] == 1) count++;
  }
  // Make sure we are not on the bottom left corner
  if (nrow + 1 < rows && ncol - 1 >= 0) {
    //Check bottom left neighbor
    if (currGen[nrow + 1][ncol - 1] == 1) count++;
  }
  // Make sure we are not on the bottom right
  if (nrow + 1 < rows && ncol + 1 < cols) {
    //Check bottom right neighbor
    if (currGen[nrow + 1][ncol + 1] == 1) count++;
  }

  // Make sure we are not on the last row
  if (nrow + 1 < rows) {
    //Check bottom neighbor
    if (currGen[nrow + 1][ncol] == 1) count++;
  }

  return count;
}
function createNextGen() {
  for (let row = 0; row < currGen.length; row++) {
    for (let col = 0; col < currGen[row].length; col++) {
      let neighbors = getNeighborCount(row, col);

      // Check the rules
      // If Alive
      if (currGen[row][col] == 1) {
        if (neighbors < 2) {
          nextGen[row][col] = 0;
        } else if (neighbors == 2 || neighbors == 3) {
          nextGen[row][col] = 1;
        } else if (neighbors > 3) {
          nextGen[row][col] = 0;
        }
      } else if (currGen[row][col] == 0) {
        // If Dead or Empty

    if (neighbors == 3) {
          // Propogate the species
          nextGen[row][col] = 1; //Birth?
        }
      }
    }
  }
}





  






 







     
// function updateCurrGen() {
//   for (let row = 0; row < currGen.length; row++) {
//     for (let col = 0; col < currGen.length; col++) {
//       // Update the current generation with
//       // the results of createNextGen function
//       currGen[row][col] = nextGen[row][col];
//       // Set nextGen back to empty
//       nextGen[row][col] = 0;
//     }
//   }
// }

// function updateWorld() {
//   let cell = "";
//   for (let row = 0; row < currGen.length; row++) {
//     for (let col = 0; col < currGen.length; col++) {
//       // for (let row = 0; row < currGen.length; row++) {
//       //   for (let col; col < currGen.length; col++) {
//       cell = document.getElementById(row + "_" + col);
//       if (tbl.children[row].children[col].getAttribute('class') == "dead") {
//         tbl.children[row].children[col].setAttribute("class", "dead");
//       } else {
//         tbl.children[row].children[col].setAttribute("class", "alive");
//       }
//     }
//   }
// }

function updateWorld() {
  let cell = "";
  for (const row in currGen) {
    for (const col in currGen[row]) {
      cell = document.getElementById(row + "_" + col);
      if (currGen[row][col] == 0) {
        cell.setAttribute("class", "dead");
      } else {
        cell.setAttribute("class", "alive");
      }
    }
  }
}

function start() {
  createNextGen(); //Apply the rules
  updateCurrGen(); //Set Current values from new generation
  updateWorld(); //Update the world view
  // getNeighborCount();
  // getNeighborCount(1, 1);
  // getNeighborCount(3, 2);
  startGame = true;
  if (startGame) {
    timer = setTimeout(start, 1000);
  }
  // if (started) {
  //   timer = setTimeout(evolve, evolutionSpeed);
  // }
}

// function start() {
//   if (startGame) {
//     startGame = true;
//     start();
//   }
// }

function stop() {
  if (startGame) {
    startGame = false;
    clearTimeout(timer);
  }
}
function startStopGol() {
  let startstop = document.querySelector("#start");

  if (!started) {
    started = true;
    startstop.value = "Stop Reproducing";
    evolve();
  } else {
    started = false;
    startstop.value = "Start Reproducing";
    clearTimeout(timer);
  }
}

function reset() {
  location.reload();
}
window.onload = () => {
  createWorld(); // The visual table
  createGenArrays(); // current and next generations
  initGenArrays(); //Set all array locations to 0=dead
};


















































































// //Create Actions for start button______________________________________________________________________________
// const start = document.getElementById("start_btn");

// start.addEventListener('click', function onClick(event) {
//     // let cellCurrStates = []
//     // console.log("line 78 cell current state", cellCurrStates)
//     // let cellNextStates = []
    
//     // console.log("line 80 cell next state", cellNextStates)
//     let num = 1;
//     let counter = 1
//     whileTrack = 0
   
//     function automateClick(){setTimeout(function(){
//         let cellCurrStates = []
//     console.log("line 78 cell current state", cellCurrStates)
//     let cellNextStates = []
    
//     console.log("line 80 cell next state", cellNextStates)

// // instantiate tracking arrays to track current and next states
//     for(let i = 0; i < numOfCellsCurr; i++){
//         cellCurrStates.push(0)
//         cellNextStates.push(0)
//     }


//      for(let i = 1; i <= numOfCells;i++){
    
//     let temp = document.getElementById(i)
//     let trackCurrState = i + numOfRowsCurr + (Math.floor((i - 1)/numOfRows))*(2)
//     if(temp.style.backgroundColor == "green"){
//         cellCurrStates[trackCurrState] = 0
//     }else{
//         cellCurrStates[trackCurrState] = 1
//     }
// }
// //_________________________________________tracking current states

// //setting next states from current states following rules//_________________________________________

// for(let i = 1; i <= numOfCells;i++){
//     let temp = document.getElementById(i)
//     //still to account for cell at the edges
//     //originally off state____________________________________________________________________________________________

//     let trackCurrState = i + numOfRowsCurr + (Math.floor((i - 1)/numOfRows))*(2)
//     let surrCellState = (
//         cellCurrStates[(trackCurrState) - (numOfRowsCurr + 1) ] + cellCurrStates[(trackCurrState) - numOfRowsCurr] + cellCurrStates[(trackCurrState)-(numOfRowsCurr - 1)] + cellCurrStates[(trackCurrState)-1] + 
//         cellCurrStates[(trackCurrState)+1] + cellCurrStates[(trackCurrState)+(numOfRowsCurr - 1)] + cellCurrStates[(trackCurrState)+numOfRowsCurr] + cellCurrStates[(trackCurrState)+(numOfRowsCurr + 1)]
//     )

//     if(cellCurrStates[trackCurrState] == 0 && surrCellState == 3){
//         cellNextStates[trackCurrState] = 1
//     }
//     //Any live cell with fewer than two live neighbours dies (referred to as underpopulation).//________________________________
//     else if(cellCurrStates[trackCurrState] == 1 && surrCellState < 2){
//         cellNextStates[trackCurrState] = 0
//     }
//     //Any live cell with more than three live neighbours dies (referred to as overpopulation).//________________________________
//     else if(cellCurrStates[trackCurrState] == 1 && surrCellState > 3){
//         cellNextStates[trackCurrState] = 0
//     }
//     //Any live cell with two or three live neighbours lives, unchanged, to the next generation.//______________________________
//     //refactor the suming
//     else if(cellCurrStates[trackCurrState] == 1 && surrCellState == 3){
//         cellNextStates[trackCurrState] = 1
//     }else if(cellCurrStates[trackCurrState] == 1 && surrCellState == 2){
//         cellNextStates[trackCurrState] = 1
//     }
//     //__________________________________________________________________________________________________________________________
//     else(
//         cellNextStates[trackCurrState] = 0
//     )
//     //___________________________________________________________________________________________________________________
// }
// //using Next state to change collor(applying state)
// for(let i = 1; i <= numOfCells;i++){
//     let trackCurrState = i + numOfRowsCurr + (Math.floor((i - 1)/numOfRows))*(2)
//     let temp = document.getElementById(i)
//     if(cellNextStates[trackCurrState] == 1){
//         temp.style.backgroundColor = "yellow"
//     }else{
//         temp.style.backgroundColor = "green"
//     }
// }

    
//     console.log("line 156 cell curr state", cellCurrStates)
//     console.log("line 156 cell next state", cellNextStates)
//     if(whileTrack == 1){
//         return 0
//     }
//     automateClick()
//     }, 500)}
//     automateClick()
// });


// //Math.floor(Math.random() * (max - min) + min);
// //random Action//_________________________________________________
// const random = document.getElementById("random_btn");

// random.addEventListener('click', function onClick(event) {
// let cellCurrStates = []
// let cellNextStates = []
// for(let i = 1; i <= numOfCells;i++){
//     let trackCurrState = i + numOfRowsCurr + (Math.floor((i - 1)/numOfRows))*(2)
//     cellNextStates[trackCurrState] = (Math.floor(Math.random() * (3 - 0) + 0))
// }
// //using Next state to change collor(applying state)
// for(let i = 1; i <= numOfCells;i++){
//     let temp = document.getElementById(i)
//     let trackCurrState = i + numOfRowsCurr + (Math.floor((i - 1)/numOfRows))*(2)
//     if(cellNextStates[trackCurrState] == 1){
//         temp.style.backgroundColor = "yellow"
//     }else{
//         temp.style.backgroundColor = "green"
//     }
// }
//     //console.log(cellCurrStates)
// });

// //reset Actions//________________________________________________
// const reset = document.getElementById("reset_btn");

// reset.addEventListener('click', function onClick(event) {
// let cellCurrStates = []
// let cellNextStates = []
// for(let i = 1; i <= numOfCells;i++){
//     let trackCurrState = i + numOfRowsCurr + (Math.floor((i - 1)/numOfRows))*(2)
//     cellNextStates[trackCurrState] = 0
// }
// //using Next state to change collor(applying state)
// for(let i = 1; i <= numOfCells;i++){
//     let trackCurrState = i + numOfRowsCurr + (Math.floor((i - 1)/numOfRows))*(2)
//     let temp = document.getElementById(i)
//     if(cellNextStates[trackCurrState] == 1){
//         temp.style.backgroundColor = "yellow"
//     }else{
//         temp.style.backgroundColor = "green"
//     }
// }
//     //console.log(cellCurrStates)
//     whileTrack = 1
// });
// const stopB = document.getElementById("stop_btn");

// stopB.addEventListener('click', function onClick(event) {
  
//     whileTrack = 1
// });



