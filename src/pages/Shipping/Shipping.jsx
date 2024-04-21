import React,{useState} from 'react'
import Styles from './Shipping.module.scss'
 import { Tabs, Tab} from '@mui/material';
// import { products } from '../../utilities/';
// import ProductCard from '../../components/ProductCard/ProductCard';
import ShippingDetailsFrom from '../../components/ShippingDetailsFrom/ShippingDetailsFrom';
import ShippingDetailsTable from '../../components/ShippingDetailsTable/ShippingDetailsTable';
import { sampleShippingData } from '../../utilities/data.constants';
const Shipping = () => {

    const SHIPPING_FORM_INITIAL_STATE = {
        fullName: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
        addressLine1: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
        addressLine2: { value: "", isRequired: false, disable: false, readonly: false, validator: "text", error: "", },
        city: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
        postalCode: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
        country: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
        phoneNumber: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
      };

      const [activeTab, setActiveTab] = useState(0);
      
    const [shippingData, setShippingData] = useState(SHIPPING_FORM_INITIAL_STATE);
  // Define handleInputFocus and onInputHandleChange functions
  const handleInputFocus = (field, type) => {
    // Implement focus logic here
  };

  const onInputHandleChange = (field, value) => {
    setShippingData({ ...shippingData, [field]: value });
}
const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
};
  return (
    <section className={Styles.container}>
    <div className={Styles.formWrapper}>

    <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab label="Shipping Details List" />
                <Tab label="Shipping Details" />
            </Tabs>
            <div className={Styles.tabContent}>
                {activeTab === 0 && <ShippingDetailsTable
                ShippingDetails={sampleShippingData} />} {/* Assuming PaymentDetails component exists */}
                {activeTab === 1 && (
                    <ShippingDetailsFrom
                        handleInputFocus={handleInputFocus}
                        onInputHandleChange={onInputHandleChange}
                        shippingData={shippingData}
                    />
                )}
            </div>
       
    </div>
</section>
  )
}

export default Shipping