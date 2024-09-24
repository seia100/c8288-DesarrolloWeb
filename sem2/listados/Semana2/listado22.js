import fetch from "node-fetch";

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
        throw new Error(`Error : ${error}`);
    }
};

const routeHello = () => "Hello World!";

const routeAPINames = async () => {
    const url = "https://jsonplaceholder.typicode.com/users";
    let data;
    try {
        data = await fetchData(url);
    } catch (err) {
        return err.message;
    }
    const names = data
        .map((item) => `id: ${item.id}, name: ${item.name}`)
        .join("<br>");
    return names;
};

export { routeHello, routeAPINames };

