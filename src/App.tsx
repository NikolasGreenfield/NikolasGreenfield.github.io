import React, { useState } from 'react';
import Page from './components/page/Page'
import './App.scss';

function App() {
  const [color, setColor] = useState<string>('red'); 
  
  return (
  <>
    <Page color="red" setColor={setColor}></Page>
  </>
  );
}

export default App;
