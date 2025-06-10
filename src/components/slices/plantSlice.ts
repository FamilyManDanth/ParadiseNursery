import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Plant {
  img: string;
  name: string;
  cost: number;
  plant_type: string;
  quantity: number;
}

const initialState: Plant[] = [
  {
    img: "https://png.pngtree.com/png-vector/20240510/ourmid/pngtree-bigsized-houseplant-with-a-white-ficus-benjamina-also-known-as-weeping-png-image_12390322.png",
    name: "Weeping Fig",
    cost: 60,
    plant_type: "Fig",
    quantity: 0,
  },
  {
    img: "/ParadiseNursery/assets/plants/snakeplant.png",
    name: "Snake Plant",
    cost: 30,
    plant_type: "Potted",
    quantity: 0,
  },
  {
    img: "/ParadiseNursery/assets/plants/spiderPlant.png",
    name: "Spider Plant",
    cost: 45,
    plant_type: "Potted",
    quantity: 0,
  },
  {
    img: "/ParadiseNursery/assets/plants/PeaceLily.png",
    name: "Peace Lily",
    cost: 80,
    plant_type: "Flower",
    quantity: 0,
  },
  {
    img: "/ParadiseNursery/assets/plants/BostonFern.png",
    name: "Boston Fern",
    cost: 45,
    plant_type: "Potted",
    quantity: 0,
  },
  {
    img: "/ParadiseNursery/assets/plants/AloeVera.png",
    name: "Aloe Vera",
    cost: 25,
    plant_type: "Potted",
    quantity: 0,
  },
];

export const plantSlice = createSlice({
  name: "plant",
  initialState,
  reducers: {
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const plant = state[action.payload];
      if (plant) {
        if (plant.name === "Peace Lily" && plant.quantity >= 4) return;
        plant.quantity++;
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const plant = state[action.payload];
      if (plant && plant.quantity > 0) {
        plant.quantity--;
      }
    },
  },
});

export const { incrementQuantity, decrementQuantity } = plantSlice.actions;
export const selectPlants = (state: { plant: Plant[] }) => state.plant;
export default plantSlice.reducer;
