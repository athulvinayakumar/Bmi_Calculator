import { TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import './App.css';

function App() {
  
  const [total, setTotal] = useState();
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);

  const [bmi, setBmi] = useState(' ');
  const[error,seterror] = useState('');

  const [isWeight, setIsWeight] = useState(true);
  const [isHeight, setIsHeight] = useState(true);

  const getValidate = (e) => {
    const { name, value } = e.target;
    if (value === "") {
      if (name === 'weight') {
        setWeight(value);
        setIsWeight(true);
      } else if (name === 'height') {
        setHeight(value);
        setIsHeight(true);
      }
    } else if (!!value.match(/^[1-9]\d*$/)) {
      if (name === 'weight') {
        setWeight(parseFloat(value));
        setIsWeight(true);
      } else if (name === 'height') {
        setHeight(value);
        setIsHeight(true);
      }
    } else {
      if (name === 'weight') {
        setWeight(value);
        setIsWeight(false);
      } else if (name === 'height') {
        setHeight(value);
        setIsHeight(false);
      }
    }
  };

  const handleReset = () => {
    setWeight(0);
    setHeight(0);
    setIsWeight(true);
    setIsHeight(true);
    setTotal();
    setBmi(' ');
    seterror();
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    if (!weight || !height) {
      seterror("Enter Valid Data!");
    } else {
      const bmi = weight / ((height * height) / 10000);
      setTotal(bmi.toFixed(1));

      if (bmi < 18.6) {
        setBmi("Under Weight...!!");
      } else if (bmi >= 18.6 && bmi <= 24.9) {
        setBmi("Healthy Weight!");
      } else {
        setBmi("Over Weight...!!");
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3" style={{ minHeight: '100vh' }}>
      <div className="bg-dark p-5 rounded" style={{ maxWidth: '500px', width: '90%', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <h1 className="text-primary text-center fw-bolder" style={{ fontFamily: 'Arial, sans-serif',fontSize:'1.5rem' }}>
          BMI CALCULATOR
        </h1>
        <p className="text-white text-center fw-bolder">Calculate Your Body Mass Index!</p>
        <div className="bg-info d-flex justify-content-center align-items-center w-100 flex-column rounded p-3">
          <h1 className='text-white'>{total} <span className='fs-4'>kg/m<sup>2</sup></span></h1>
          <h4 className={bmi === 'Healthy Weight!' ? 'text-success' : bmi === 'Under Weight...!!' || bmi === 'Over Weight...!!' ? 'text-danger' : 'text-dark'}>{bmi}</h4>
        </div>
        <form onSubmit={handlesubmit} className="bg-white p-3 rounded mt-4">
          <p className='text-danger text-center'>{error}</p>
          <div className="text-center mt-3">
            <div className="input-group">
              <TextField id="standard-basic" name="weight" value={weight || ''} onChange={(e) => getValidate(e)} autoComplete='off' placeholder="Enter Weight" label="" variant="standard" style={{ width: '100%' }} />
            </div>
            {!isWeight && (
              <p className="text-danger">Invalid Weight</p>
            )}
          </div>
          <div className="text-center mt-3">
            <div className="input-group">
              <TextField id="standard-basic" name="height" value={height || ''} onChange={(e) => getValidate(e)} autoComplete='off' placeholder="Enter Height" label="" variant="standard" style={{ width: '100%' }} />
            </div>
            {!isHeight && (
              <p className="text-danger">Invalid Height</p>
            )}
          </div>
          <Stack className="mt-4 d-flex justify-content-center" direction="row" spacing={2}>
            <Button type="submit" className="bg-info" style={{ width: '100%', maxWidth: '150px', height: '40px' }} variant="contained">
              Calculate
            </Button>
            <Button onClick={handleReset} style={{ width: '100%', maxWidth: '150px', height: '40px' }} variant="outlined">
              Reset
            </Button>
          </Stack>
        </form>
      </div>
    </div>
  );
};

export default App;
