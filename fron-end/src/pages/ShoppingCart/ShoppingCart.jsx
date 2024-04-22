import React, { useState ,useEffect} from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShoppingCartStep from '../../components/ShoppingCartStep/ShoppingCartStep';
import PaymentDetailsStep from '../../components/PaymentDetails/PaymentDetails';
import Styles from './ShoppingCart.module.scss';
import { cartItems } from '../../utilities/index';
import ShippingDetailsFrom from '../../components/ShippingDetailsFrom/ShippingDetailsFrom';
import { sampleShippingData } from '../../utilities/data.constants';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel'
import { Grid } from '@mui/material';
const ShoppingCart = () => {

  const SHIPPING_FORM_INITIAL_STATE = {
     _id:{ value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
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
  const [allShippingDetails, setAllShippingDetails] = useState([]);
  const [selectedDetailId, setSelectedDetailId] = useState('');

 // Fetching shipping data from the API
 useEffect(() => {


  fetchShippingData();
}, []);

 const fetchShippingData=async()=> {
  setAllShippingDetails(sampleShippingData);
}

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


  // Define handleInputFocus and onInputHandleChange functions
  const handleInputFocus = (field, type) => {
    // Implement focus logic here
  };

  const onInputHandleChange = (field, value) => {
    // setShippingData({ ...filteredList, [field]: value });
}


  const steps = [
    { label: 'Shopping Cart', component: <ShoppingCartStep cartItemList={cartItemList} onUpdateCart={onUpdateCart} /> },
    { label: 'Shipping Info', component: <ShippingDetailsFrom shippingData={shippingData} isCart={true}onInputHandleChange={onInputHandleChange} handleInputFocus={handleInputFocus} /> },
    { label: 'Payment Details', component: <PaymentDetailsStep /> },
  ];

  const totalSteps = () => steps.length;

  const completedSteps = () => Object.keys(completed).length;

  const isLastStep = () => activeStep === totalSteps() - 1;

  const allStepsCompleted = () => completedSteps() === totalSteps();



  const setShippingDataFromDetail  = (detail) => {
    setShippingData({
      ...SHIPPING_FORM_INITIAL_STATE,
      fullName: { ...SHIPPING_FORM_INITIAL_STATE.fullName, value: detail.fullName },
      email: { ...SHIPPING_FORM_INITIAL_STATE.email, value: detail.email },
      addressLine1: { ...SHIPPING_FORM_INITIAL_STATE.addressLine1, value: detail.addressLine1 },
      addressLine2: { ...SHIPPING_FORM_INITIAL_STATE.addressLine2, value: detail.addressLine2 },
      city: { ...SHIPPING_FORM_INITIAL_STATE.city, value: detail.city },
      postalCode: { ...SHIPPING_FORM_INITIAL_STATE.postalCode, value: detail.postalCode },
      country: { ...SHIPPING_FORM_INITIAL_STATE.country, value: detail.country },
      phoneNumber: { ...SHIPPING_FORM_INITIAL_STATE.phoneNumber, value: detail.phoneNumber },
    });
  };

  const handleRadioChange = (event) => {

console.log(allShippingDetails,"allShippingDetails")
     const selectedDetail = allShippingDetails.find(detail => detail._id === event.target.value);
   setSelectedDetailId(event.target.value);
    setShippingDataFromDetail(selectedDetail);
  };

  return (
    <section className={`${Styles.Container} ${activeStep === 1 ? 'centerContent' : ''}`}>
 
      <Stepper activeStep={activeStep} alternativeLabel sx={{ width: '100%' }}>
        {steps.map(step => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 1 && (
        <FormControl component="fieldset" sx={{ width: '100%', marginBlock: "1rem"  , marginLeft:"3rem" }}>
          <FormLabel component="legend" sx={{ textAlign: 'left', }}>Shipping Information</FormLabel>
          <RadioGroup aria-label="shipping-detail" name="shipping-detail" value={selectedDetailId} onChange={handleRadioChange} sx={{ alignItems: 'flex-start',marginBlock:"1rem" }}>
            <Grid container spacing={2}>
              {allShippingDetails.map((detail, index) => (
                <Grid item xs={2} key={detail._id} display="flex">
                  <FormControlLabel value={detail._id.toString()} control={<Radio />} label={`Shipping Option ${index + 1}`} sx={{ marginLeft: 0 }} />
                </Grid>
              ))}
            </Grid>
          </RadioGroup>
        </FormControl>
      )}

      <div>
        {activeStep === totalSteps() ? (
          <div>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
          {activeStep === 1 ? (
             <div style={{ width: '100%', textAlign: 'center' }}>
             <Grid Container spacing={2} >
              <Typography>{steps[activeStep].component}</Typography>
              </Grid>
            </div>
          ) : (
            <Typography>{steps[activeStep].component}</Typography>
          )}
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
