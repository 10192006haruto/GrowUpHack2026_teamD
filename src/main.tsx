import React from 'react';
import ReactDOM from 'react-dom/client';
import { TextGame } from './TextGame'; // パスはファイル構成に合わせて調整してください

// ViteのデフォルトCSSなどを読み込んでいる場合は、ここでインポートします
// import './index.css'; 

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TextGame />
  </React.StrictMode>
);