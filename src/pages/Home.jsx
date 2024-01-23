import React from "react";
import { useState, useEffect } from "react";

import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sortProperty: "rating",
  });

  useEffect(() => {
    setIsLoading(true);
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sortType.sortProperty.replace("-", "");
    const orderBy = sortType.sortProperty.includes("-") ? "asc" : "desc";
    // вся магия фильтрации и сортировки в запросе на backend
    fetch(
      `https://65ad03c4adbd5aa31bdfec3a.mockapi.io/pizzas-items?${category}&sortBy=${sortBy}&order=${orderBy}`
    )
      .then((res) => res.json())
      .then((json) => {
        // console.log(json);
        setItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(index) => setCategoryId(index)}
        />
        <Sort
          value={sortType}
          onChangeSort={(objSort) => setSortType(objSort)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}

        {/* {items.map((pizza) => isLoading ? <Skeleton /> : (
            <PizzaBlock key={pizza.id} {...pizza} />
            // <PizzaBlock
            //   title={pizza.title}
            //   price={pizza.price}
            //   imageUrl={pizza.imageUrl}
            //   sizes={pizza.sizes}
            //   types={pizza.types}
            // />
          ))} */}
      </div>
    </div>
  );
};

export default Home;
