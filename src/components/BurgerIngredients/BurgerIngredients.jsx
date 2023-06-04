import ingredientsStyle from "./BurgerIngredients.module.css";
import { ingredientsMenu } from "../../utils/constants";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsBoard from "../IngredientsBoard/IngredientsBoard.jsx";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredientsDetails } from "../../store/burgerIngredients/burgerIngredientsSlice";

const { bun, sauce, main } = ingredientsMenu;
const options = {
  threshold: 0.55,
  rootMargin: "0% 0% -60% 0%",
};

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(bun);
  const { loading } = useSelector(({ burgerIngredients }) => burgerIngredients);

  const { ref: refBun, inView: viewBun, entry: bunEntry } = useInView(options);
  const {
    ref: refSauce,
    inView: viewSauce,
    entry: sauceEntry,
  } = useInView(options);
  const {
    ref: refMain,
    inView: viewMain,
    entry: mainEntry,
  } = useInView(options);

  useEffect(() => {
    dispatch(fetchIngredientsDetails());
  }, [dispatch]);

  const onTabChange = (menu, entry) => {
    setCurrent(menu);
    entry.target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className={`${ingredientsStyle.board} pt-10`}
      aria-label="ингредиенты"
    >
      <h1 className="text text_text text_type_main-large pb-5">
        Соберите бургер
      </h1>
      <div className={ingredientsStyle.tabs}>
        <Tab
          value={bun}
          active={current === bun}
          onClick={() => {
            onTabChange(bun, bunEntry);
          }}
        >
          Булки
        </Tab>
        <Tab
          value={sauce}
          active={current === sauce}
          onClick={() => {
            onTabChange(sauce, sauceEntry);
          }}
        >
          Соусы
        </Tab>
        <Tab
          value={main}
          active={current === main}
          onClick={() => {
            onTabChange(main, mainEntry);
          }}
        >
          Начинки
        </Tab>
      </div>

      {loading === "pending" && (
        <p className="text text_type_main-medium m-0 pb-6">
          Настраиваем антэну...
        </p>
      )}

      {loading === "succeeded" && (
        <div className={`${ingredientsStyle.scroll} mt-10`}>
          <IngredientsBoard
            ref={refBun}
            title="Булки"
            menu={bun}
            isView={viewBun}
            setState={setCurrent}
          />
          <IngredientsBoard
            ref={refSauce}
            title="Соусы"
            menu={sauce}
            isView={viewSauce}
            setState={setCurrent}
          />
          <IngredientsBoard
            ref={refMain}
            title="Начинки"
            menu={main}
            isView={viewMain}
            setState={setCurrent}
          />
        </div>
      )}

      {loading === "failed" && (
        <p className="text text_type_main-medium m-0 pb-6">
          Упс... Что-то сломалось.
        </p>
      )}
    </section>
  );
};

export default BurgerIngredients;
