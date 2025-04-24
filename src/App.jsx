import { useEffect, useState, useCallback } from "react";

const debounce = (callback, delay) => {
  let timeout = 0;
  return (value) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(value);
    }, delay);
  };
};

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  console.log(results);

  const fetchProducts = async (query) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    try {
      const response = await fetch(
        `https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${query}`
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error(error);
    }
  };

  const debouncedFetchProducts = useCallback(debounce(fetchProducts, 500), []);

  useEffect(() => {
    debouncedFetchProducts(query);
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
