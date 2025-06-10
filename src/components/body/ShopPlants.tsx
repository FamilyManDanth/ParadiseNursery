import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import "./ShopPlants.css";
import "./cart.css";
import "./plant-styles.css";
import { incrementQuantity, decrementQuantity } from "../slices/plantSlice";
import TotalCost from "./TotalCost";

const PlantPurchase = () => {
  const [showItems, setShowItems] = useState(false);
  const plantItems = useSelector((state: any) => state.plant);
  const dispatch = useDispatch();

  // Get total cost
  const calculateTotalCost = (section: string) => {
    let totalCost = 0;
    if (section === "plant") {
      plantItems.forEach((item: any) => {
        totalCost += item.cost * item.quantity;
      });
    }
    return totalCost;
  };

  const plantTotalCost = calculateTotalCost("plant");

  const getItemsFromTotalCost = () => {
    const items: any[] = [];
    plantItems.forEach((item: any) => {
      if (item.quantity > 0) {
        items.push({ ...item, type: "plant" });
      }
    });
    return items;
  };

  const ItemsDisplay = ({ items }: { items: any[] }) => {
    // Find the index of an item in the plantItems array by name
    const findPlantIndex = (name: string) => {
      return plantItems.findIndex((plant: any) => plant.name === name);
    };

    return (
      <>
        <div className='display_box1'>
          {items.length === 0 && <p>No items selected</p>}
          <table className='table_item_data'>
            <thead>
              <tr>
                <th>Item</th>
                <th>Name</th>
                <th>Unit Cost</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Change</th>
                <th>Remove Item</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                const plantIndex = findPlantIndex(item.name);
                const isPeaceLily = item.name === "Peace Lily";
                const remainingLilyQty = isPeaceLily
                  ? 4 - item.quantity
                  : Number.MAX_SAFE_INTEGER;

                return (
                  <tr key={index}>
                    <td data-label='Item'>
                      <img
                        src={item.img}
                        alt={item.name}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                    </td>
                    <td data-label='Name'>{item.name}</td>
                    <td data-label='Unit Cost'>${item.cost}</td>
                    <td data-label='Quantity'>{item.quantity}</td>
                    <td data-label='Subtotal'>${item.cost * item.quantity}</td>
                    <td data-label='Change'>
                      <div className='cart-quantity-controls'>
                        <button
                          className='btn-minus btn-warning cart-btn'
                          onClick={() => handleRemoveFromCart(plantIndex)}
                          disabled={item.quantity <= 0}
                        >
                          &#8211;
                        </button>
                        <button
                          className='btn-plus btn-success cart-btn'
                          onClick={() => handleAddToCart(plantIndex)}
                          disabled={isPeaceLily && remainingLilyQty <= 0}
                        >
                          &#43;
                        </button>
                      </div>
                    </td>
                    <td data-label='Remove Item'>
                      <button
                        className='remove-items'
                        onClick={() => handleRemoveItemCompletely(plantIndex)}
                        title='Remove all of this item from cart'
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  const navigateToPlants = (idType: string) => {
    if (idType === "#plant") {
      if (showItems) {
        setShowItems(!showItems);
      }
    }
  };

  const handleAddToCart = (index: number) => {
    // Only check for Peace Lily limit (4 max)
    if (
      plantItems[index].name === "Peace Lily" &&
      plantItems[index].quantity >= 4
    ) {
      return;
    }
    dispatch(incrementQuantity(index));
  };

  const handleRemoveFromCart = (index: number) => {
    if (plantItems[index].quantity > 0) {
      dispatch(decrementQuantity(index));
    }
  };

  // Add this new function after handleRemoveFromCart
  const handleRemoveItemCompletely = (index: number) => {
    // Set quantity to 0 by dispatching decrementQuantity until it reaches 0
    const currentQuantity = plantItems[index].quantity;
    for (let i = 0; i < currentQuantity; i++) {
      dispatch(decrementQuantity(index));
    }
  };

  const companyName = "Paradise Nursery";

  // This is to make sure we don't go more than
  const remainingLilyQuantity =
    4 -
    (plantItems.find((item: any) => item.name === "Peace Lily")?.quantity || 0);

  // Calculate the total number of items in the cart
  const totalCartItems = plantItems.reduce(
    (total: number, item: any) => total + item.quantity,
    0
  );

  return (
    <>
      <div id='shop' className='main_container'>
        <nav className='navbar_event_conference'>
          <div className='navbar-section left'>
            <a
              href='#sAboutUs'
              className='company_logo'
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img
                src='/ParadiseNursery/favicon.ico'
                alt='Plant Logo'
                className='logo-icon'
              />
              <span>{companyName}</span>
            </a>
          </div>
          <div className='navbar-section center'>
            <div className='nav_links'>
              <a
                href='#leafy-plants'
                onClick={() => navigateToPlants("#plant")}
              >
                Leafy Plants
              </a>
              <a
                href='#figs-flowers'
                onClick={() => navigateToPlants("#plant")}
              >
                Figs & Flowers
              </a>
            </div>
          </div>
          <div className='navbar-section right'>
            <div
              className='cart-container'
              onClick={() => setShowItems(!showItems)}
              title='View Cart'
            >
              <div className='cart-icon'>🛒</div>
              {totalCartItems > 0 && (
                <div className='cart-badge'>{totalCartItems}</div>
              )}
            </div>
          </div>
        </nav>
        {!showItems ? (
          <div className='items-information'>
            <div id='plant' className='plant_container container_main'>
              <div className='text'>
                <h1>Air Purifying Plant Selection</h1>
              </div>
              <div id='leafy-plants' className='plant_selection'>
                <h2>Leafy Plants</h2>
                {plantItems &&
                  plantItems.map((item: any, index: number) => {
                    if (item.plant_type === "Potted") {
                      return (
                        <div className='plant_main' key={index}>
                          <div className='img'>
                            <img src={item.img} alt={item.name} />
                          </div>
                          <div className='plant_info'>
                            <h3>{item.name}</h3>
                            <p>${item.cost}</p>
                            <div className='button_container'>
                              {plantItems[index].name === "Peace Lily" ? (
                                <>
                                  <button
                                    className={
                                      plantItems[index].quantity === 0
                                        ? "btn-warning btn-disabled"
                                        : "btn-minus btn-warning"
                                    }
                                    onClick={() => handleRemoveFromCart(index)}
                                  >
                                    &#8211;
                                  </button>
                                  <span className='selected_count'>
                                    {plantItems[index].quantity > 0
                                      ? ` ${plantItems[index].quantity}`
                                      : "0"}
                                  </span>
                                  <button
                                    className={
                                      remainingLilyQuantity === 0
                                        ? "btn-success btn-disabled"
                                        : "btn-success btn-plus"
                                    }
                                    onClick={() => handleAddToCart(index)}
                                  >
                                    &#43;
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    className={
                                      plantItems[index].quantity === 0
                                        ? "btn-warning btn-disabled"
                                        : "btn-minus btn-warning"
                                    }
                                    onClick={() => handleRemoveFromCart(index)}
                                  >
                                    &#8211;
                                  </button>
                                  <span className='selected_count'>
                                    {plantItems[index].quantity > 0
                                      ? ` ${plantItems[index].quantity}`
                                      : "0"}
                                  </span>
                                  <button
                                    className='btn-success btn-plus'
                                    onClick={() => handleAddToCart(index)}
                                  >
                                    &#43;
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
              </div>

              <div id='figs-flowers' className='plant_selection'>
                <h2>Figs and Flowers</h2>
                {plantItems &&
                  plantItems.map((item: any, index: number) => {
                    if (item.plant_type !== "Potted") {
                      return (
                        <div className='plant_main' key={index}>
                          <div className='img'>
                            <img src={item.img} alt={item.name} />
                          </div>
                          <div className='plant_info'>
                            <h3>{item.name}</h3>
                            <p>${item.cost}</p>
                            <div className='button_container'>
                              {plantItems[index].name === "Peace Lily" ? (
                                <>
                                  <button
                                    className={
                                      plantItems[index].quantity === 0
                                        ? "btn-warning btn-disabled"
                                        : "btn-minus btn-warning"
                                    }
                                    onClick={() => handleRemoveFromCart(index)}
                                  >
                                    &#8211;
                                  </button>
                                  <span className='selected_count'>
                                    {plantItems[index].quantity > 0
                                      ? ` ${plantItems[index].quantity}`
                                      : "0"}
                                  </span>
                                  <button
                                    className={
                                      remainingLilyQuantity === 0
                                        ? "btn-success btn-disabled"
                                        : "btn-success btn-plus"
                                    }
                                    onClick={() => handleAddToCart(index)}
                                  >
                                    &#43;
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    className={
                                      plantItems[index].quantity === 0
                                        ? "btn-warning btn-disabled"
                                        : "btn-minus btn-warning"
                                    }
                                    onClick={() => handleRemoveFromCart(index)}
                                  >
                                    &#8211;
                                  </button>
                                  <span className='selected_count'>
                                    {plantItems[index].quantity > 0
                                      ? ` ${plantItems[index].quantity}`
                                      : "0"}
                                  </span>
                                  <button
                                    className='btn-success btn-plus'
                                    onClick={() => handleAddToCart(index)}
                                  >
                                    &#43;
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
              </div>
            </div>
            <div className='total_cost'>
              <h3 className='totalCost'>
                Total Cost: ${plantTotalCost.toFixed(2)}
              </h3>
            </div>
          </div>
        ) : (
          <div className='total_amount_detail'>
            <TotalCost
              totalCosts={plantTotalCost}
              ItemsDisplay={() => {
                const items = getItemsFromTotalCost();
                return <ItemsDisplay items={items} />;
              }}
              onBackToShopping={() => setShowItems(false)}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default PlantPurchase;
