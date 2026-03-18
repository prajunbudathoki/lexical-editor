import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <h1>Lexical Editor</h1>
    </div>
  );
}
