// import React from "react";
import { useState, useEffect, useContext } from "react";


import { SearchContext } from "../App";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

const Home = () => {
  const { searchValue } = useContext(SearchContext)

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Сортировка по категориям и типу
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sortProperty: "rating",
  });
  // useState для пагинации
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setIsLoading(true);
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sortType.sortProperty.replace("-", "");
    const orderBy = sortType.sortProperty.includes("-") ? "asc" : "desc";
    // const search = searchValue ? `&search=${searchValue}` : ''
    const search = ''
    // вся магия фильтрации и сортировки в запросе на backend
    fetch(
      // `https://65ad03c4adbd5aa31bdfec3a.mockapi.io/pizzas-items?page=${currentPage}&${category}&sortBy=${sortBy}&order=${orderBy}${search}`
      `https://65ad03c4adbd5aa31bdfec3a.mockapi.io/pizzas-items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${orderBy}${search}`
    )
      .then((res) => res.json())
      .then((json) => {
        // console.log(json);
        setItems(json);
        // json !== 'Not found' ? setItems(json) : setItems([])
        setIsLoading(false);
      });
    // window.scrollTo(0, 0);
  }, [categoryId, sortType, currentPage]);

  const pizzas = items
    // Фильтрация для статичных данных (items)
    .filter(obj => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase()))
        return true
      else
        return false
    })
    .map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)
  
  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />)

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
          ? skeletons
          // : items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
          : pizzas
        }

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
      <Pagination onChangePage={number => setCurrentPage(number) }/>
    </div>
  );
};

export default Home;
