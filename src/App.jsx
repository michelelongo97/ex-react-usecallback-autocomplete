import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");

  return (
    <div>
      <h1>Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );
}

export default App;
