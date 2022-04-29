async function getDVD() {
    try {
        const options = {
            method: "GET",
            headers: {
                'Accept': 'application/json'
            }
        };
        const response = await fetch("/get");
        const dvds = await response.json();
        dvds.forEach((dvd) => {
            newDVD(dvd.title, dvd.category, dvd.runtime, dvd.yearrelease, dvd.price);
        });
    } catch (err) {
        console.log(err);
    }
}

getDVD();




