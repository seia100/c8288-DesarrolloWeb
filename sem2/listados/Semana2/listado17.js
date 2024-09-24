async function fetchData(url) {
    try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.error(`Error : ${error}`);
    }
}

fetchData("https://jsonplaceholder.typicode.com/users");

