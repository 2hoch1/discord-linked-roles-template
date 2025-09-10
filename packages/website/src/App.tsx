import { useEffect, useState } from "react";
import Erros from "./responses/Errors";
import Success from "./responses/Success";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);
  const [raw, setRaw] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ok, setOk] = useState(false);

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
        console.log(err.request, err);
        setRaw(err.request || err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <>
        <div>
          <p className="status">Loading...</p>
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
    if (isRaw(raw) && raw !== null && code(raw) !== null) {
      return Success(raw);
    }
  }
}

export default App;
