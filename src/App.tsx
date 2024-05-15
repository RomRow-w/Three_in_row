import { useState, useEffect, useCallback } from "react";
import './App.css'

const COLORS = ['Brown','Green','Purple','Red','White','Yellow']


function App() {

  const [board,setBoard] = useState<string[]>([]);

  const createGrid = () => {
    const colors:string[] = new Array(64) 
      .fill('')
      .map(() => COLORS[Math.floor(Math.random() * COLORS.length)]);

    return colors
  }


  const checkColumns = (items:string[]) => {
    for (let i = 0; i <= 8 * 4 - 1; i++) {
      if (!items[i]) continue;

      if (items[i] === items[i + 8] &&
        items[i] === items[i + 8 * 2] &&
        items[i] === items[i + 8 * 3] &&
        items[i] === items[i + 8 * 4]
      ) {
        items[i] = '';
        items[i + 8] = '';
        items[i + 8 * 2] = '';
        items[i + 8 * 3] = '';
        items[i + 8 * 4] = '';
      }
    }

    for (let i = 0; i <= 8 * 5 - 1; i++) {
      if (!items[i]) continue;

      if (items[i] === items[i + 8] &&
        items[i] === items[i + 8 * 2] &&
        items[i] === items[i + 8 * 3]
      ) {
        items[i] = '';
        items[i + 8] = '';
        items[i + 8 * 2] = '';
        items[i + 8 * 3] = '';
      }
    }

    for (let i = 0; i <= 8 * 6 - 1; i++) {
      if (!items[i]) continue;

      if (items[i] === items[i + 8] &&
        items[i] === items[i + 8 * 2]
      ) {
        items[i] = '';
        items[i + 8] = '';
        items[i + 8 * 2] = '';
      }
    }

    return items;
  }

  const checkRows = (items:string[]) => {
    for (let i = 0; i <= 64 - 5; i++) {
      if (!items[i]) continue;

      if ((i % 8) + 5 > 8) continue;

      if (items[i] === items[i + 1] &&
        items[i] === items[i + 2] &&
        items[i] === items[i + 3] &&
        items[i] === items[i + 4] 
      ) {
        items[i] = '';
        items[i + 1] = '';
        items[i + 2] = '';
        items[i + 3] = '';
        items[i + 4] = '';
      }
    }
    
    for (let i = 0; i <= 64 - 4; i++) {
      if (!items[i]) continue;

      if ((i % 8) + 5 > 8) continue;

      if (items[i] === items[i + 1] &&
        items[i] === items[i + 2] &&
        items[i] === items[i + 3]
      ) {
        items[i] = '';
        items[i + 1] = '';
        items[i + 2] = '';
        items[i + 3] = '';
      }
    }

    for (let i = 0; i <= 64 - 3; i++) {
      if (!items[i]) continue;

      if ((i % 8) + 5 > 8) continue;

      if (items[i] === items[i + 1] &&
        items[i] === items[i + 2] 
      ) {
        items[i] = '';
        items[i + 1] = '';
        items[i + 2] = '';
      }
    }
  
    return items;
  }

  const removeChains = useCallback((items:string[]) => {
    while ( true ) {
      let nextItems = [...items];
      nextItems = checkColumns(nextItems);
      nextItems = checkRows(nextItems);
      if (items.every((item,index) => item === nextItems[index])) {
        return nextItems;
      }
      items = [...nextItems];
    }
  },[])

  useEffect(() => {
    let newGrid = createGrid();
    newGrid = removeChains(newGrid);
    setBoard(newGrid);
  },[])


  return (
    <div className="App">
      <div className="container">    
        {board.map((item,index) => {
          return (
            <div 
              className={item}
            >
              {index}
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
