import React, {useState} from 'react';
//import axios from 'axios';
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



// let firstFormat = date.replace('-','/')
  // let formattedDate = firstFormat.replace('-','/')
  // let secondFormat = formattedDate.split('').reverse('').join

  //  console.log(date, formattedDate);
  // console.log(date, formattedDate, secondFormat)

const onChangeOrigin = value => {
  console.log(`selected ${value}`);
  setOriginCode(value)
}

const onChangeDes = value => {
  console.log(`selected ${value}`);
  setDesCode(value)
}

const onChangeDate = (date, dateString) => {
  console.log(dateString)
  setDate(dateString)  
}

const dateTwo = new Date(date)
console.log(dateTwo.toDateString())


const onSearch = () => {
  // Base case checking
  if(!date){
    alert('Date is required')
  }

  console.log(date)
  


  fetch(
    `http://american-flight-engine-2019.herokuapp.com/flights?date=${date}&origin=${originCode}&destination=${desCode}`,
  {
    method: 'GET'

  }
  )
  .then(data => data.json())
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
    // onFocus={onFocus}
    // onBlur={onBlur}
    // onSearch={onSearch}
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
    // onFocus={onFocus}
    // onBlur={onBlur}
    // onSearch={onSearch}
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
      <h1> {data.length ?  'Search Results: ' + data.length : ' '} </h1>
      {/* {JSON.stringify(data)} */}

      {data.length > 0 && data.map((data) => (
        <ol key={data.flightNumber}>
        <div style={style.resultBox} >
        <h2 style={style.h2} >Flight #: {data.flightNumber}</h2>
        <h3 style={style.h3}> {dateTwo.toDateString()}</h3>
        <span style={style.h4}>Departure: </span> {data.origin.city} ({data.origin.code})   
         {console.log(data.origin.code)}
         <br/>
        <span style={style.h4}>Arrival: </span>  {data.destination.city} ({data.destination.code})
        <br/>
        <span style={style.h4}>Duration: </span> {data.duration.locale}
        <br/>
        <span style={style.h4}>Distance: </span> {data.distance} miles
      </div>
      </ol>
      ))}
    </div>
  )
  }
//}
//export default find;