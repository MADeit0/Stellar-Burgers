import AppHeader from "../App-Header/App-Header.jsx";
import BurgerIngredients from "../Burger-Ingredients/Burger-Ingredients.jsx";
import BurgerConstructor from "../Burger-Constructor/Burger-Constructor.jsx";
import data from "../../utils/data.js";
import appStyle from "./App.module.css";

function App() {
  return (
    <div className={`${appStyle.container} pb-10`}>
      <AppHeader />
      <main className={appStyle.section}>
        <BurgerIngredients ingredientslist={data} />
        <BurgerConstructor ingredientslist={data} menu="bun" />
      </main>
    </div>
  );
}

export default App;
