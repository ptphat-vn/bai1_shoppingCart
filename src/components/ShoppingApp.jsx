import React, { useReducer } from "react";
import reducerCounter, {
  ADD_TO_CART,
  DESCREMENT,
  INCREMENT,
  REMOVE_ITEM,
} from "./reducers/handleReducer";
const products = [
  {
    id: 1,
    name: "🍎Táo",
    price: 10,
  },
  {
    id: 2,
    name: "🍌Chuối",
    price: 5,
  },
  {
    id: 3,
    name: "🍇Nho",
    price: 15,
  },
];
const initialValue = {
  catr: [],
  total: 0,
};

export const ShoppingApp = () => {
  const [state, dispatch] = useReducer(reducerCounter, initialValue);
  const handleAddToCart = (product) => {
    dispatch({
      type: ADD_TO_CART,
      payload: product,
    });
  };
  const handleIncrement = (id) => {
    dispatch({
      type: INCREMENT,
      payload: id,
    });
  };
  const handleDescrement = (id) => {
    dispatch({
      type: DESCREMENT,
      payload: id,
    });
  };
  const handleRemove = (id) => {
    dispatch({
      type: REMOVE_ITEM,
      payload: id,
    });
  };
  return (
    <div className="container">
      <div className="products-list">
        <h2>🛍️Danh sách sản phẩm</h2>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {products.map((product) => (
            <li key={product.id}>
              <span className="product-name">{product.name}</span>
              <span> - </span>
              <span className="product-price">{product.price}$</span>
              <button onClick={() => handleAddToCart(product)}>
                Thêm vào giỏ
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="shopping-cart">
        <h2>️🛒Giỏ hàng</h2>
        {state.cart && state.cart.length > 0 ? (
          state.cart.map((item) => (
            <div key={item.id}>
              <span>{item.name}</span>
              <span> - </span>
              <span>{item.price}$ </span>
              <span>X {item.quantity}</span>
              <button onClick={() => handleIncrement(item.id)}>➕</button>
              <button onClick={() => handleDescrement(item.id)}>➖</button>
              <button onClick={() => handleRemove(item.id)}>❌</button>
            </div>
          ))
        ) : (
          <p>Chưa có sản phẩm nào</p>
        )}

        <h3>Tổng cộng: {state.total}$</h3>
      </div>
    </div>
  );
};
