function fetchData(url) {
    fetch(url)
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch((error) => {
            console.error(`Error : ${error}`);
        });
}

fetchData("https://jsonplaceholder.typicode.com/users");

