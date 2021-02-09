// reference for movies table
// const baseURL = 'http://localhost:19191'
//var baseURL = require('./baseURL');
const baseURL = `http://flip1.engr.oregonstate.edu:19191`
const table = document.getElementById('genresTable');

// basic get request, builds table
var req = new XMLHttpRequest();

req.open("GET", baseURL, true);
req.setRequestHeader("table_name", "genres", false);    // set what table we are requesting
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

    // id will be hidden
    // new cell
    var idCell = document.createElement("td");
    // new cell text
    var idCellText = document.createTextNode(currentRow.genre_id);
    // hide cell
    idCell.style.display = "none";
    // append text to cell
    idCell.appendChild(idCellText);
    row.appendChild(idCell);


    // make cell for each datum
    makeCell(currentRow.name, row);

    // view movies button
    viewMoviesButton = document.createElement("button");
    viewMoviesButton.innerHTML = "View movies";
    viewMoviesButton.id = "viewMoviesButton";
    // new cell
    var viewMoviesCell = document.createElement("td");
    // append button to cell
    viewMoviesCell.appendChild(viewMoviesButton);
    // append cell to row
    row.append(viewMoviesCell);

    // edit button
    editButton = document.createElement("button");
    editButton.innerHTML = "edit";
    editButton.id = "updateButton";
    // new cell
    var editCell = document.createElement("td")
    // append button to cell
    editCell.appendChild(editButton)
    // append cell to row
    row.append(editCell)

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

// delete all entries in table
const deleteTable = (allRows) => {
    // set
    currentDataRow = table.firstElementChild.firstElementChild;
    while (true) {
        if (currentDataRow.nextElementSibling == null) {
            currentDataRow.remove();
            break;
        }
        currentDataRow.nextElementSibling.remove();
    }
};

// submit row POST request, add row
const newRowSubmit = document.getElementById('addGenreForm');
newRowSubmit.addEventListener('submit', (e) => {
    e.preventDefault();
    var req = new XMLHttpRequest();
    var payload = {
        name: null,
        table_name: "genres"
    };
    payload.name = document.getElementById("nameInput").value;

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
                alert(`added genre ${payload.name}`)
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
        onDelete(target)
    };
    if (target.id == "viewMoviesButton") {
        onViewMovies(target);
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
    // append header to body
    document.body.appendChild(updateHeader);

    // starts pointing at first_name field
    var currentElement = updateRow.firstElementChild.nextElementSibling;

    // new form
    updateForm = document.createElement("form");
    // append form to document
    fieldset = document.createElement("fieldset");
    legend = document.createElement("legend");
    legend.innerHTML = "Edit Form";
    fieldset.appendChild(legend);
    updateForm.appendChild(fieldset);
    document.body.appendChild(updateForm);

    // first_name label
    var nameLabel = document.createElement("label");
    nameLabel.innerText = "Genre Name:"
    // name field
    var nameInput = document.createElement("input");
    // first_name field input type
    nameInput.setAttribute("type", "text");
    // name of field
    nameInput.name = "name";
    // name field old value
    nameInput.defaultValue = currentElement.innerText;
    // append
    nameLabel.appendChild(nameInput);
    fieldset.appendChild(nameLabel);

    // submit button
    var updateSubmit = document.createElement("input");
    updateSubmit.setAttribute("type", "submit");
    updateSubmit.value = "submit";
    // append
    fieldset.appendChild(updateSubmit);

    window.scrollTo(0, document.body.scrollHeight);

    updateSubmit.addEventListener('click', (e) => {
        e.preventDefault();

        var req = new XMLHttpRequest();
        var payload = {
            name: nameInput.value,
            genre_id: updateID,
            table_name: "genres"
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
                    alert(`succesfully updated genre name to ${payload.name}`)
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
        genre_id: deleteID,
        table_name: "genres"
    };

    var fkConflict = false;
    // can this genre be deleted?
    req.open("GET", baseURL, true);
    req.setRequestHeader("table_name", "genre_instances", false);    // set what table we are requesting
    req.onload = (e) => {
        if (req.readyState === 4) {
            if (req.status === 200) {
                var response = JSON.parse(req.responseText);
                var allRows = response.rows
                // iterate through all genre instances, check for deleteID in genre_id
                var i;
                for (i = 0; i < allRows.length; i++) {
                    if (allRows[i].genre_id == deleteID) {
                        alert(`Sorry, ${allRows[i].name} cannot be deleted while listed as the genre of ${allRows[i].title}`);
                        fkConflict = true;
                        return;
                    }
                }
                if (!fkConflict) {
                    sendDeleteRequest(deleteID);
                }
            } else {
                console.log(baseURL)
                console.error(req.statusText);
            }
        }
    };
    req.send();
};

sendDeleteRequest = (deleteID) => {
    var del_req = new XMLHttpRequest();
    var payload = {
        genre_id: deleteID,
        table_name: "genres"
    };
    del_req.open("DELETE", baseURL, true);
    del_req.setRequestHeader('Content-Type', 'application/json');
    del_req.onload = (e) => {
        if (del_req.readyState === 4) {
            if (del_req.status === 200) {
                // this is where the magic happens
                var response = JSON.parse(del_req.responseText);
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
    del_req.send(JSON.stringify(payload));
}

onViewMovies = (target) => {
    //             button cell       row        id cell           id value
    var searchID = target.parentNode.parentNode.firstElementChild.innerHTML;
    var name = target.parentNode.parentNode.firstElementChild.nextElementSibling.innerHTML;
    if (searchResultTable != undefined) {
        searchResultTable.remove();
    }
    searchResultTable = document.createElement("table");
    searchHeaderRow = document.createElement("tr");
    searchHeaderRow.style = "font-weight: bold"
    // headers
    makeCell(`Movies with genre ${name}`, searchHeaderRow)
    var req = new XMLHttpRequest();
    req.open("GET", baseURL, true);
    req.setRequestHeader("table_name", "genre_instances", false);    // set what table we are requesting
    req.onload = (e) => {
        if (req.readyState === 4) {
            if (req.status === 200) {

                var response = JSON.parse(req.responseText);
                var all = response.rows
                var i = 0;
                var results = [];
                for (i = 0; i < all.length; i++) {
                    if (all[i].genre_id == searchID) {
                        // make a row for this movie
                        results.push(all[i]);
                    }
                }
                if (results.length == 0) {
                    alert("Sorry, no movies with that genre.")
                    return;
                }
                searchResultTable.appendChild(searchHeaderRow);
                for (i = 0; i < results.length; i++) {
                    // movie data
                    searchResultRow = document.createElement("tr");
                    makeCell(results[i].title, searchResultRow);

                    // append
                    searchResultTable.appendChild(searchResultRow);
                    searchDiv.firstElementChild.firstElementChild.appendChild(searchResultTable);
                }
                window.scrollTo(0, 0);
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
    var req = new XMLHttpRequest;
    req.open("GET", baseURL, true);
    req.setRequestHeader("table_name", "genres", false);    // set what table we are requesting
    req.onload = (e) => {
        if (req.readyState === 4) {
            if (req.status === 200) {
                var response = JSON.parse(req.responseText);
                var all = response.rows
                // check if genre exists
                var j;
                var exists = false;
                for (j = 0; j < all.length; j++) {
                    if (`${all[j].name.toLowerCase()}` == searchInput.value.toLowerCase()) {
                        exists = true;
                    }
                }
                if (exists) {
                    if (searchResultTable != undefined) {
                        searchResultTable.remove();
                    }
                    searchResultTable = document.createElement("table");
                    searchHeaderRow = document.createElement("tr");
                    searchHeaderRow.style = "font-weight: bold;"
                    const searchInput = document.querySelector("#searchInput");
                    makeCell(`Movies with ${searchInput.value} as a genre:`, searchHeaderRow);
                    var new_req = new XMLHttpRequest();
                    new_req.open("GET", baseURL, true);
                    new_req.setRequestHeader("table_name", "genre_instances", false);    // set what table we are requesting
                    new_req.onload = (e) => {
                        if (new_req.readyState === 4) {
                            if (new_req.status === 200) {

                                var response = JSON.parse(new_req.responseText);
                                var genreInstances = response.rows
                                var i = 0;
                                var results = [];
                                for (i = 0; i < genreInstances.length; i++) {
                                    if (genreInstances[i].name.toLowerCase() == searchInput.value.toLowerCase()) {
                                        // make a row for this movie
                                        results.push(genreInstances[i]);
                                    }
                                }
                                if (results.length == 0) {
                                    alert(`Sorry, ${searchInput.value} doesn't seem to be affiliated with any movies.`)
                                }

                                searchResultTable.appendChild(searchHeaderRow);
                                for (i = 0; i < results.length; i++) {
                                    // movie data
                                    searchResultRow = document.createElement("tr");
                                    makeCell(results[i].title, searchResultRow);

                                    // append
                                    searchResultTable.appendChild(searchResultRow);
                                    searchDiv.firstElementChild.firstElementChild.appendChild(searchResultTable)
                                }

                            } else {
                                console.log(baseURL)
                                console.error(req.statusText);
                            }
                        }
                    };
                    new_req.send();
                }
                if (!exists) {
                    alert(`Sorry, ${searchInput.value} does not exist in our database.`)
                }
            } else {
                console.error(req.statusText);
            }
        }
    };
    req.send();

});