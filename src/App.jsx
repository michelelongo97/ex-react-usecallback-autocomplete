import { useEffect, useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  console.log(results);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    fetch(
      `https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${query}`
    )
      .then((res) => res.json())
      .then((data) => setResults(data))
      .catch((error) => console.error(error));
  }, [query]);

  return (
    <div>
      <h1>Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      {results.length > 0 && (
        <div>
          {results.map((result) => (
            <p key={result.id}>
              <h2>{result.name}</h2>
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
