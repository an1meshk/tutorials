import './App.css';

function App() {
  const RUNTIME_ENV_KEY = window?._env_?.APP_RUNTIME_PROD_KEY 
? window._env_.APP_RUNTIME_PROD_KEY : window?._env_?.APP_RUNTIME_PREPROD_KEY;

  return (
    <div className="App">
      <header className="App-header">
        <p>
          This is runtime env variable from App.js
        </p>
        <h1>{RUNTIME_ENV_KEY}</h1>
        <a
          className="App-link"
          href="https://dev.to/akdevcraft/single-page-app-runtime-environment-variables-10dl"
          target="_blank"
          rel="noopener noreferrer"
        >
          Single Page Environment Variables Blog
        </a>
      </header>
    </div>
  );
}

export default App;
