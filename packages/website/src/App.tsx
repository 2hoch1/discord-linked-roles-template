import { useEffect, useState } from "react";
import Erros from "./responses/Errors";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);
  const [raw, setRaw] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ok, setOk] = useState(null);

  type HasStatus = { status?: number };

  const code = <T extends HasStatus>(raw: T): number | null => {
    return raw?.status ?? null;
  };

  const isOk = (res: { status: number; statusText: string }): boolean => {
    return (res.status >= 200 && res.status < 300) || res.statusText === "OK";
  };

  const isRaw = (raw: any): boolean | null => {
    return (
      (raw !== null && typeof raw === "object" && !Array.isArray(raw)) || null
    );
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/")
      .then((res) => {
        console.log(res);
        setRaw(res);
        setOk(isOk(res));
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.request || err);
        setRaw(err.request || err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <>
        <div>
          <p>Loading...</p>
        </div>
      </>
    );
  }

  if (error) {
    if (isRaw(raw) && raw !== null && code(raw) !== null) {
      return Erros(raw);
    }
  }

  if (ok) {
    return (
      <>
        <div>
          <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
            <img src={viteLogo} className="logo vite" alt="Vite logo" />
          </a>
        </div>
        <h1>{code(raw)}</h1>
        <p className="status-code">{JSON.stringify(data, null, 2)}</p>
      </>
    );
  }
}

export default App;
