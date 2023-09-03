import ingredientsStyle from "./BurgerIngredients.module.css";
import { ingredientsMenu } from "../../utils/constants";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsBoard from "../IngredientsBoard/IngredientsBoard";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { useAppSelector } from "../../hooks/hook";

const { BUN, SAUCE, MAIN } = ingredientsMenu;
const options = {
  threshold: 0.55,
  rootMargin: "0% 0% -60% 0%",
};

const BurgerIngredients = () => {
  const [current, setCurrent] = useState(BUN);
  const loading = useAppSelector(
    ({ burgerIngredients }) => burgerIngredients.loading
  );
  const isBun = useAppSelector(
    ({ burgerConstructor }) => burgerConstructor.isBun
  );

  const { ref: refBun, inView: viewBun, entry: bunEntry } = useInView(options);
  const { ref: refSauce, inView: viewSauce, entry: sauceEntry } = useInView(
    options
  );
  const { ref: refMain, inView: viewMain, entry: mainEntry } = useInView(
    options
  );
  /**Обрабатывает изменение текущей вкладки и прокручивает видимый элемент.
   *
   * @function onTabChange
   * @param {string} menu строка с именем на которое будет происходить переключение вкладки
   * @param {IntersectionObserverEntry | undefined} entry  объект, содержащий информацию
   * о пересечении элемента с наблюдателем пересечений.
   * @returns {void}
   */
  const onTabChange = (
    menu: string,
    entry: IntersectionObserverEntry | undefined
  ): void => {
    if (entry) {
      setCurrent(menu);
      const target = entry.target;
      target.scrollIntoView({ behavior: "smooth" });
    }
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
          value={BUN}
          active={current === BUN}
          onClick={(): void => {
            onTabChange(BUN, bunEntry);
          }}
        >
          Булки
        </Tab>
        <Tab
          value={SAUCE}
          active={current === SAUCE}
          onClick={(): void => {
            onTabChange(SAUCE, sauceEntry);
          }}
        >
          Соусы
        </Tab>
        <Tab
          value={MAIN}
          active={current === MAIN}
          onClick={(): void => {
            onTabChange(MAIN, mainEntry);
          }}
        >
          Начинки
        </Tab>
      </div>

      {loading === "pending" && (
        <p className="text text_type_main-medium m-0 pb-6">
          Настраиваем антенну...
        </p>
      )}

      {loading === "succeeded" && (
        <div className={`${ingredientsStyle.scroll} mt-10`}>
          <IngredientsBoard
            ref={refBun}
            title="Булки"
            menu={BUN}
            isView={viewBun}
            setState={setCurrent}
            active={true}
          />
          <IngredientsBoard
            ref={refSauce}
            title="Соусы"
            menu={SAUCE}
            isView={viewSauce}
            setState={setCurrent}
            active={isBun}
          />
          <IngredientsBoard
            ref={refMain}
            title="Начинки"
            menu={MAIN}
            isView={viewMain}
            setState={setCurrent}
            active={isBun}
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
