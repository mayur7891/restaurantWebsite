import axios from 'axios';
import React, { useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import "./restaurantcart.css";
import OrderConfirmationDialog from './OrderConfirmationDialog.js';


const RestaurantCart = (props) => {
  const [myCart,setMyCart]=useState([]);
  const [isOrderConfirmationOpen, setOrderConfirmationOpen] = useState(false);

  useEffect(()=>{
    axios.get("http://localhost:5000/api/1/getcart")
    .then((response)=>{

      const modifiedData = response.data.map(item => ({
        ...item,
        total: item.Quantity * item.Price,
      })); 

      setMyCart(modifiedData);
      console.log(modifiedData);
    }).catch((err)=>{
      console.log(err);
    });
  },[]);


  const updateQuantity = (index, incdec) => {
    const updatedCart = [...myCart];
    
    updatedCart[index] = {
      ...updatedCart[index],
      Quantity: updatedCart[index].Quantity + incdec,
      total: (updatedCart[index].Quantity + incdec) * updatedCart[index].Price,
    };
    if(updatedCart[index].Quantity===0){
      removeItem(index+1);
      return;
    }
    setMyCart(updatedCart);
    // console.log(updatedCart);
  };
  
  const handleOrder = async ()=>{
    const response= await axios.get("http://localhost:5000/api/1/order");
    const modifiedData = response.data.map(item => ({
      ...item,
      total: item.Quantity * item.Price,
    })); 
    setOrderConfirmationOpen(true);
    setMyCart(modifiedData);
  }

  const handleCloseOrderConfirmation = () => {
    setOrderConfirmationOpen(false);
  };



  const removeItem = (itemId) => {
    const updatedCart = myCart.filter((item) => item.order_id !== itemId);
    setMyCart(updatedCart);
  };

  const calculateSubtotal = () => {
    return myCart.reduce((total, item) => total + item.total, 0);
  };

  const gstRate = 0.18;
  const subtotal = calculateSubtotal();
  const gst = (subtotal * gstRate).toFixed(2);
  const total = parseFloat(subtotal) + parseFloat(gst);

  const calculateDeliveryCharge = (total) => {
    return total - gst >= 200 ? 0 : 50;
  };

  const deliveryCharge = calculateDeliveryCharge(total);

  return (
    <>
    <div className=" mycart container bg-white rounded-top mt-5" id="zero-pad">
      {myCart.length!==0? (
      <div className="row d-flex justify-content-center">
        <div className="col-lg-10 col-12 pt-3">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4>My Cart</h4>
            </div>
          </div>
          <div className="d-flex flex-column pt-4">
            <div>
              <h5 className="text-uppercase font-weight-normal">shopping bag</h5>
            </div>
            <div className="font-weight-normal">{myCart.length} items</div>
          </div>
          <div className="d-flex flex-row px-lg-5 mx-lg-5 mobile" id="heading">
            <div className="px-lg-5 mr-lg-5" id="produc">
              PRODUCTS
            </div>
            <div className="px-lg-5 ml-lg-5" id="prc">
              PRICE
            </div>
            <div className="px-lg-5 ml-lg-1" id="quantity">
              QUANTITY
            </div>
            <div className="px-lg-5 ml-lg-3" id="total">
              TOTAL
            </div>
          </div>


          {myCart.map((item) => (
            <div
              key={item.order_id}
              className="d-flex flex-row justify-content-between align-items-center pt-lg-4 pt-2 pb-3 border-bottom mobile"
            >
              <div className="d-flex flex-row align-items-center">
                <div>
                  <img
                    src={item.Image}
                    width="150"
                    height="150"
                    alt=""
                    id="image"
                  />
                </div>
                <div className="d-flex flex-column pl-md-3 pl-1">
                  <div>
                    <h6>{item.Name}</h6>
                  </div>
                  <div>
                    Category:<span className="pl-2">{item.Category}</span>
                  </div>
                  <div>
                    Subcategory:<span className="pl-3">{item.Subcategory}</span>
                  </div>
                </div>
              </div>
              <div className="pl-md-0 pl-1">
                <b>₹{item.Price}</b>
              </div>
              <div className="pl-md-0 pl-2">
                {/* <span
                  className="fa fa-minus-square text-secondary"
                  onClick={() => updateQuantity(item.order_id-1, -1)}
                  style={{ cursor: 'pointer' }}
                ></span> */}
                <span className="px-md-3 px-1">{item.Quantity}</span>
                {/* <span
                  className="fa fa-plus-square text-secondary"
                  onClick={() => updateQuantity(item.order_id-1, 1)}
                  style={{ cursor: 'pointer' }}
                ></span> */}
              </div>
              <div className="pl-md-0 pl-1">
                <b>₹{item.total}</b>
              </div>
              <div
                className="close"
                onClick={() => removeItem(item.order_id)}
                style={{ cursor: 'pointer' }}
              >
                &times;
              </div>
            </div>
          ))}



          <div className="d-flex justify-content-end pt-3">
            <div className="d-flex flex-column">
              <div className="d-flex justify-content-between">
                <div>Subtotal:</div>
                <div>₹{subtotal.toFixed(2)}</div>
              </div>
              <div className="d-flex justify-content-between">
                <div>GST:</div>
                <div>₹{gst}</div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <b>Total:</b>
                </div>
                <div>
                  <b>₹{total.toFixed(2)}</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
):(<div className='empty-cart'><img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png"></img>Your Cart is Empty!!!</div>)}
    </div>
    <div className="container bg-light rounded-bottom py-4" id="zero-pad">
      <div className="row d-flex justify-content-center">
        <div className="col-lg-10 col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
            <Link to="/menu"> <button className="btn btn-sm bg-dark border border-dark">GO BACK</button></Link>
            </div>
            <div className="px-md-0 px-1" id="footer-font">
              <b className="pl-md-4">TOTAL<span className="pl-md-4">₹{total.toFixed(2)}</span></b>
            </div>
            <div>
              <button className="btn btn-sm bg-dark text-white px-lg-5 px-3" onClick={handleOrder}>ORDER NOW</button>
              <button className="btn btn-sm bg-dark text-white px-lg-5 px-3 ml-1">ORDER & GET BILL</button>

                <OrderConfirmationDialog
                  isOpen={isOrderConfirmationOpen}
                  onClose={handleCloseOrderConfirmation}
                />

            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default RestaurantCart;
