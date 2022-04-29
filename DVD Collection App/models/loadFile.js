const loadFileElem = document.querySelector('.load-file');

loadFileElem.addEventListener('change', () => {
    // create a reader object
    const reader = new FileReader();

    // do something once file has been read
    reader.onload = function (e) {
        // assign file content to a var
        const fileContent = e.target.result;

        // split the file content by new line
        const dvds = fileContent.split('\n');

        // loop over each dvd content
        dvds.forEach(async (dvd) => {
            // prepare dvd data into vars
            const titleData = dvd.split(',')[0].trim();
            const categoryData = dvd.split(',')[1].trim();
            const runtimeData = dvd.split(',')[2].trim();
            const yearData = dvd.split(',')[3].trim();
            const priceData = dvd.split(',')[4].trim();

            if (!dvdExistsOnPage(titleData)) {
                newDVD(titleData, categoryData, runtimeData, yearData, priceData);
            }

            // add to database via fetch POST request
            const data = {
                title: titleData,
                category: categoryData,
                year: yearData,
                runtime: runtimeData,
                price: priceData
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
    };

    // read a file
    reader.readAsText(loadFileElem.files[0]);
});