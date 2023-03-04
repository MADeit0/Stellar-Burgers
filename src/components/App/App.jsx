import AppHeader from "../App-Header/App-Header.jsx";
import BurgerIngredients from "../Burger-Ingredients/Burger-Ingredients.jsx";
import data from "../../utils/data.js";

import appStyle from "./App.module.css";

function App() {

  return (
    <div className={`${appStyle.container} pt-10 pb-10`}>
      <AppHeader />
      <BurgerIngredients ingredientslist={data} />
    </div>
  );
}

export default App;
