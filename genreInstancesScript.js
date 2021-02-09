// reference for movies table
//const baseURL = `http://localhost:19191`;
const baseURL = `http://flip1.engr.oregonstate.edu:19191`  

const table = document.getElementById('genresTable');

var req = new XMLHttpRequest();

req.open("GET", baseURL, true);
req.setRequestHeader("table_name", "genre_instances", false);    // set what table we are requesting
req.onload = (e) => {
    if (req.readyState === 4) {
        if (req.status === 200) {
            var response = JSON.parse(req.responseText);
            var allRows = response.rows
            makeTable(allRows);
        } else {
            console.log(baseURL)
            console.error(req.statusText);
        }
    }
};
req.send();

// build the table according to the allRows, an array of objects
const makeTable = (allRows) => {
    for (var row = 0; row < allRows.length; row++) {
        var currentRow = allRows[row];
        makeRow(currentRow, table);
    };
};


const makeRow = (currentRow, table) => {
    // reference for moviesTable body
    var tbody = table.firstElementChild;
    // new row
    var row = document.createElement("tr");

    // gnere_id will be hidden
    // new cell
    var genreIDCell = document.createElement("td");
    // new cell text
    var genreIDCellText = document.createTextNode(currentRow.genre_id);
    // hide cell
    genreIDCell.style.display = "none";
    // append text to cell
    genreIDCell.appendChild(genreIDCellText);
    // append cell to row
    row.appendChild(genreIDCell);

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
    makeCell(currentRow.title, row);
    makeCell(currentRow.name, row);

    deleteButton = document.createElement("button");
    deleteButton.innerHTML = "delete";
    deleteButton.id = "deleteButton";
    // new cell
    var deleteCell = document.createElement("td")
    // append button to cell
    deleteCell.appendChild(deleteButton)
    // append cell to row
    row.append(deleteCell)

    // // append row to tbody
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
    // currentDataRow.remove();
    while (true) {
        if (currentDataRow.nextElementSibling == null) {
            currentDataRow.remove();
            break;
        }
        currentDataRow.nextElementSibling.remove();
    }
};

// submit row POST request, add row
const newRowSubmit = document.getElementById('addGenreInstanceForm');
newRowSubmit.addEventListener('submit', (e) => {
    e.preventDefault();
    var req = new XMLHttpRequest();
    var payload = {
        movie_id: null,
        genre_id: null,
        table_name: "genre_instances"
    };

    payload.genre_id = document.getElementById("addGenresSelect").value;
    payload.movie_id = document.getElementById("addMoviesSelect").value;
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
                alert("added the desired genre instance");
            } else {
                console.error(req.statusText);
            }
        }
    };
    req.send(JSON.stringify(payload));
});

// populates movie dropdown menu
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

// populates genre dropdown menu
getGenres = (currentGen, selectInput) => {
    var req = new XMLHttpRequest();
    req.open("GET", baseURL, true);
    req.setRequestHeader("table_name", "genres", false);    // set what table we are requesting
    req.onload = (e) => {
        if (req.readyState === 4) {
            if (req.status === 200) {
                // this is where the magic happens              
                var response = JSON.parse(req.responseText);
                var genreArray = response.rows;
                var i;
                for (i = 0; i < genreArray.length; i++) {
                    dropdownOption = document.createElement("option");
                    dropdownOption.innerHTML = `${genreArray[i].name}`;
                    dropdownOption.value = genreArray[i].genre_id;
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

addGenreSelect = document.querySelector("#addGenresSelect");
addMovieSelect = document.querySelector("#addMoviesSelect");
getGenres(null, addGenresSelect);
getMovies(null, addMovieSelect);

table.addEventListener('click', (event) => {
    let target = event.target;
    if (target.id == "deleteButton") {
        onDelete(target)
    };
});

const onDelete = (target) => {
    //                  button cell       row        actor id cell     id value
    var deleteGenreID = target.parentNode.parentNode.firstElementChild.innerHTML;
    //                  button cell       row        actor id cell     movie id cell      id value
    var deleteMovieID = target.parentNode.parentNode.firstElementChild.nextElementSibling.innerHTML;
    var req = new XMLHttpRequest();
    var payload = {
        genre_id: deleteGenreID,
        movie_id: deleteMovieID,
        table_name: "genre_instances"
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