import React, {Suspense} from "react";
import Head from './components/header';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          我是app主页
        </p>
        <Head/>
      </header>
    </div>
  );
}

export default App;
