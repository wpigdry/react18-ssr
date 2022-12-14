import React, {Suspense} from "react";
import Head from './components/header';
import HighLight from './components/highLight';
import HookDiy from './components/hookDiy';

import './app.css';

function App() {
  return (
    <div className="container">
      <header className="App-header">
        <p>
          我是app主页
        </p>
        <Head/>
      </header>
      <HighLight matching="我是谁" text="三国杀开打折扣我是谁如果是公司过生日爱人过生日GV搜狗输入法，格式GV输入是否, 人参果树我是谁如果十个人"/>
      <HookDiy/>

      <div className="footer">
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">备案号</a>
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">京ICP备2021033668号-1</a>
    </div>
    </div>
  );
}

export default App;
