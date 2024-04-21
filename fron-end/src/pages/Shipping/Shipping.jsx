import React,{useEffect, useState} from 'react'
import Styles from './Shipping.module.scss'
 import { Tabs, Tab} from '@mui/material';
// import { products } from '../../utilities/';
// import ProductCard from '../../components/ProductCard/ProductCard';
import dayjs from 'dayjs'
import moment from 'moment'
import ShippingDetailsFrom from '../../components/ShippingDetailsFrom/ShippingDetailsFrom';
import ShippingDetailsTable from '../../components/ShippingDetailsTable/ShippingDetailsTable';
import { sampleShippingData } from '../../utilities/data.constants';
import { APP_TABLE_CONFIGS ,SCREEN_MODES} from '../../utilities/app.constants';

const Shipping = () => {

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
      const [activeTab, setActiveTab] = useState(0);
      const [shippingData, setShippingData] = useState(SHIPPING_FORM_INITIAL_STATE);
      const [page, setPage] = useState(0)
      const [rowsPerPage, setRowsPerPage] = useState(APP_TABLE_CONFIGS.DEFAULT_ROWS_PER_PAGE)
      const [sortMeta, setSortMeta] = useState(INITIAL_SORT_META);
      const [filteredList, setFilteredList] = useState(sampleShippingData)
      const [isFiltered, setIsFiltered] = useState(false)
      const [ScreenMode, setScreenMode] = useState('');

  // Define handleInputFocus and onInputHandleChange functions
  const handleInputFocus = (field, type) => {
    // Implement focus logic here
  };

  const onInputHandleChange = (field, value) => {
    setShippingData({ ...filteredList, [field]: value });
}
const handleTabChange = (event, newValue) => {
 
    setActiveTab(newValue);
    if(newValue===1){
      setScreenMode(SCREEN_MODES.CREATE)
    }
    if(newValue===2){
      setScreenMode(SCREEN_MODES.EDIT)
    }
};


const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(+event.target.value)
        setPage(0)
}    
 const handleChangePage = (event, newPage) => {
  setPage(newPage)
}

useEffect(() => {
  if(activeTab===1){
    setScreenMode(SCREEN_MODES.CREATE)
  }
  if(activeTab===2){
    setScreenMode(SCREEN_MODES.EDIT)
  }
  if(activeTab===0){
    setScreenMode(SCREEN_MODES.CREATE)
  }
},[activeTab])


const handleAction=(id,type)=>{
  setScreenMode(type)
  if(type===SCREEN_MODES.EDIT||type===SCREEN_MODES.VIEW){
    setActiveTab(2)
  }
  console.log("first",id,type)

}
const onSortHandle = (col) => {
  const sorted = filteredList.slice().sort((prevItem, nextItem) => {
      const _prevItem = prevItem[col];
      const _nextItem = nextItem[col];

      const prev = typeof _prevItem === "string" ? _prevItem.toUpperCase() : _prevItem;
      const next = typeof _nextItem === "string" ? _nextItem.toUpperCase() : _nextItem;

      if (prev < next) {
          return -1;
      }

      if (prev > next) {
          return 1;
      }

      return 0;
  });

  if (sortMeta.asc) {
      sorted.reverse();
  }

  setSortMeta((_sort) => ({ field: col, asc: !_sort.asc }));
  setFilteredList(sorted);
};

const onFilterHandle = (col, value) => {
  setIsFiltered(true);
  const filtered = filteredList.filter((item) => {
      const _value = item[col];
      if (typeof _value === "boolean") {
          return _value ? value === "Yes" : value === "No";
      }
      if (col === "createdDateandTime") {
          const _selectedMin = dayjs(value[0]).format('YYYY-MM-DD HH:mm');
          const _selectedMax = dayjs(value[1]).format('YYYY-MM-DD HH:mm');
          const _targetDate = dayjs(_value).add(330, 'minute').format('YYYY-MM-DD HH:mm');

          return moment(_targetDate).isBetween(_selectedMin, _selectedMax);
      }
      if (col === "departureDateandTime" || col === "returnDateandTime") {
          const _selectedMin = dayjs(value[0]).format('YYYY-MM-DD HH:mm');
          const _selectedMax = dayjs(value[1]).format('YYYY-MM-DD HH:mm');
          const _targetDate = dayjs(_value).format('YYYY-MM-DD HH:mm');

          return moment(_targetDate).isBetween(_selectedMin, _selectedMax);
      }
      if (value === 'N/A') return !_value;
      return _value === value;
  });

  setFilteredList(filtered);
};

const getFilterList = (col) => {
  if (true) {
      return filteredList
          .map((item) => {
              const value = item[col];
              if (typeof value === "boolean") {
                  return value ? "Yes" : "No";
              }
              return value ? value : 'N/A';
          })
          .filter((value, index, array) => array.indexOf(value) === index);
  } else return [];
};

const handleReportGeneration=()=>{
  console.log("report")

}

const onClearFilter = () => {
  setIsFiltered(false)
}
  return (
    <section className={Styles.container}>
    <div className={Styles.formWrapper}>

    <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab label="Shipping Details List" />
                <Tab label="Add Shipping" />
             { ScreenMode&&ScreenMode===SCREEN_MODES.EDIT&&  <Tab label="MAnage Shipping" />}
            </Tabs>
            <div className={Styles.tabContent}>
                {activeTab === 0 && <ShippingDetailsTable
                 handleAction={handleAction}
                 page={page}
                 rowsPerPage={rowsPerPage}
                 onHandleChangePage={handleChangePage}
                 onHandleChangeRowsPerPage={handleChangeRowsPerPage}
                 requestDataIsLoading={false}
                 filteredList={filteredList || []}
                 sortMeta={sortMeta}
                 onSortHandle={onSortHandle}
                 onFilterHandle={onFilterHandle}
                 getFilterList={getFilterList}
                 handleReportGeneration={handleReportGeneration}
                 onClearFilter={onClearFilter}
                 isFiltered={isFiltered}
                 handleEditRequest={()=>{}}
                 />
                 } 
                {activeTab === 1 && (
                    <ShippingDetailsFrom
                        handleInputFocus={handleInputFocus}
                        onInputHandleChange={onInputHandleChange}
                        shippingData={shippingData}
                    />
                )}
                    {activeTab === 2 && (
                    <ShippingDetailsFrom
                        handleInputFocus={handleInputFocus}
                        onInputHandleChange={onInputHandleChange}
                        shippingData={shippingData}
                    />
                )}
                {activeTab === 3 && (
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