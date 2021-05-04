import React, {useState} from 'react';
import axios from 'axios';
import {DatePicker} from 'antd';
import { Select } from 'antd';
import {Button} from 'antd';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

const { Option } = Select;

const [date, setDate] = useState('')
const [originCode, setOriginCode] = useState('');
const [desCode, setDesCode] = useState('');
const [data, setData] = useState('');
// const [flightNum, setFlightNum] = useState('');




const onChangeOrigin = value => {
  console.log(`selected ${value}`);
  setOriginCode(value)
}

const onChangeDes = value => {
  console.log(`selected ${value}`);
  setDesCode(value)
}

// const onChangeDate = (date) => {
//   console.log(date)
//   setDate(date)  
// }

const onChangeDate = (date, dateString) => {
  console.log(dateString)
  // console.log(date.getTime())
  setDate(dateString)  
}
console.log(date)
// console.log(date.getTime())

const dateTwo = new Date(date)
console.log(dateTwo.getTime())

// console.log(dateTwo.toDateString())

// console.log(dateTwo.toLocaleDateString())

const onSearch = () => {
  // Base case checking
  if(!date){
    alert('Date is required')
  }
  if(dateTwo < Date.now()){
    alert('There are no flights for dates in the past. Please select a future date')
  }
  console.log(Date.now())
  if(!originCode){
    alert(`Your entry ${originCode} is not valid. Please select another airport`)
  }

  console.log(date)
  


  axios.get(
    `http://localhost:3000/flights?departureDate=${date}&originCity=${originCode}&destinationCity=${desCode}`,
  
  )
  
  
  .then(data => data.data)
  .then(finalData => {
    setData(finalData);
    // console.log(finalData);

  

  });
}

console.log(data);

const style = {
  width: '500px',
  backgroundColor: 'white',
  display: 'inline-block',
  padding: '15px',
  margin: '16px',
  textAlign: 'left',
  resultBox: {
    border: '1px solid rgb(100, 155, 237)', 
    borderRadius: 10,
    backgroundColor: 'white',
    boxShadow: '0px 1px 2px 1px rgba(0,0,0,0,4)',
    padding: 20,
    margin: 'auto' 
  },
  h2: { color: 'lightcoral'

  },
  
  h4: { fontWeight: 'bold'

  }

}

//const find = () => {
  return (
    <div style={style}>
      <div>
        <h1> Search Flights ✈️ </h1>
        <p>Origin Airport Code(optional)</p>
        <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Select a person"
    optionFilterProp="children"
    onChange={onChangeOrigin}
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  >
    <Option value="ORD">ORD</Option>
    <Option value="DFW">DFW</Option>
    <Option value="JFK">JFK</Option>
    <Option value="LAX">LAX</Option>
  </Select>
        <p>Starting Trip From.. For Example: DFW</p>
</div>
      <br/>
      
<div>
        <p>Destination Airport Code(optional)</p>
        <Select
    showSearch
    style={{ width: 200 }}
   //placeholder="Select a person"
    optionFilterProp="children"
    onChange={onChangeDes}
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  >
    <Option value="ORD">ORD</Option>
    <Option value="DFW">DFW</Option>
    <Option value="JFK">JFK</Option>
    <Option value="LAX">LAX</Option>
  </Select>
        <p>Ending Trip Here.. For Example: JFK</p>
</div>
     <br/>

      <div>
        <p>Departure Date (required)</p>
        <DatePicker  onChange={onChangeDate} />
        <p> Pick a Date ⤴ What day is your trip Starting?</p>
      </div>
      <br/>

      <div> 
      <Button
        type='primary'
        // icon='search'
        onClick={onSearch}
        >
          Search
      </Button>
      </div>
      <hr/>
      <br/>
      {/* <h1> {data.length ?  'Search Results: ' + data.length : ' '} </h1> */}
      {/* {JSON.stringify(data)} */}

      { data.length > 0 && data.filter(data => data.departureDate === date).filter(data => data.originCity === originCode).filter(data => data.destinationCity === desCode).map((data) =>  (
        <ol key={data.flightNumber}>
        <div style={style.resultBox} >
        <h2 style={style.h2} >Flight #: {data.flightNumber}</h2>
        {/* <h3 style={style.h3}> {dateTwo.toDateString()}</h3> */}
        <span style={style.h4}>Date: </span>  {data.departureDate}
        <br/>
        <span style={style.h4}>Departure: </span>  {data.originCity} 
         {console.log(data.originCity)}
         {console.log(date)}
         {/* {console.log(dateTwo)} */}
         <br/>
         <span style={style.h4}>Arrival: </span> {data.destinationCity}
        <br/>
        <span style={style.h4}>Aircraft: </span>  {data.aircraftModel} 
        <br/>
        <span style={style.h4}>Seats:</span> {data.passengerCapacity} 
      </div>
      </ol>
      ))}
    </div>
  )
  }