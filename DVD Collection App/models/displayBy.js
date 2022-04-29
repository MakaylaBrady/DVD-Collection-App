const displayByElem = document.querySelector('.display-by');
const displayTypeElem = document.querySelector('.display-type');

displayByElem.addEventListener('change', (e) => {
    if (displayByElem.value == "all") {
        if (!displayTypeElem.classList.contains('hidden')) {
            displayTypeElem.classList.add('hidden');
        }
    } else {
        displayTypeElem.classList.remove('hidden');
    }
});

displayTypeElem.addEventListener('keyup', (e) => {
    // grab relevant elems and convert to array obj
    const yearsInputElems = Array.from(document.querySelectorAll('.year-data'));
    const categoryInputElems = Array.from(document.querySelectorAll('.category-data'));
    const searchTerm = displayTypeElem.value.toLowerCase().trim();


    if (displayByElem.value == "category") {
        if (searchTerm) {
            // category filtering
            const notMatchedCategoryElems = categoryInputElems.filter(
                (categoryElem) => { return !categoryElem.value.toLowerCase().includes(searchTerm); }
            );
            notMatchedCategoryElems.forEach((categoryElem) => {
                categoryElem.parentElement.parentElement.classList.add('hidden');
            });
            const matchedCategoryElems = categoryInputElems.filter(
                (categoryElem) => { return categoryElem.value.toLowerCase().includes(searchTerm); }
            );
            matchedCategoryElems.forEach((categoryElem) => {
                categoryElem.parentElement.parentElement.classList.remove('hidden');
            });

        } 
        else {
            // reset data upon no search term
            categoryInputElems.forEach((categoryElem) => { categoryElem.parentElement.parentElement.classList.remove('hidden'); });
        }
    } 
    else {
        if (searchTerm) {
            // year filtering
            const notMatchedYearsElems = yearsInputElems.filter(
                (yearElem) => { return !yearElem.value.includes(searchTerm); }
            );
            notMatchedYearsElems.forEach((yearElem) => {
                yearElem.parentElement.parentElement.classList.add('hidden');
            });
            const matchedYearsElems = yearsInputElems.filter(
                (yearElem) => { return yearElem.value.includes(searchTerm); }
            );
            matchedYearsElems.forEach((yearElem) => {
                yearElem.parentElement.parentElement.classList.remove('hidden');
            });


        } 
        else {
            // reset data upon no search term
            yearsInputElems.forEach((yearElem) => { yearElem.parentElement.parentElement.classList.remove('hidden'); });
        }
    }
});