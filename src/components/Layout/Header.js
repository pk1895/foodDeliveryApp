import React from 'react';
import mealImg from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderButton from './HeaderCartButton';

const Header = (props) => {
    return (
        <React.Fragment>
            <header className={classes.header}>
                <h1>My Food App</h1>
                <HeaderButton onShowModal={props.onShowModal}/>
            </header>
            <div className={classes['main-image']}>
                <img src={mealImg} alt='meal App'/>
            </div>
        </React.Fragment>
    );
} 

export default Header;