import dynamic from "next/dynamic";

// Use dynamic import to avoid "use client" propagation issues in app directory
const TicTacToe = dynamic(() => import("./TicTacToe"), { ssr: false });

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--background)"
      }}
    >
      <TicTacToe />
    </main>
  );
}
