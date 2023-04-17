import React, { useEffect, useState, useCallback } from "react";
import styles from "./AvailableMeals.module.css";
import Meal from "./Meal";
import Card from "../UI/Card";

export default function AvailableMeals() {
  const [isLoading, setIsloading] = useState(true);
  const [meals, setMeals] = useState([]);

  const fetchMeals = useCallback(async () => {
    const response = await fetch(
      "https://react-http-b0b4e-default-rtdb.firebaseio.com/meals.json"
    );
    const result = await response.json();

    setMeals(Object.entries(result)[0][1]);
    setIsloading(false);
  }, []);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  const mealsList = isLoading ? (
    <p>Loading...</p>
  ) : meals.length > 0 ? (
    meals.map((meal) => {
      return <Meal key={meal.id} meal={meal} />;
    })
  ) : (
    <p>No meals found!</p>
  );

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
}
