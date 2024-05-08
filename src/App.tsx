import { useState,useEffect } from "react";
import './App.css'

const COLORS = ['Brown','Green','Purple','Red','White','Yellow']


function App() {

  const [board,setBoard] = useState<string[]>([]);

  const createGrid = () => {
    const colors:string[] = new Array(64) 
      .fill('')
      .map(() => COLORS[Math.floor(Math.random() * COLORS.length)])

    return colors
  }

  useEffect(() => {
    setBoard(createGrid)
  },[])


  return (
    <div className="App">
      <div className="container">    
        {board.map((item,index) => {
          return <div className={item}>{index}</div>
        })}
      </div>
    </div>
  );
}

export default App;
