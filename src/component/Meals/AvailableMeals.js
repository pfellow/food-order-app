import React, { useEffect, useState } from "react";
import styles from "./AvailableMeals.module.css";
import Meal from "./Meal";
import Card from "../UI/Card";

export default function AvailableMeals() {
  const [isLoading, setIsloading] = useState(true);
  const [meals, setMeals] = useState([]);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-http-b0b4e-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const result = await response.json();

      setMeals(Object.entries(result)[0][1]);
      setIsloading(false);
    };

    fetchMeals().catch((err) => {
      setIsloading(false);
      setHttpError(err.message);
    });
  }, []);

  let mealsList = <p>Loading...</p>;

  if (httpError) {
    mealsList = <p>{httpError}</p>;
  }
  if (!isLoading && !httpError) {
    mealsList = meals.map((meal) => {
      return <Meal key={meal.id} meal={meal} />;
    });
  }

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
}
