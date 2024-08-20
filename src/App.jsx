import { useEffect } from "react";
import "./App.css";
import MatchesPage from "./pages/Match/MatchPages";
import { useBoundStore } from "./stores";

function App() {
  const { initializeAuthState } = useBoundStore((state) => state);

  useEffect(() => {
    initializeAuthState();
  }, [initializeAuthState]);

  return (


    <MatchesPage />


  );
}

export default App;
