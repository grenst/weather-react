import "./App.css";
import Weather from "./Weather";

export default function App() {
  return (
    <div className="App pt-2">
      <div className="container">
        <Weather defaultCity="Einsiedeln" />
        <br />
        <footer className="fixed-bottom my-2">
          Coded by Makarova Olena
          <span className="text-warning" herf="https://github.com/grenst/weather-react">
            (GitHub source)
          </span>
        </footer>
      </div>
    </div>
  );
}
