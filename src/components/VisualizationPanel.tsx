import { useEffect, useState } from "react";

const GRID_ROWS = 20;
const GRID_COLS = 20;

type Cell = {
  row: number;
  col: number;
  isWall: boolean;
  isStart: boolean;
  isEnd: boolean;
};

const VisualizationPanel = () => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [rows, setRows] = useState<number>(GRID_ROWS);
  const [cols, setCols] = useState<number>(GRID_COLS);

  const createGrid = () => {
    const initGrid = [];
    for (let r = 0; r < rows; r++) {
      const row = [];
      for (let c = 0; c < cols; c++) {
        row.push({
          row: r,
          col: c,
          isWall: false,
          isStart: r === 0 && c === 0,
          isEnd: r === GRID_ROWS - 1 && c === GRID_COLS - 1,
        });
      }
      initGrid.push(row);
    }
    return initGrid;
  };
  const [grid, setGrid] = useState<Array<Cell[]>>(createGrid());

  useEffect(() => {
    setGrid(createGrid());
  }, [rows, cols]);

  const handleMouseDown = (row: number, col: number) => {
    setIsMouseDown(true);
    toggleWall(row, col);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!isMouseDown) return;
    toggleWall(row, col);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const toggleWall = (row: number, col: number) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((rowArr) =>
        rowArr.map((cell) => ({ ...cell })),
      );
      if (!newGrid[row][col].isStart && !newGrid[row][col].isEnd) {
        newGrid[row][col].isWall = !newGrid[row][col].isWall;
      }
      return newGrid;
    });
  };

  const handleClear = () => {
    setGrid(createGrid());
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-50"
      onMouseUp={handleMouseUp}
    >
      <h1 className="text-xl font-bold mb-4">Algorithm Visualizer Grid</h1>
      <div
        className="grid gap-[1px] bg-gray-300 border border-gray-300 shadow-lg"
        style={{
          gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))`,
          width: "fit-content",
        }}
      >
        {grid.map((row: Cell[], rowIndex: number) =>
          row.map((cell: Cell, colIndex: number) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
              onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
              className={`
                w-6 h-6 sm:w-8 sm:h-8  /* Responsive cell size */
                cursor-pointer
                ${cell.isStart ? "bg-green-500" : ""}
                ${cell.isEnd ? "bg-red-500" : ""}
                ${cell.isWall ? "bg-slate-800" : "bg-white"}
                hover:bg-blue-200
              `}
            ></div>
          )),
        )}
      </div>

      <p className="mt-4 text-gray-600 text-sm">
        Click and drag to draw walls.
      </p>
    </div>
  );
};

export default VisualizationPanel;
