import { useState, useEffect, useCallback } from "react";
import "./App.css";
import SideDisplay from "./components/SideDisplay";

const COLORS = ["Brown", "Green", "Purple", "Red", "White", "Yellow"];

function App() {
  const [board, setBoard] = useState<string[]>([]);
  const [currentDragItem, setCurrentDragItem] = useState<number>(-1);
  const [dropLocation, setDropLocation] = useState<number>(-1);
  const [score, setScore] = useState<number>(-1);
  const [turnsRemaining, setTurnsRemaining] = useState<number>(-1);
  const [gameOver, setGameOver] = useState<boolean>(true);

  const createGrid = () => {
    const colors: string[] = new Array(64)
      .fill("")
      .map(() => COLORS[Math.floor(Math.random() * COLORS.length)]);

    return colors;
  };

  const preventDefaultDrag = (e: React.DragEvent) => e.preventDefault();

  const dragStart = (e: React.DragEvent) => {
    setCurrentDragItem(Number(e.currentTarget.getAttribute("data-id")));
  };

  const dragDrop = (e: React.DragEvent) => {
    setDropLocation(Number(e.currentTarget.getAttribute("data-id")));
  };

  const dragEnd = () => {
    const isNextCell =
      dropLocation === currentDragItem - 1 ||
      dropLocation === currentDragItem + 1 ||
      dropLocation === currentDragItem - 8 ||
      dropLocation === currentDragItem + 8;

    const invalidRightEdge =
      currentDragItem % 8 === 7 && dropLocation === currentDragItem + 1;

    const invalidLeftEdge =
      currentDragItem % 8 === 0 && dropLocation === currentDragItem - 1;

    const valid = isNextCell && !invalidRightEdge && !invalidLeftEdge;

    if (valid) {
      let newBoard: string[] = [...board];
      const dragAcc = board[currentDragItem];

      newBoard[currentDragItem] = newBoard[dropLocation];
      newBoard[dropLocation] = dragAcc;

      newBoard = checkColumns(newBoard, true);
      newBoard = checkRows(newBoard, true);

      if (newBoard.filter((x) => !x).length === 0) {
        return;
      } else {
        setBoard(newBoard);
      }

      setTurnsRemaining((prev) => prev - 1);
    }
  };

  const checkColumns = (items: string[], scorable?: boolean) => {
    for (let i = 0; i <= 8 * 4 - 1; i++) {
      if (!items[i]) continue;

      if (
        items[i] === items[i + 8] &&
        items[i] === items[i + 8 * 2] &&
        items[i] === items[i + 8 * 3] &&
        items[i] === items[i + 8 * 4]
      ) {
        items[i] = "";
        items[i + 8] = "";
        items[i + 8 * 2] = "";
        items[i + 8 * 3] = "";
        items[i + 8 * 4] = "";

        if (scorable) setScore((prev) => prev + 5);
      }
    }

    for (let i = 0; i <= 8 * 5 - 1; i++) {
      if (!items[i]) continue;

      if (
        items[i] === items[i + 8] &&
        items[i] === items[i + 8 * 2] &&
        items[i] === items[i + 8 * 3]
      ) {
        items[i] = "";
        items[i + 8] = "";
        items[i + 8 * 2] = "";
        items[i + 8 * 3] = "";

        if (scorable) setScore((prev) => prev + 4);
      }
    }

    for (let i = 0; i <= 8 * 6 - 1; i++) {
      if (!items[i]) continue;

      if (items[i] === items[i + 8] && items[i] === items[i + 8 * 2]) {
        items[i] = "";
        items[i + 8] = "";
        items[i + 8 * 2] = "";

        if (scorable) setScore((prev) => prev + 3);
      }
    }

    return items;
  };

  const checkRows = (items: string[], scorable?: boolean) => {
    for (let i = 0; i <= 64 - 5; i++) {
      if (!items[i]) continue;

      if ((i % 8) + 5 > 8) continue;

      if (
        items[i] === items[i + 1] &&
        items[i] === items[i + 2] &&
        items[i] === items[i + 3] &&
        items[i] === items[i + 4]
      ) {
        items[i] = "";
        items[i + 1] = "";
        items[i + 2] = "";
        items[i + 3] = "";
        items[i + 4] = "";

        if (scorable) setScore((prev) => prev + 5);
      }
    }

    for (let i = 0; i <= 64 - 4; i++) {
      if (!items[i]) continue;

      if ((i % 8) + 4 > 8) continue;

      if (
        items[i] === items[i + 1] &&
        items[i] === items[i + 2] &&
        items[i] === items[i + 3]
      ) {
        items[i] = "";
        items[i + 1] = "";
        items[i + 2] = "";
        items[i + 3] = "";

        if (scorable) setScore((prev) => prev + 4);
      }
    }

    for (let i = 0; i <= 64 - 3; i++) {
      if (!items[i]) continue;

      if ((i % 8) + 3 > 8) continue;

      if (items[i] === items[i + 1] && items[i] === items[i + 2]) {
        items[i] = "";
        items[i + 1] = "";
        items[i + 2] = "";

        if (scorable) setScore((prev) => prev + 3);
      }
    }

    return items;
  };

  const moveDown = (items: string[]) => {
    for (let i = 0; i <= 64; i++) {
      const isFirstRow = i < 8;

      if (isFirstRow && items[i] === "") {
        items[i] = COLORS[Math.floor(Math.random() * COLORS.length)];
      }

      if (items[i + 8] === "") {
        items[i + 8] = items[i];
        items[i] = "";
      }
    }
    return items;
  };

  const removeChains = useCallback((items: string[]) => {
    while (true) {
      let nextItems = [...items];
      nextItems = checkColumns(nextItems);
      nextItems = checkRows(nextItems);
      nextItems = moveDown(nextItems);
      if (items.every((item, index) => item === nextItems[index])) {
        return nextItems;
      }
      items = [...nextItems];
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      let newBoard = [...board];
      newBoard = checkColumns(newBoard, true);
      newBoard = checkRows(newBoard, true);
      newBoard = moveDown(newBoard);

      if (newBoard.every((item, index) => item === board[index])) {
        return;
      } else {
        setBoard(newBoard);
      }
    }, 100);
  }, [board]);

  useEffect(() => {
    let newGrid = createGrid();
    newGrid = removeChains(newGrid);
    setBoard(newGrid);
    setScore(0);
    setTurnsRemaining(20);
    setGameOver(false);
  }, [removeChains, gameOver]);

  return (
    <div className="App">
      <div className="fill"/>
      <div className="container">
        {board.map((item, index) => {
          return (
            <div
              draggable
              data-id={index}
              onDragStart={dragStart}
              onDragOver={preventDefaultDrag}
              onDragEnter={preventDefaultDrag}
              onDragLeave={preventDefaultDrag}
              onDrop={dragDrop}
              onDragEnd={dragEnd}
              className={item}
            >
              {index}
            </div>
          );
        })}
      </div>
      <div className="fill">
        <SideDisplay text='Текущий счет' value={score}></SideDisplay>
        <SideDisplay text='Осталось ходов' value={turnsRemaining}></SideDisplay>
      </div>
    </div>
  );
}

export default App;
