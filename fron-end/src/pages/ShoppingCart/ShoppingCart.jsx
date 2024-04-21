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

const steps = [
  { label: 'Shopping Cart', component: ShoppingCartStep },
  { label: 'Shipping Info', component: ShippingInfoStep },
  { label: 'Payment Details', component: PaymentDetailsStep },
];

const ShoppingCart = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

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

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={step.label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {step.label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </>
        ) : (
          <>
            <Box sx={{ my: 2 }}>
              {React.createElement(steps[activeStep].component)}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {isLastStep() ? (
                <Button onClick={handleNext}>Finish</Button>
              ) : (
                <Button onClick={handleNext}>
                  Next
                </Button>
              )}
            </Box>
          </>
        )}
      </div>
    </Box>
  );
};

export default ShoppingCart;
