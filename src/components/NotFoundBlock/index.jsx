import React from "react";

import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
    <h1>
      <span>😢</span>
      <br />
      Ничего не найдено
    </h1>
    <p className={ styles.description }>Данная страница не найдена</p>
    </div>
  );
};

export default NotFoundBlock;
