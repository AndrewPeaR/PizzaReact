import React from "react";
import { useState, useEffect } from "react";

import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
  
    useEffect(() => {
        fetch("https://65ad03c4adbd5aa31bdfec3a.mockapi.io/pizzas-items")
          .then((res) => res.json())
          .then((json) => {
            setItems(json)
            setIsLoading(false);
          })
          window.scrollTo(0, 0)
      }, []);

    return (
    
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
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

        {/* <PizzaBlock title="Мексиканская" price="500" /> */}
      </div>
    </div>
  );
};

export default Home