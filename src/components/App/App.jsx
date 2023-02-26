import AppHeader from "../App-Header/App-Header.jsx";
import BurgerIngredients from "../Burger-Ingredients/Burger-Ingredients.jsx";
import data from "../../utils/data.js";

import "./App.css";


function App() {

  return (
    <div className="App">
      <AppHeader />
      <BurgerIngredients ingredientslist={data} />
    </div>
  );
}

export default App;
