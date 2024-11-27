
let BACKEND_URL;
if (process.env.CI) {
    BACKEND_URL = 'http://back:4000/';
} else {
    BACKEND_URL = 'http://localhost:4000/';
}


export { BACKEND_URL };