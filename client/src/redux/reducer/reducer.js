import { TYPES } from "../actions/types";
const initialState = {
  city: [],
  city_details: {},
  cityBackUp: [],
  search: [],
  isSearching: false,
  ///CART ///////////
  products: [], // { id, origin, destination, price, image, departureTime }
  cart: [], // { id, origin, destination, price, image, departureTime, quantity }
  currentItem: null,
  qtySelect: 0,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.RESET_STATES:
      return {
        ...state,
        city_details: action.payload,
      };

    case TYPES.GET_OFFER_DETAILS:
      return {
        ...state,
        city_details: action.payload.data,
      };

    case TYPES.IS_ON_SEARCH:
      return {
        ...state,
        city: [],
        isSearching: action.payload,
      };

    case TYPES.SORT_CITIES:
      let sortedData = [];

      if (action.payload.to === true) {
        action.payload.ascending
          ? (sortedData = state.city.sort((a, b) => {
              if (a.arrival.nameCity === undefined) {
                return 1;
              }
              if (b.arrival.nameCity === undefined) {
                return -1;
              }
              if (a.arrival.nameCity.area === null) {
                return 1;
              }
              if (b.arrival.nameCity === null) {
                return -1;
              }
              return a.arrival.nameCity.charAt(0) < b.arrival.nameCity.charAt(0)
                ? -1
                : 1;
            }))
          : (sortedData = state.city.sort((a, b) => {
              if (a.arrival.nameCity === undefined) {
                return 1;
              }
              if (b.arrival.nameCity === undefined) {
                return -1;
              }
              if (a.arrival.nameCity.area === null) {
                return 1;
              }
              if (b.arrival.nameCity === null) {
                return -1;
              }
              return a.arrival.nameCity.charAt(0) > b.arrival.nameCity.charAt(0)
                ? -1
                : 1;
            }));
      }
      if (action.payload.price === true) {
        action.payload.ascending
          ? (sortedData = state.city.sort((a, b) => {
              if (a.price === undefined) {
                return 1;
              }
              if (b.price === undefined) {
                return -1;
              }
              if (a.price === null) {
                return 1;
              }
              if (b.price === null) {
                return -1;
              }
              return parseFloat(a.price) < parseFloat(b.price) ? -1 : 1;
            }))
          : (sortedData = state.city.sort((a, b) => {
              if (a.price === undefined) {
                return 1;
              }
              if (b.price === undefined) {
                return -1;
              }
              if (a.price === null) {
                return 1;
              }
              if (b.price === null) {
                return -1;
              }
              return parseFloat(a.price) > parseFloat(b.price) ? -1 : 1;
            }));
      }
      if (action.payload.schedule != "") {
        action.payload.ascending
          ? (sortedData = state.city.sort((a, b) => {
              if (a.departure.scheduledTime === undefined) {
                return 1;
              }
              if (b.departure.scheduledTime === undefined) {
                return -1;
              }
              if (a.departure.scheduledTimee === null) {
                return 1;
              }
              if (b.departure.scheduledTime === null) {
                return -1;
              }
              if (a.departure.scheduledTime === "") {
                return 1;
              }
              if (b.departure.scheduledTime === "") {
                return -1;
              }

              return a.departure.scheduledTime < b.departure.scheduledTime
                ? -1
                : 1;
            }))
          : (sortedData = state.city.sort((a, b) => {
              if (a.departure.scheduledTime === undefined) {
                return 1;
              }
              if (b.departure.scheduledTime === undefined) {
                return -1;
              }
              if (a.departure.scheduledTime === null) {
                return 1;
              }
              if (b.departure.scheduledTime === null) {
                return -1;
              }
              return a.departure.scheduledTime > b.departure.scheduledTime
                ? -1
                : 1;
            }));
      }
      return { ...state, city: [...sortedData] };
    case TYPES.FILTER_CITIES:
      if (action.payload.departure !== "") {
        state.city = state.city.filter((fly) => {
          console.log(fly?.arrival?.nameCity);
          if (fly?.arrival?.nameCity !== undefined) {
            return fly?.arrival?.nameCity
              .toLowerCase()
              .includes(action.payload.to.toLowerCase());
          }
        });
      }
      if (action.payload.ret !== "") {
        state.city = state.city.filter((fly) =>
          fly.airline?.name
            .toLowerCase()
            .includes(action.payload.airline.toLowerCase())
        );
      }

      /*
      if (action.payload.time !== "") {
        state.city = state.city.filter(
          (fly) => fly.property === action.payload.time
        );
      }*/
      return { ...state };

    case TYPES.GET_FLIGHTS:
      return {
        ...state,
        isSearching: action.payload.isSearching,
        city: action.payload.data,
        cityBackUp: action.payload.data,
      };

    case TYPES.GET_CITIES:
      return {
        ...state,
        search: action.payload,
      };
    case TYPES.POST_FLIGHT:
      return {
        ...state,
      };

    //// CART ////////////

    case TYPES.ADD_TO_CART:
      var newItem = state.city_details.find(
        (prod) => prod.id === action.payload.id
      );
      console.log("ADD_TO_CART", newItem);
      // Check if item is in the cart already
      var inCart = false;
      if (state.cart.length > 0) {
        inCart = state.cart.some((item) => {
          return item._id === newItem._id;
        });
      }
      console.log("INCART", inCart);
      return {
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
              item.id === action.payload.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...state.cart, { ...newItem, quantity: 1 }], // [{manzana:3},{perro:1}]
      };
    case TYPES.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload),
      };

    case TYPES.ADD_QUANTITY:
      return {
        ...state,
        qtySelect: state.qtySelect + action.payload,
      };
    // case TYPES.ADD_QUANTITY:
    //   return {
    //     ...state,
    //     cart: state.cart.map(item.id === action.payload.id
    //       ? {...item, quantity: action.payload.id}
    //       :item
    //       )
    //   }
    // case TYPES.LOAD_CURRENT_ITEM:
    //   return {
    //     ...state,
    //     currentItem: action.payload
    //   }
    default:
      return { ...state };
  }
}

export default rootReducer;
