"use client";
import React, { useState } from "react";

// PUBLIC_INTERFACE
/**
 * Main container component for ColorCraft TicTacToe (two-player mode, win/draw detection, minimalist themed UI)
 */
const BOARD_SIZE = 3;
const EMPTY_BOARD = Array(BOARD_SIZE * BOARD_SIZE).fill(null);

const colors = {
  primary: "#ffffff",
  secondary: "#000000",
  accent: "#2196f3",
};

type Player = "X" | "O";
type CellValue = Player | null;

function getNextPlayer(current: Player): Player {
  return current === "X" ? "O" : "X";
}

// PUBLIC_INTERFACE
function calculateWinner(cells: CellValue[]): Player | "draw" | null {
  const lines = [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diags
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; ++i) {
    const [a, b, c] = lines[i];
    if (
      cells[a] &&
      cells[a] === cells[b] &&
      cells[a] === cells[c]
    ) {
      return cells[a];
    }
  }
  // Draw: No empty cells, no winner
  if (cells.every((cell) => cell)) return "draw";
  return null;
}

// PUBLIC_INTERFACE
const TicTacToe: React.FC = () => {
  const [cells, setCells] = useState<CellValue[]>([...EMPTY_BOARD]);
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  const winner = calculateWinner(cells);
  const isGameOver = winner !== null;

  const handleCellClick = (idx: number) => {
    if (cells[idx] || isGameOver) return;
    const candidateCells = [...cells];
    candidateCells[idx] = xIsNext ? "X" : "O";
    setCells(candidateCells);
    setXIsNext((prev) => !prev);
  };

  const handleRestart = () => {
    setCells([...EMPTY_BOARD]);
    setXIsNext(true);
  };

  let statusMessage: React.ReactNode;
  if (winner === "X" || winner === "O") {
    statusMessage = (
      <span style={{ color: colors.accent, fontWeight: 600 }}>
        Player {winner} wins!
      </span>
    );
  } else if (winner === "draw") {
    statusMessage = (
      <span style={{ color: colors.accent, fontWeight: 600 }}>
        It&#39;s a draw!
      </span>
    );
  } else {
    statusMessage = (
      <span>
        Turn: <span style={{ color: colors.accent, fontWeight: 600 }}>Player {xIsNext ? "X" : "O"}</span>
      </span>
    );
  }

  // Styles (inline to ensure color scheme if Tailwind is unavailable)
  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${BOARD_SIZE}, 60px)`,
    gridTemplateRows: `repeat(${BOARD_SIZE}, 60px)`,
    gap: "8px",
    background: colors.primary,
    borderRadius: 12,
    margin: "0 auto",
    boxShadow: "0 1px 6px #ddd",
  };
  const cellStyle = (highlight?: boolean): React.CSSProperties => ({
    width: "60px",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2rem",
    cursor: isGameOver ? "default" : "pointer",
    background: colors.primary,
    color: highlight ? colors.accent : colors.secondary,
    border: `1.5px solid #e0e0e0`,
    borderRadius: "7px",
    transition: "background 0.15s",
    fontWeight: 500,
    userSelect: "none",
  });
  const boardWrapper: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    minHeight: "60vh",
    alignItems: "center",
    justifyContent: "center",
    background: colors.primary,
    borderRadius: 18,
    boxShadow: "0 3px 16px #ededed66",
    padding: "36px 26px 28px 26px",
    margin: "24px auto",
    minWidth: 260,
    maxWidth: 400,
  };
  const statusStyle: React.CSSProperties = {
    marginBottom: "36px",
    fontSize: "1.2rem",
    letterSpacing: 0.2,
    color: colors.secondary,
    textAlign: "center",
    minHeight: "2.3em",
  };
  const buttonStyle: React.CSSProperties = {
    marginTop: "36px",
    padding: "12px 30px",
    borderRadius: "8px",
    border: "none",
    background: colors.accent,
    color: "#fff",
    fontWeight: 600,
    BoxShadow: "0 1px 8px #2196f333",
    fontSize: "1.08rem",
    cursor: "pointer",
    outline: "none",
    transition: "background .19s",
    letterSpacing: 0.4,
  };

  return (
    <div style={boardWrapper}>
      <div style={statusStyle} aria-live="polite">
        {statusMessage}
      </div>
      <div style={gridStyle} role="grid" aria-label="Tic Tac Toe Board">
        {cells.map((val, idx) => (
          <button
            key={idx}
            style={cellStyle(!!val)}
            onClick={() => handleCellClick(idx)}
            disabled={!!val || isGameOver}
            aria-label={`Cell ${idx + 1}, ${val ? val : "empty"}`}
            role="gridcell"
          >
            {val}
          </button>
        ))}
      </div>
      <button
        style={buttonStyle}
        onClick={handleRestart}
        aria-label="Restart game"
      >
        Restart
      </button>
    </div>
  );
};

export default TicTacToe;
