import React from "react";
import "./TotalCost.css";

interface TotalCostProps {
  totalCosts: number;
  ItemsDisplay: React.FC<any>;
  onBackToShopping?: () => void;
}

const TotalCost: React.FC<TotalCostProps> = ({
  totalCosts,
  ItemsDisplay,
  onBackToShopping,
}) => {
  // Add validation
  if (totalCosts === undefined || !ItemsDisplay) {
    return (
      <div className='pricing-app'>
        <div className='display_box'>
          <h3>Missing required props or no items selected</h3>
        </div>
      </div>
    );
  }

  return (
    <div className='pricing-app'>
      <div className='display_box'>
        <div className='header'>
          <h3 className='preheading'>Your Shopping Cart</h3>
        </div>
        <div>
          <h2 id='pre_fee_cost_display' className='price'>
            Total: ${totalCosts.toFixed(2)}
          </h2>

          <div className='render_items'>
            <ItemsDisplay />
          </div>

          <div className='button-container'>
            {onBackToShopping && (
              <button className='back-to-shopping' onClick={onBackToShopping}>
                Continue Shopping
              </button>
            )}
            <button className='check-out'>Check Out</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalCost;
