import ReactDOM from "react-dom/client";
import StandardCalculator from "./StandardCalculator";
import "./ScreenSizeStyles.css";
import "./StandardCalculator.css";


const root = ReactDOM.createRoot(document.getElementById('wrapper'));

root.render(<StandardCalculator />)