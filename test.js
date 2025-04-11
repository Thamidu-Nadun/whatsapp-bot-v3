const axios = require('axios'); // Make sure axios is installed via npm

const query = "mountains";
const accessKey = "IV1oMunsUff0vfH4bhmjs-6dw758rnTH4FJYaBtkFWE"; // Get from Unsplash developer dashboard

axios.get(`https://api.unsplash.com/search/photos`, {
    params: {
        query: query,
        per_page: 5
    },
    headers: {
        Authorization: `Client-ID ${accessKey}`
    }
})
    .then(response => {
        const imageUrls = response.data.results.map(photo => photo.urls.small); // or .regular / .full
        console.log(imageUrls); // array of image URLs
    })
    .catch(error => {
        console.error("Error fetching images:", error);
    });
