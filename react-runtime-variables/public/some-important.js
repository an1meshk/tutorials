const RUNTIME_ENV_KEY = window?._env_?.REACT_APP_RUNTIME_PROD_KEY 
? window._env_.REACT_APP_RUNTIME_PROD_KEY : window?._env_?.REACT_APP_RUNTIME_PREPROD_KEY;

console.log("This is runtime env variable from some-important.js: ",RUNTIME_ENV_KEY)