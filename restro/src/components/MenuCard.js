import React, { useState, useEffect } from 'react';
import './sample.css';
import axios from 'axios';
import Addtocart from './Addtocart';
import Sample from './Sample';
const MenuCard = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
 
  const [totalPrice,setTotalPrice]=useState(0);
  const [totalQuantity,setTotalQuantity]=useState(0);

  
  const [quantity, setQuantity] = useState([]);


  const [dataFromChild, setDataFromChild] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:5000/api/1/quantity")
    .then((response)=>{
      console.log(response.data);
      setQuantity(response.data.quantity);
      setTotalPrice(response.data.TP);
      setTotalQuantity(response.data.TQ);
    }).catch((err)=>{
      console.log(err);
    });
  },[]);

  // Function to receive data from the child component
  const receiveDataFromChild = (data) => {
    setDataFromChild(data);
    setMenuItems(data);
    filteredMenuItems=data;
  };

  const handleIncrement = async (index) => {
    let prev=quantity[index];

    const response=await axios.post("http://localhost:5000/api/1/order_cart",{mode:"inc",idx:index});
    console.log(response.data);
    const updatedQuantity = [...quantity];
  updatedQuantity[index] = response.data.qty;

  let pric=totalPrice;
    pric += (response.data.qty-prev) * menuItems[index].Price;
    setTotalPrice(pric);

    pric=totalQuantity;
    pric+=(response.data.qty-prev);
    setTotalQuantity(pric);
    console.log(index);
  // Update the state with the modified copy
  setQuantity(updatedQuantity);
  };

  const handleDecrement = async (index) => {
    let prev=quantity[index];
    const response=await axios.post("http://localhost:5000/api/1/order_cart",{mode:"dec",idx:index});
    console.log(response.data);
    const updatedQuantity = [...quantity];
  updatedQuantity[index] = response.data.qty;

  let pric=totalPrice;
  pric -=(prev-response.data.qty )* menuItems[index].Price;
  setTotalPrice(pric);

  pric=totalQuantity;
  pric-=(prev-response.data.qty );
  setTotalQuantity(pric);
  console.log(pric);


  // Update the state with the modified copy
  setQuantity(updatedQuantity);
  };

  const handleAddToCart = (index) => {
    handleIncrement(index);
  };



useEffect(() => {
    
axios.get('http://localhost:5000/api/data')
.then((response) => {

  console.log(response.data)
  return response.data;

})
.then((data) => {
  setMenuItems(data);
})
.catch((error) => {
  console.error('Error fetching data:', error);
});

axios.get('http://localhost:5000/api/categories')
.then((response) => {
  console.log(response.data)
  return response.data;
})
.then((data) => {
  setCategories(['all', ...data]);
})
.catch((error) => {
  console.error('Error fetching categories:', error);
});

  }, []);

  const filteredMenuItems =
    selectedCategory === 'all'
      ? menuItems
      : menuItems.filter((item) => item.Category === selectedCategory);
  return (
    <div className='Menu-page'>
      <Sample sendDataToParent={receiveDataFromChild}></Sample>
      <div className='menu-bg'>
        <div className="category-filter">
          {categories.map((category, index) => (
            <button
            key={index}
            className={`btn btn-primary category-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
              {category}
            </button>
          ))}
        </div>
        <div className="container mt-4">
          <div className="row">
            {filteredMenuItems.map((item) => (
              <div key={item.ID} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="card" style={{ background: 'rgba(0,0,0,0.8)' }}>
                  <div className='img-container'>
                    <img src={item.Image}  alt={item.Name} />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{item.Name}</h5>
                    <p className="card-text">{item.Description}</p>
                    <div className='pricerate'>
                      <p className="price">₹ {item.Price}</p>
                      <div className="star-rating">
                          <span>{item.Rating}&#9733;</span>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                  {quantity[item.ID-1]>0 ? (
                    <div className='plusminus-btn'>
                      <div className="plus-btn" onClick={()=>handleDecrement(item.ID-1)}>
                        <i className="bi bi-dash-square"></i>
                      </div>
                      <div className='qty-val'>{quantity[item.ID-1]}</div>
                      <div className="minus-btn" onClick={() => handleIncrement(item.ID-1)}>
                        <i className="bi bi-plus-square"></i>
                      </div>
                    </div>
                  ) : (
                    <button className="add-to-cart-button btn-block" onClick={() => handleAddToCart(item.ID-1)}>
                      Add to Cart &#128722;
                    </button>
                  )}




                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
      {totalQuantity>0 &&
      <Addtocart quantity={totalQuantity} price={totalPrice}></Addtocart>}
    </div>
    // <></>
  );
};

export default MenuCard;