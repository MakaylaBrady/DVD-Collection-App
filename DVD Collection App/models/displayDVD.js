const tableElem = document.querySelector('table');

// sets disabled attribute on each input elem inside inputElems array
function setDisabledAttr(inputElems) {
    inputElems.forEach(inputElem => {
        inputElem.setAttribute("disabled", "disabled");
    });
}

// removes disabled attribute from each input elem inside inputElems array
function removeDisabledAttr(inputElems) {
    inputElems.forEach(inputElem => {
        inputElem.removeAttribute('disabled');
    });
}

// adds input style classes to each input elem inside inputElems array
function setInputClasses(inputElems) {
    inputElems.forEach(inputElem => {
        inputElem.classList = "text-center bg-transparent font-medium";
    });
}

// returns true if an input field is empty inside inputElems
function checkEmpty(inputElems) {
    for (let index = 0; index < inputElems.length; index++) {
        const inputElem = inputElems[index];
        if (inputElem.value == "") {
            inputElem.focus();
            return true;
        }
    }
};

// adds outline class from each input elem inside inputElems array
function addOutline(inputElems) {
    for (let index = 0; index < inputElems.length; index++) {
        const inputElem = inputElems[index];
        inputElem.classList.add('edit-outline');
    }
}

// removes outline class from each input elem inside inputElems array
function removeOutline(inputElems) {
    for (let index = 0; index < inputElems.length; index++) {
        const inputElem = inputElems[index];
        inputElem.classList.remove('edit-outline');
    }
}

// returns an array containing all the dvds currently loaded on page
function getAllDVDs() {
    const dvds = []; // [{}, {}]
    const dvdsElems = Array.from(document.querySelectorAll('.dvd'));
    dvdsElems.forEach(tableRow => {
        const dvd = {};
        tableRow.childNodes.forEach(tableData => {
            const dataElem = tableData.childNodes[0];

            // title assignment
            if (dataElem.classList.contains('title-data')) {
                dvd.title = dataElem.value;

                // year assignment
            } else if (dataElem.classList.contains('year-data')) {
                dvd.year = dataElem.value;

                // category assignment
            } else if (dataElem.classList.contains('category-data')) {
                dvd.category = dataElem.value;

                // runtime assignment
            } else if (dataElem.classList.contains('runtime-data')) {
                dvd.runtime = dataElem.value;

                // price assignment
            } else if (dataElem.classList.contains('price-data')) {
                dvd.price = dataElem.value;
            }
        });
        dvds.push(dvd);
    });
    return dvds;
}

// returns an array of input elements as per count
function createInputElems(count) {
    const inputs = [];
    for (let index = 0; index < count; index++) {
        inputs.push(document.createElement('input'));
    }
    return inputs;
}

// returns an array of table data elements as per count
function createDataElems(count) {
    const dataElems = [];
    for (let index = 0; index < count; index++) {
        dataElems.push(document.createElement('td'));
    }
    return dataElems;
}

// creates and displays a dvd on the page
function newDVD(title, category, runtime, year, price) {
    const tableRow = document.createElement('tr');
    tableRow.classList.add('dvd');

    // create td
    const [titleData, categoryData, runtimeData, yearData, priceData, buttonData] = createDataElems(6);
    const [titleInput, categoryInput, runtimeInput, yearInput, priceInput] = createInputElems(5);

    const inputElemsArr = [titleInput, categoryInput, runtimeInput, yearInput, priceInput];


    // set attributes and classes for inputs
    setDisabledAttr(inputElemsArr);
    setInputClasses(inputElemsArr);

    // set dvd content to inputs
    titleInput.value = title;
    categoryInput.value = category;
    runtimeInput.value = runtime;
    yearInput.value = year;
    priceInput.value = price;

    // assign classes for grabbing everything
    titleInput.classList.add('title-data');
    runtimeInput.classList.add('runtime-data');
    priceInput.classList.add('price-data');

    // assign classes for filteration 
    yearInput.classList.add('year-data');
    categoryInput.classList.add('category-data');

    const buttonDiv = document.createElement('div');
    const editButton = document.createElement('button');
    const removeButton = document.createElement('button');

    editButton.innerText = 'Edit';
    removeButton.innerText = 'Remove';

    // buttons classes
    buttonDiv.classList = "pl-2 space-x-1 text-left flex";
    editButton.classList = "bg-[#444444] hover:bg-[#757575] text-gray-300 px-4 py-1 rounded-sm hover:cursor-pointer";
    removeButton.classList = "bg-[#444444] hover:bg-[#757575] text-gray-300 px-4 py-1 rounded-sm hover:cursor-pointer";
    editButton.addEventListener('click', async (e) => {
        e.preventDefault();
        if (editButton.innerText == "Edit") {
            editButton.innerText = "Save";
            removeDisabledAttr(inputElemsArr);
            addOutline(inputElemsArr);

        } 
        else {
            if (checkEmpty(inputElemsArr)) {
                return;
            }

            editButton.innerText = "Edit";
            setDisabledAttr(inputElemsArr);
            removeOutline(inputElemsArr);

            // update database via fetch PUT request
            const data = {
                title: titleInput.value,
                category: categoryInput.value,
                year: yearInput.value,
                runtime: runtimeInput.value,
                price: priceInput.value
            };
            try {
                const options = {
                    method: "PUT",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json"
                    }
                };
                await fetch('/update', options);
            } catch (err) {
                console.log(err);
            }

            // send latest page data to sync api
            const latestDvds = getAllDVDs();
            try {
                const options = {
                    method: "PUT",
                    body: JSON.stringify(latestDvds),
                    headers: {
                        "Content-Type": "application/json"
                    }
                };
                await fetch('/sync', options);
            } catch (err) {
                console.log(err);
            }
        }
    });

    // adds remove button functionality
    removeButton.addEventListener('click', async (e) => {
        e.preventDefault();
        console.log("Deleting from page...");
        tableRow.innerHTML = "";

        const data = {
            title: titleInput.value
        };
        try {
            const options = {
                method: "DELETE",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            };
            await fetch('/delete', options);
        } catch (err) {
            console.log(err);
        }
    });

    // add buttons to buttons div
    buttonDiv.appendChild(editButton);
    buttonDiv.appendChild(removeButton);

    // append input elems into td elems
    titleData.appendChild(titleInput);
    categoryData.appendChild(categoryInput);
    runtimeData.appendChild(runtimeInput);
    yearData.appendChild(yearInput);
    priceData.appendChild(priceInput);
    buttonData.appendChild(buttonDiv);

    // append td elems into tr elems
    tableRow.appendChild(titleData);
    tableRow.appendChild(categoryData);
    tableRow.appendChild(runtimeData);
    tableRow.appendChild(yearData);
    tableRow.appendChild(priceData);
    tableRow.appendChild(buttonData);

    tableElem.appendChild(tableRow);
}
