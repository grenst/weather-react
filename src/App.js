import "./App.css";
import Weather from "./Weather";

export default function App() {
  return (
    <div className="App pt-2">
      <div className="container">
        <Weather defaultCity="paris" />
        <br />
        <footer className="fixed-bottom my-1">
          Coded by Makarova Olena{" "}
          <a className="text-warning" href="https://github.com/grenst/weather-react">
            (GitHub source)
          </a>
        </footer>
      </div>
    </div>
  );
}
