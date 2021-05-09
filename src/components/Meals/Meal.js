import React, { useState } from 'react';
import classes from './Meal.module.css';
import MealItem from './MealItem';
import { useEffect } from 'react';

const Meal = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState();
    const [serviceError, setServiceError] = useState();

    useEffect(() => {
        const fetchMeals = async () => {
            setIsLoading(true);
            const response = await fetch('https://food-delivery-fa2bb-default-rtdb.firebaseio.com/meals.json');
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const responseData = await response.json();
            // console.log(responseData);
            const loadedMeals = [];
            for (let i in responseData) {
                loadedMeals.push({
                    id: i,
                    name: responseData[i].name,
                    description: responseData[i].description,
                    price: responseData[i].price
                });
            }
            // console.log(loadedMeals);
            setMeals(loadedMeals);
            setIsLoading(false);
        }
        fetchMeals().catch((error) => {
            setIsLoading(false);
            setServiceError(error.message);
        });
    }, []);

    const mealList = meals.map(e => {
        return (
            <MealItem
                key={e.id}
                id={e.id}
                name={e.name}
                description={e.description}
                price={e.price} />
        )
    });

    return <section className={classes.meals}>
        <ul>
            {isLoading && <p style={{ textAlign: 'center' }}>Loading...</p>}
            {!isLoading && serviceError}
            {!isLoading && mealList}
        </ul>
    </section>

};

export default Meal;