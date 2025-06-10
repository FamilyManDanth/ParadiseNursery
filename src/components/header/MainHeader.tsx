import AboutUs from "./AboutUs";
import "./MainHeader.css";
import miscVariables from "../body/MiscVariables";

const MainHeader = () => {
  return (
    <header className='first_page'>
      <div className='main_section'>
        <div className='first_page_name_w_btn'>
          <h1 className='main_header'>{miscVariables.companyName}</h1>
          <p className='main_sentence'>
            Planting fresher air with beautiful arrangements.
          </p>
          <div className='learn_more_btn_container'>
            <a
              href='#shop'
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <button className='learn_more_btn'>Shop Now</button>
            </a>
          </div>
        </div>
        <div className='about_us_section'>
          <AboutUs />
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
