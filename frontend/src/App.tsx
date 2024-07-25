import './App.css';
import { Cal } from './components/Cal';
import { useState } from 'react';
import axios from "axios";
import {API_URL} from "./config"
import { ChartComp } from './components/chart';
import { Button } from './components/ui/button';


function App() {
  const [dateRange, setDateRange] = useState<any>({ from : new Date(), to : new Date() });
  const [data, setData] = useState<any>([]);
  const [totalItems, setTotalItems] = useState<any>(0);
  const  submit: any = async()=> {
    const res = await axios.get(`${API_URL}/fetchLogin`, { params: dateRange });
    setTotalItems(res.data.totalItems);
    setData(res.data.percentage);
  }
  
  return (
    <>
        {/* <h1 className='text-2xl m-3'>Enter Date Range</h1> */}
      <div className='m-2 flex items-center justify-around'>
        <Cal setDateRange={setDateRange} />
      </div>
      <Button onClick={submit} className='m-3 mx-auto block'>Submit</Button>
      {
        data  && <h1 className='text-2xl m-3'>Total Logins : {totalItems}</h1>
      }
      <ChartComp chartD = {data}/>
    </>
  );
}

export default App;
