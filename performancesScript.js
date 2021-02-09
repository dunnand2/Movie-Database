// const baseURL = `http://localhost:19191`;
const baseURL = `http://flip1.engr.oregonstate.edu:19191`
//const baseURL =  `http://flip3.engr.oregonstate.edu:19191` // (or wherever you run the server) when live   
// `http://localhost:19191` when local

// basic get request, builds table
var req = new XMLHttpRequest();

req.open("GET", baseURL, true);
req.setRequestHeader("table_name", "performances", false);    // set what table we are requesting
req.onload = (e) => {
    if (req.readyState === 4) {
        if (req.status === 200) {
            var response = JSON.parse(req.responseText);
            var allRows = response.rows;
            makeTable(allRows);

        } else {
            console.error(req.statusText);
        }
    }
};
req.send();

// reference for table
const table = document.getElementById('performancesTable');

const makeTable = (allRows) => {
    for (var row = 0; row < allRows.length; row++) {
        var currentRow = allRows[row];
        makeRow(currentRow, table);
    };
};

const makeRow = (currentRow, table) => {
    // reference for table body
    var tbody = table.firstElementChild;
    // new row
    var row = document.createElement("tr");

    
    // actor_id will be hidden
    // new cell
    var actorIDCell = document.createElement("td");
    // new cell text
    var actorIDCellText = document.createTextNode(currentRow.actor_id);
    // hide cell
    actorIDCell.style.display = "none";
    // append text to cell
    actorIDCell.appendChild(actorIDCellText);
    // append cell to row
    row.appendChild(actorIDCell);

    // movie_id will be hidden
    // new cell
    var movieIDCell = document.createElement("td");
    // new cell text
    var movieIDCellText = document.createTextNode(currentRow.movie_id);
    // hide cell
    movieIDCell.style.display = "none";
    // append text to cell
    movieIDCell.appendChild(movieIDCellText);
    // append cell to row
    row.appendChild(movieIDCell);

    // make cell for each datum
    // makeCell(currentRow.actor_id, row);
    // makeCell(currentRow.movie_id, row);
    makeCell(currentRow.actor, row);
    makeCell(currentRow.title, row);
    


    // delete button
    deleteButton = document.createElement("button");
    deleteButton.innerHTML = "delete";
    deleteButton.id = "deleteButton";
    // new cell
    var deleteCell = document.createElement("td")
    // append button to cell
    deleteCell.appendChild(deleteButton)
    // append cell to row
    row.append(deleteCell)

    // append row to tbody
    tbody.appendChild(row)
};

const makeCell = (data, row) => {
    // new cell
    var cell = document.createElement("td");
    // new cell text
    var cellText = document.createTextNode(data);
    // append text to cell
    cell.appendChild(cellText);
    // append cell to row
    row.appendChild(cell);
};

const deleteTable = (allRows) => {
    // set
    currentDataRow = table.firstElementChild.firstElementChild.nextElementSibling;
    while (true) {
        if (currentDataRow.nextElementSibling == null) {
            currentDataRow.remove();
            break;
        }
        currentDataRow.nextElementSibling.remove();
    }
};

// submit row POST request, add row
const newRowSubmit = document.getElementById('addPerformanceForm');
newRowSubmit.addEventListener('submit', (e) => {
    e.preventDefault();
    var req = new XMLHttpRequest();
    var payload = {
        movie_id: null,
        actor_id: null,
        table_name: "performances"
    };

    payload.actor_id = document.getElementById("addActorSelect").value;
    payload.movie_id = document.getElementById("addMovieSelect").value;

    req.open("POST", baseURL, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.onload = (e) => {
        if (req.readyState === 4) {
            if (req.status === 200) {
                // this is where the magic happens
                var response = JSON.parse(req.responseText);
                allRows = response.rows;
                // remove old table
                deleteTable(allRows);
                // rebuild from scratch
                makeTable(allRows);
                // return success or failure here
                alert("added desired performance")
            } else {
                console.error(req.statusText);
            }
        }
    };
    req.send(JSON.stringify(payload));
});

// populates composer dropdown menu
getActors = (currentAct, selectInput) => {
    var req = new XMLHttpRequest();
    req.open("GET", baseURL, true);
    req.setRequestHeader("table_name", "actors", false);    // set what table we are requesting
    req.onload = (e) => {
        if (req.readyState === 4) {
            if (req.status === 200) {
                // this is where the magic happens              
                var response = JSON.parse(req.responseText);
                var actorArray = response.rows;
                var i;
                for (i = 0; i < actorArray.length; i++) {
                    dropdownOption = document.createElement("option");
                    dropdownOption.innerHTML = `${actorArray[i].first_name} ${actorArray[i].last_name}`;
                    dropdownOption.value = actorArray[i].actor_id;
                    // append
                    selectInput.appendChild(dropdownOption);
                }
            } else {
                console.log(baseURL)
                console.error(req.statusText);
            }
        }
    };
    req.send();
}

// populates composer dropdown menu
getMovies = (currentMov, selectInput) => {
    var req = new XMLHttpRequest();
    req.open("GET", baseURL, true);
    req.setRequestHeader("table_name", "movies", false);    // set what table we are requesting
    req.onload = (e) => {
        if (req.readyState === 4) {
            if (req.status === 200) {
                // this is where the magic happens              
                var response = JSON.parse(req.responseText);
                var movieArray = response.rows;
                var i;
                for (i = 0; i < movieArray.length; i++) {
                    dropdownOption = document.createElement("option");
                    dropdownOption.innerHTML = `${movieArray[i].title}`;
                    dropdownOption.value = movieArray[i].movie_id;
                    // append
                    selectInput.appendChild(dropdownOption);
                }
            } else {
                console.log(baseURL)
                console.error(req.statusText);
            }
        }
    };
    req.send();
}

addActorSelect = document.querySelector("#addActorSelect");
addMovieSelect = document.querySelector("#addMovieSelect");

getActors(null, addActorSelect);
getMovies(null, addMovieSelect);

table.addEventListener('click', (event) => {
    let target = event.target;
    if (target.id == "deleteButton") {
        onDelete(target)
    };
});

const onDelete = (target) => {
    //                  button cell       row        actor id cell     id value
    var deleteActorID = target.parentNode.parentNode.firstElementChild.innerHTML;
    //                  button cell       row        actor id cell     movie id cell      id value
    var deleteMovieID = target.parentNode.parentNode.firstElementChild.nextElementSibling.innerHTML;
    var req = new XMLHttpRequest();
    var payload = {
        actor_id: deleteActorID,
        movie_id: deleteMovieID,
        table_name: "performances"
    };
    req.open("DELETE", baseURL, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.onload = (e) => {
        if (req.readyState === 4) {
            if (req.status === 200) {
                // this is where the magic happens
                var response = JSON.parse(req.responseText);
                allRows = response.rows;
                // remove old table
                deleteTable(allRows);
                // rebuild from scratch
                makeTable(allRows);
            } else {
                console.error(req.statusText);
            }
        }
    }
    req.send(JSON.stringify(payload));
};

// sendDeleteRequest = (deleteID) => {
//     var del_req = new XMLHttpRequest();
//     var payload = {
//         director_id: deleteID,
//         table_name: "directors"
//     };
//     del_req.open("DELETE", baseURL, true);
//     del_req.setRequestHeader('Content-Type', 'application/json');
//     del_req.onload = (e) => {
//         if (del_req.readyState === 4) {
//             if (del_req.status === 200) {
//                 // this is where the magic happens
//                 var response = JSON.parse(del_req.responseText);
//                 allRows = response.rows;
//                 // remove old table
//                 deleteTable(allRows);
//                 // rebuild from scratch
//                 makeTable(allRows);
//             } else {
//                 console.error(req.statusText);
//             }
//         }
//     }
//     del_req.send(JSON.stringify(payload));
// }


