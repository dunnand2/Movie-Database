// const baseURL = `http://localhost:19191`;
const baseURL = `http://flip1.engr.oregonstate.edu:19191`
// const baseURL = `http://flip1.engr.oregonstate.edu:19191` // (or wherever you run the server) when live  
// `http://localhost:19191` when local

// basic get request, builds table
var req = new XMLHttpRequest();
req.open("GET", baseURL, true);
req.setRequestHeader("table_name", "movies", false);    // set what table we are requesting
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

// reference for table
const table = document.getElementById('moviesTable');

const makeTable = (allRows) => {
    for (var row = 0; row < allRows.length; row++) {
        var currentRow = allRows[row];
        makeRow(currentRow, table);
    };
};

// const makeGenreInstanceTable = (allRows) => {
//     for (var row = 0; row < allRows.length; row++) {
//         var currentRow = allRows[row];
//         makeGenreInstanceRow(currentRow, table);
//     };
// }; 

const makeRow = (currentRow, table) => {
    // reference for moviesTable body
    var tbody = table.firstElementChild;
    // new row
    var row = document.createElement("tr");

    // id will be hidden
    // new cell
    var idCell = document.createElement("td");
    // new cell text
    var idCellText = document.createTextNode(currentRow.movie_id);
    // hide cell
    idCell.style.display = "none";
    // append text to cell
    idCell.appendChild(idCellText);
    // append cell to row
    row.appendChild(idCell);

    // make cell for each datum
    makeCell(currentRow.title, row);
    makeCell(currentRow.release_year, row);
    //let director_id = currentRow.director_id;

    makeCell(currentRow.director, row);
    makeCell(currentRow.composer, row);
    // makeCell(currentRow.genres, row);   

    // view genres button
    viewGenresButton = document.createElement("button");
    viewGenresButton.innerHTML = "View genres and actors";
    viewGenresButton.id = "viewGenresButton";
    viewGenresButton.style = "cursor: pointer;"
    // new cell
    var viewGenresCell = document.createElement("td");
    // append button to cell
    viewGenresCell.appendChild(viewGenresButton);
    // append cell to row
    row.append(viewGenresCell);

    // update button
    updateButton = document.createElement("button");
    updateButton.innerHTML = "edit";
    updateButton.id = "updateButton";
    // new cell
    var updateCell = document.createElement("td");
    // append button to cell
    updateCell.appendChild(updateButton);
    // append cell to row
    row.append(updateCell);

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

// const makeGenreInstanceRow = (currentRow, table) => {
//     // reference for moviesTable body
//     var tbody = table.firstElementChild;
//     // new row
//     var row = document.createElement("tr");

//     // gnere_id will be hidden
//     // new cell
//     var genreIDCell = document.createElement("td");
//     // new cell text
//     var genreIDCellText = document.createTextNode(currentRow.genre_id);
//     // hide cell
//     genreIDCell.style.display = "none";
//     // append text to cell
//     genreIDCell.appendChild(genreIDCellText);
//     // append cell to row
//     row.appendChild(genreIDCell);

//     // movie_id will be hidden
//     // new cell
//     var movieIDCell = document.createElement("td");
//     // new cell text
//     var movieIDCellText = document.createTextNode(currentRow.movie_id);
//     // hide cell
//     movieIDCell.style.display = "none";
//     // append text to cell
//     movieIDCell.appendChild(movieIDCellText);
//     // append cell to row
//     row.appendChild(movieIDCell);

//     // make cell for each datum
//     makeCell(currentRow.title, row);
//     makeCell(currentRow.name, row);

//     deleteButton = document.createElement("button");
//     deleteButton.innerHTML = "delete";
//     deleteButton.id = "deleteButton";
//     // new cell
//     var deleteCell = document.createElement("td")
//     // append button to cell
//     deleteCell.appendChild(deleteButton)
//     // append cell to row
//     row.append(deleteCell)

//     // // append row to tbody
//     tbody.appendChild(row)
// };

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
    currentDataRow = table.firstElementChild.firstElementChild.nextElementSibling;
    while (true) {
        if (currentDataRow.nextElementSibling == null) {
            currentDataRow.remove();
            break;
        }
        currentDataRow.nextElementSibling.remove();
    }
};

// populates director drop down menu on forms
getDirectors = (currentDir, selectInput) => {
    var req = new XMLHttpRequest();
    req.open("GET", baseURL, true);
    req.setRequestHeader("table_name", "directors", false);    // set what table we are requesting
    req.onload = (e) => {
        if (req.readyState === 4) {
            if (req.status === 200) {
                // this is where the magic happens              
                var response = JSON.parse(req.responseText);
                var directorArray = response.rows;
                // directorSelect = document.querySelector("#directorSelect");
                var i;
                for (i = 0; i < directorArray.length; i++) {
                    dropdownOption = document.createElement("option");
                    dropdownOption.innerHTML = `${directorArray[i].first_name} ${directorArray[i].last_name}`;
                    dropdownOption.value = directorArray[i].director_id;
                    // set default option
                    if (`${directorArray[i].first_name} ${directorArray[i].last_name}` === currentDir) {
                        dropdownOption.defaultSelected = true;
                    }
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
getComposers = (currentCom, selectInput) => {
    var req = new XMLHttpRequest();
    req.open("GET", baseURL, true);
    req.setRequestHeader("table_name", "composers", false);    // set what table we are requesting
    req.onload = (e) => {
        if (req.readyState === 4) {
            if (req.status === 200) {
                // this is where the magic happens              
                var response = JSON.parse(req.responseText);
                var composerArray = response.rows;
                // composerSelect = document.querySelector("#composerSelect");
                var i;
                for (i = 0; i < composerArray.length; i++) {
                    dropdownOption = document.createElement("option");
                    dropdownOption.innerHTML = `${composerArray[i].first_name} ${composerArray[i].last_name}`;
                    dropdownOption.value = composerArray[i].composer_id;
                    if (`${composerArray[i].first_name} ${composerArray[i].last_name}` === currentCom) {
                        dropdownOption.defaultSelected = true;
                    }

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

// populates genres for search results
getGenres = (movieID, resultsTable) => {
    var req = new XMLHttpRequest();
    req.open("GET", baseURL, true);
    req.setRequestHeader("table_name", "genre_instances", false);    // set what table we are requesting
    req.onload = (e) => {
        if (req.readyState === 4) {
            if (req.status === 200) {
                // this is where the magic happens              
                var response = JSON.parse(req.responseText);
                var genreInstancesArray = response.rows;
                var i;
                var genreArray = [];
                for (i = 0; i < genreInstancesArray.length; i++) {

                    if (genreInstancesArray[i].movie_id == movieID) {
                        console.log("pushing")
                        genreArray.push(genreInstancesArray[i].name)
                    }
                }
                genreRow = document.createElement("tr");
                makeCell("Genres:", genreRow);
                for (i = 0; i < genreArray.length; i++) {

                    makeCell(genreArray[i], genreRow)
                }
                resultsTable.appendChild(genreRow);

            } else {
                console.log(baseURL)
                console.error(req.statusText);
            }
        }
    };
    req.send();
}

// populates actors for search results
getActors = (movieID, resultsTable) => {
    var req = new XMLHttpRequest();
    req.open("GET", baseURL, true);
    req.setRequestHeader("table_name", "performances", false);    // set what table we are requesting
    req.onload = (e) => {
        if (req.readyState === 4) {
            if (req.status === 200) {
                // this is where the magic happens              
                var response = JSON.parse(req.responseText);
                var performancesArray = response.rows;
                var i;
                var actorArray = [];
                for (i = 0; i < performancesArray.length; i++) {

                    if (performancesArray[i].movie_id === movieID) {
                        actorArray.push(performancesArray[i].actor);
                    }
                }
                actorRow = document.createElement("tr");
                makeCell("Actors:", actorRow);
                for (i = 0; i < actorArray.length; i++) {
                    makeCell(actorArray[i], actorRow)
                }
                resultsTable.appendChild(actorRow);

            } else {
                console.log(baseURL);
                console.error(req.statusText);
            }
        }
    };
    req.send();
}

addDirectorSelect = document.querySelector("#addDirectorSelect");
addComposerSelect = document.querySelector("#addComposerSelect");
// populate dropdowns in add movie form
getDirectors(null, addDirectorSelect);
getComposers(null, addComposerSelect);

// submit row POST request, add row
const newRowSubmit = document.getElementById('addMovieForm');
newRowSubmit.addEventListener('submit', (e) => {
    e.preventDefault();
    var req = new XMLHttpRequest();
    var payload = {
        title: null,
        release_year: null,
        director_id: null,
        composer_id: null,
        table_name: "movies"
    };
    payload.title = document.querySelector("#titleInput").value;
    payload.release_year = document.getElementById("releaseYearInput").value;
    payload.director_id = document.getElementById("addDirectorSelect").value;
    payload.composer_id = document.getElementById("addComposerSelect").value;

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
                alert(`added movie ${payload.title}`);
            } else {
                console.error(req.statusText);
            }
        }
    };
    req.send(JSON.stringify(payload));
});

table.addEventListener('click', (event) => {
    let target = event.target;
    // if it is an update button, send a PUT request to the server
    if (target.id == "updateButton") {
        onUpdate(target);
    };
    // if it is a delete button, send a delete request to the server
    if (target.id == "deleteButton") {
        onDelete(target);
    };

    if (target.id == "viewGenresButton") {
        onViewGenres(target);
    };

});

var updateBool = false;
const onUpdate = (target) => {
    if (updateBool == true) {
        alert("You are already updating a row!");
        return;
    }
    updateBool = true;
    //              button cell       row
    var updateRow = target.parentNode.parentNode

    //             button cell       row        id cell           id value
    var updateID = target.parentNode.parentNode.firstElementChild.innerHTML;

    // new header
    updateHeader = document.createElement("h1");
    // text content of header
    updateHeader.innerHTML = "Edit Form";

    mainTableContainer = document.querySelector("mainTableContainer");

    // append header to body
    document.body.appendChild(updateHeader);
    // starts pointing at title field
    var currentElement = updateRow.firstElementChild.nextElementSibling;


    // new form
    updateForm = document.createElement("form");
    // append form to fieldset
    fieldset = document.createElement("fieldset");
    legend = document.createElement("legend");
    legend.innerHTML = "Edit Form";
    fieldset.appendChild(legend);
    updateForm.appendChild(fieldset);
    document.body.appendChild(updateForm);

    // title label
    var titleLabel = document.createElement("label");
    titleLabel.innerText = "title:"
    // title field
    var titleInput = document.createElement("input");
    // title field input type
    titleInput.setAttribute("type", "text");
    // title of field
    titleInput.name = "title";
    // title field old value
    titleInput.defaultValue = currentElement.innerText;
    // append
    titleLabel.appendChild(titleInput);
    fieldset.appendChild(titleLabel);

    // iterate through siblings
    currentElement = currentElement.nextElementSibling;

    // year label
    var yearLabel = document.createElement("label");
    yearLabel.innerText = "year:"
    // year field
    var yearInput = document.createElement("input");
    // year field input type
    yearInput.setAttribute("type", "number");
    // name of field
    yearInput.name = "year";
    // year field old value
    yearInput.defaultValue = currentElement.innerText;
    // append
    yearLabel.appendChild(yearInput);
    fieldset.appendChild(yearLabel);

    // iterate through siblings
    currentElement = currentElement.nextElementSibling;

    var currentDir = currentElement.innerHTML;
    // director label
    var directorLabel = document.createElement("label");
    directorLabel.innerText = "director:"
    // director field
    var directorSelect = document.createElement("select");
    directorSelect.id = "directorSelect";
    // populate dropdown

    getDirectors(currentDir, directorSelect);
    // name of field
    directorSelect.name = "director";
    // append
    directorLabel.appendChild(directorSelect);
    fieldset.appendChild(directorLabel);

    // iterate through siblings
    currentElement = currentElement.nextElementSibling;

    var currentCom = currentElement.innerHTML;
    // composer label
    var composerLabel = document.createElement("label");
    composerLabel.innerText = "composer:"
    // composer field
    var composerSelect = document.createElement("select");
    composerSelect.id = "composerSelect";
    // populate dropdown
    getComposers(currentCom, composerSelect);
    // name of field
    composerSelect.name = "composer";
    // composer field old value
    // composerInput.defaultValue = currentElement.innerText;
    // append
    composerLabel.appendChild(composerSelect);
    fieldset.appendChild(composerLabel);

    // submit button
    var updateSubmit = document.createElement("input");
    updateSubmit.setAttribute("type", "submit");
    updateSubmit.value = "submit";
    // append
    fieldset.appendChild(updateSubmit);
    document.body.appendChild(updateForm);
    window.scrollTo(0, document.body.scrollHeight);

    updateSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        var req = new XMLHttpRequest();
        var payload = {
            title: titleInput.value,
            release_year: yearInput.value,
            director_id: directorSelect.value,
            composer_id: composerSelect.value,
            movie_id: updateID,
            table_name: "movies"
        };
        req.open("PUT", baseURL, true);
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
                    updateBool = false;
                    alert(`Successfully updated ${payload.title}`)
                } else {
                    console.error(req.statusText);
                }
            }
        }
        req.send(JSON.stringify(payload));
        updateHeader.remove();
        updateForm.remove();
    });
};

const onDelete = (target) => {
    //             button cell       row        id cell           id value
    var deleteID = target.parentNode.parentNode.firstElementChild.innerHTML;
    var req = new XMLHttpRequest();
    var payload = {
        movie_id: null,
        table_name: "movies"
    };
    payload.movie_id = deleteID;
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

onViewGenres = (target) => {
    window.scrollTo(0, document.body.scrollHeight);
    //             button cell       row        id cell           id value
    var searchID = target.parentNode.parentNode.firstElementChild.innerHTML;

    if (searchResultTable != undefined) {
        searchResultTable.remove();
    }
    searchResultTable = document.createElement("table");
    searchHeaderRow = document.createElement("tr");
    searchHeaderRow.style = "font-weight: bold;"
    searchResultRow = document.createElement("tr");
    var req = new XMLHttpRequest();
    req.open("GET", baseURL, true);
    req.setRequestHeader("table_name", "movies", false);    // set what table we are requesting
    req.onload = (e) => {
        if (req.readyState === 4) {
            if (req.status === 200) {

                var response = JSON.parse(req.responseText);
                var movies = response.rows
                var i = 0;
                for (i = 0; i < movies.length; i++) {
                    if (movies[i].movie_id == searchID) {
                        // headers
                        makeCell("Movie Title", searchHeaderRow);
                        makeCell("Release Year", searchHeaderRow);
                        makeCell("Director", searchHeaderRow);
                        makeCell("Composer", searchHeaderRow);

                        makeCell(movies[i].title, searchResultRow);
                        makeCell(movies[i].release_year, searchResultRow);
                        makeCell(movies[i].director, searchResultRow);
                        makeCell(movies[i].composer, searchResultRow);

                        // const searchResultsGenresRow = document.createElement("tr");
                        getGenres(movies[i].movie_id, searchResultTable);
                        getActors(movies[i].movie_id, searchResultTable);
                        // makeCell(movies[i].composer, searchResultRow);
                        searchResultTable.appendChild(searchHeaderRow);
                        searchResultTable.appendChild(searchResultRow);
                        searchDiv.firstElementChild.firstElementChild.appendChild(searchResultTable)
                        window.scrollTo(0, 0);
                    }  
                }                
            } else {
                console.log(baseURL)
                console.error(req.statusText);
            }
        }
    };
    req.send();
}

const searchDiv = document.querySelector("#searchDiv");
const searchButton = document.querySelector("#searchButton");
var searchResultTable = undefined;
searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (searchResultTable != undefined) {
        searchResultTable.remove();
    }
    searchResultTable = document.createElement("table");
    searchHeaderRow = document.createElement("tr");
    searchHeaderRow.style = "font-weight: bold"
    searchResultRow = document.createElement("tr");
    const searchInput = document.querySelector("#searchInput")
    var req = new XMLHttpRequest();
    req.open("GET", baseURL, true);
    req.setRequestHeader("table_name", "movies", false);    // set what table we are requesting
    req.onload = (e) => {
        if (req.readyState === 4) {
            if (req.status === 200) {

                var response = JSON.parse(req.responseText);
                var movies = response.rows;
                var exists = false;
                var i = 0;
                for (i = 0; i < movies.length; i++) {
                    if (movies[i].title.toLowerCase() == searchInput.value.toLowerCase()) {
                        exists = true;
                        // headers
                        makeCell("Movie Title", searchHeaderRow);
                        makeCell("Release Year", searchHeaderRow);
                        makeCell("Director", searchHeaderRow);
                        makeCell("Composer", searchHeaderRow);

                        
                        makeCell(movies[i].title, searchResultRow);
                        makeCell(movies[i].release_year, searchResultRow);
                        makeCell(movies[i].director, searchResultRow);
                        makeCell(movies[i].composer, searchResultRow);

                        getGenres(movies[i].movie_id, searchResultTable);
                        getActors(movies[i].movie_id, searchResultTable);

                        searchResultTable.appendChild(searchHeaderRow);
                        searchResultTable.appendChild(searchResultRow);
                        searchDiv.firstElementChild.firstElementChild.appendChild(searchResultTable);
                    }
                }
                if (!exists) {
                    alert(`Sorry, ${searchInput.value} doesn't exist in our database.`);
                }
            } else {
                console.log(baseURL)
                console.error(req.statusText);
            }
        }
    };
    req.send();
});