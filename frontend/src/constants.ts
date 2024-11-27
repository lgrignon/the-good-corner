

// TODO we should be able to use localhost for manual testing and http://back in container
// console.log('CI env var: ' + process.env.CI)
// let BACKEND_URL;
// const CIUrlParam = new URL(document.location.href).searchParams.get('CI')
// if (CIUrlParam) {
//     BACKEND_URL = 'http://back:4000/';
// } else {
    
// }


const BACKEND_URL = 'http://back:4000/';
export { BACKEND_URL };