import MenuCard from './MenuCard';
import "./card.css";

const Card = () => {

  const whiteText = { color: 'white' };

  return (
    <div className="menu-backg">
        <div className='menucard-bg'>
    <section className="offer_section layout_padding-bottom" style={{marginTop:'3.7rem'}}>
      <div className="container offer_container">
        <h2 className="text-center" >Today's Offers</h2>
        <div className="row">
          <div className="col-md-6">
            <div className="box">
              <div className="img-box">
                <img src="images/o1.jpg" alt="Tasty Thursdays" />
              </div>
              <div className="detail-box">
                <h5 style={whiteText}>Tasty Thursdays</h5>
                <h6 style={whiteText}>
                  <span>20%</span> Off
                </h6>
                <a href="/" className="btn btn-primary" style={whiteText}>
                  Order Now
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="box">
              <div className="img-box">
                <img src="images/o2.jpg" alt="Pizza Days" />
              </div>
              <div className="detail-box">
                <h5 style={whiteText}>Pizza Days</h5>
                <h6 style={whiteText}>
                  <span>15%</span> Off
                </h6>
                <a href="/" className="btn btn-primary" style={whiteText}>
                  Order Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-center " style={{marginTop:"50px"}}>Our Menu</h2>
    </section>
    <MenuCard></MenuCard>
    </div>
    </div>
  );
};

export default Card;