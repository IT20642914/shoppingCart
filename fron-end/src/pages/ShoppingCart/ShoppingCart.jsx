// ShoppingCart.js
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShoppingCartStep from '../../components/ShoppingCartStep/ShoppingCartStep';
import ShippingInfoStep from '../../components/ShippingInfoStep/ShippingInfoStep';
import PaymentDetailsStep from '../../components/PaymentDetails/PaymentDetails';
import Styles from './ShoppingCart.module.scss';
import {cartItems} from '../../utilities/index';

const ShoppingCart = () => {

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [cartItemList, setCartItemsList] = React.useState(cartItems);
  const steps = [
    { label: 'Shopping Cart', component: ShoppingCartStep },
    { label: 'Shipping Info', component: ShippingInfoStep },
    { label: 'Payment Details', component: PaymentDetailsStep },
  ];
  

  const totalSteps = () => steps.length;

  const completedSteps = () => Object.keys(completed).length;

  const isLastStep = () => activeStep === totalSteps() - 1;

  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleNext = () => {
    const newCompleted = {
      ...completed,
      [activeStep]: true,
    };
    setCompleted(newCompleted);
  
    if (isLastStep() && allStepsCompleted()) {
      // Handle the case where all steps are completed
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  

  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleStep = (step) => () => setActiveStep(step);

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const onUpdateCart = (itemId, quantity) => {
    const updatedCartItems = cartItemList.filter(item => {
      if (item.id === itemId) {
        return quantity > 0; // Only include the item if the new quantity is greater than 0
      }
      return true; // Include all other items that were not updated
    }).map(item => {
      if (item.id === itemId) {
        return { ...item, quantity }; // Update the quantity for the item being changed
      }
      return item; // Return all other items unchanged
    });
  
    setCartItemsList(updatedCartItems); // Update the state with the new cart items list
  };
  
  return (
  <section className={Styles.Container}>
  <ShoppingCartStep
  cartItemList={cartItemList}
  onUpdateCart={onUpdateCart}
  />

    </section>
  );
};

export default ShoppingCart;
