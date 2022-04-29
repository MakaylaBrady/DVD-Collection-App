const addButton = document.querySelector('#add');
const addSection = document.querySelector('.add-section');
const titleInputElem = document.querySelector('.title-input');
const categoryInputElem = document.querySelector('.category-input');
const yearInputElem = document.querySelector('.year-input');
const priceInputElem = document.querySelector('.price-input');
const runtimeInputElem = document.querySelector('.runtime-input');
const addInputButton = document.querySelector('.add-button');

addButton.addEventListener('click', (e) => {
    if (addSection.classList.contains('hidden')) {
        addSection.classList.replace('hidden', 'flex');
        addButton.setAttribute('value', 'Close');
    } else {
        addSection.classList.replace('flex', 'hidden');
        addButton.setAttribute('value', 'Add');
    }
});

function dvdExistsOnPage(newTitle) {
    const dvds = getAllDVDs();
    for (let index = 0; index < dvds.length; index++) {
        if (dvds[index].title == newTitle) {
            return true;
        }
    }
    return false;
}

addInputButton.addEventListener('click', async (e) => {
    e.preventDefault();

    if (checkEmpty([titleInputElem, categoryInputElem, runtimeInputElem, yearInputElem, priceInputElem])) {
        return;
    }

    if (!dvdExistsOnPage(titleInputElem.value)) {
        newDVD(titleInputElem.value, categoryInputElem.value, runtimeInputElem.value, yearInputElem.value, priceInputElem.value);
    }

    // add to database via fetch POST request
    const data = {
        title: titleInputElem.value,
        category: categoryInputElem.value,
        year: yearInputElem.value,
        runtime: runtimeInputElem.value,
        price: priceInputElem.value
    };
    try {
        const options = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        };
        await fetch('/add', options);
    } catch (err) {
        console.log(err);
    }

});
