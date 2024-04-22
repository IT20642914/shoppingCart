import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShoppingCartStep from '../../components/ShoppingCartStep/ShoppingCartStep';
import ShippingInfoStep from '../../components/ShippingInfoStep/ShippingInfoStep';
import PaymentDetailsStep from '../../components/PaymentDetails/PaymentDetails';
import Styles from './ShoppingCart.module.scss';
import { cartItems } from '../../utilities/index';
import ShippingDetailsFrom from '../../components/ShippingDetailsFrom/ShippingDetailsFrom';
const ShoppingCart = () => {

  const SHIPPING_FORM_INITIAL_STATE = {
    fullName: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
    email: { value: "", isRequired: true, disable: false, readonly: false, validator: "email", error: "", },
    addressLine1: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
    addressLine2: { value: "", isRequired: false, disable: false, readonly: false, validator: "text", error: "", },
    city: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
    postalCode: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
    country: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
    phoneNumber: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
  };
  const INITIAL_SORT_META = {
    field: "",
    asc: false,
  }
  const [shippingData, setShippingData] = useState(SHIPPING_FORM_INITIAL_STATE);
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [cartItemList, setCartItemsList] = useState(cartItems);
 
  const handleNext = () => {
    const newCompleted = { ...completed, [activeStep]: true };
    setCompleted(newCompleted);
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => setActiveStep(prevActiveStep => prevActiveStep - 1);

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const onUpdateCart = (itemId, quantity) => {
    const updatedCartItems = cartItemList.map(item => (item.id === itemId ? { ...item, quantity } : item));
    setCartItemsList(updatedCartItems);
  };
  const steps = [
    { label: 'Shopping Cart', component: <ShoppingCartStep cartItemList={cartItemList} onUpdateCart={onUpdateCart} /> },
    { label: 'Shipping Info', component: <ShippingDetailsFrom shippingData={shippingData} /> },
    { label: 'Payment Details', component: <PaymentDetailsStep /> },
  ];

  const totalSteps = () => steps.length;

  const completedSteps = () => Object.keys(completed).length;

  const isLastStep = () => activeStep === totalSteps() - 1;

  const allStepsCompleted = () => completedSteps() === totalSteps();


  return (
    <section className={Styles.Container}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(step => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === totalSteps() ? (
          <div>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography>{steps[activeStep].component}</Typography>
            <div className={Styles.ButtonGroup}>
              <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {isLastStep() ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShoppingCart;
