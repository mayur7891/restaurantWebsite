import React from 'react';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Sample from './components/Sample';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './components/About';
import Booking from './components/Booking';
import Contact from './components/Contact';
import Auth from './components/Auth';
import RestaurantCart from './components/RestaurantCart';
import Card from './components/Card';
import Testimonial from './components/Testimonial';
import MenuCard from './components/MenuCard';
import BookingConfirmation from './components/BookingConfirmation';

const App = () => {

  const bookingData = {
    name: 'John Doe',
    visitingDate: '2023-11-01', // Replace with the actual visiting date
    numPeople: 4,
    tableID: 7, // Replace with the actual table ID
  };
  return (
    <BrowserRouter>
    <Navbar></Navbar> 
    <Routes>
      <Route exact path='/' element={<Home></Home>}></Route>
      <Route exact path='/Menu' element={<Card></Card>}></Route>
      <Route exact path='/About' element={<About></About>}></Route>
      <Route exact path='/Contact' element={<Contact></Contact>}></Route>
      <Route exact path='/Booking' element={<Booking></Booking>}></Route>
      <Route exact path='/Login' element={<Auth></Auth>}></Route>
      <Route exact path='/Cart' element={<RestaurantCart></RestaurantCart>}></Route>
      <Route exact path="/Confirmation" element={<BookingConfirmation></BookingConfirmation>}/>
  

    </Routes> 
    {/* <BookingConfirmation  /> */}
    {/* <BookingConfirmation {...bookingData} />Replace `bookingData` with your actual booking data */}

    <Footer></Footer>
    {/* <Testimonial></Testimonial>
    <Card></Card> */}
    {/* <MenuCard ></MenuCard> */}
    </BrowserRouter>
  );
};

export default App;
