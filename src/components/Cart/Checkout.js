import classes from './Checkout.module.css';
import { useRef, useState } from 'react';

const isEmpty = (value) => value.trim() !== '';
const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true
  });

  const confirmHandler = (event) => {
    event.preventDefault();

    const nameInputVal = nameInputRef.current.value;
    const streetInputVal = streetInputRef.current.value;
    const postalInputVal = postalInputRef.current.value;
    const cityInputVal = cityInputRef.current.value;

    const isNameValid = isEmpty(nameInputVal);
    const isStreetValid = isEmpty(streetInputVal);
    const isPostalValid = isEmpty(postalInputVal);
    const isCityValid = isEmpty(cityInputVal);

    setFormValidity({
      name: isNameValid,
      street: isStreetValid,
      postal: isPostalValid,
      city: isCityValid
    });

    const formIsValid = isNameValid && isStreetValid && isPostalValid && isCityValid;
    if (!formIsValid) {
      return;
    }

    //Service POST
    props.onPostFormData({
      name: nameInputVal,
      street: streetInputVal,
      postal: postalInputVal,
      city: cityInputVal
    });
  };

  const nameClass = `${classes.control} ${!formValidity.name ? classes.invalid : ''}`;
  const streetClass = `${classes.control} ${!formValidity.street ? classes.invalid : ''}`;
  const postalClass = `${classes.control} ${!formValidity.postal ? classes.invalid : ''}`;
  const cityClass = `${classes.control} ${!formValidity.city ? classes.invalid : ''}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClass}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formValidity.name && <p>Please enter valid name</p>}
      </div>
      <div className={streetClass}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formValidity.street && <p>Please enter valid street</p>}
      </div>
      <div className={postalClass}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInputRef} />
        {!formValidity.postal && <p>Please enter valid postal code</p>}
      </div>
      <div className={cityClass}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formValidity.city && <p>Please enter valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
