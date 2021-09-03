import logo from './logo.svg';
import './App.css';

function App() {
  const RUNTIME_ENV_KEY = window?._env_?.REACT_APP_RUNTIME_PROD_KEY 
? window._env_.REACT_APP_RUNTIME_PROD_KEY : window?._env_?.REACT_APP_RUNTIME_PREPROD_KEY;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This is runtime env variable from App.js
        </p>
        <h1>{RUNTIME_ENV_KEY}</h1>
        <a
          className="App-link"
          href="https://dev.to/an1meshk/react-runtime-variables-49dc"
          target="_blank"
          rel="noopener noreferrer"
        >
          React Runtime Environment Variables Blog
        </a>
      </header>
    </div>
  );
}

export default App;
