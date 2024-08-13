import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { useState } from "react";
import { db } from "./data/db";

function App() {
  const [data, setdata] = useState(db);
  const [cart, setCart] = useState([]);
  const MAX_VALUE = 5;
  const MIN_VALUE = 1;

  function addToCart(item) {
    const itemExist = cart.findIndex((guitar) => guitar.id === item.id);

    if (itemExist >= 0) {
      //existe en el carrito
      if (cart[itemExist].quantity >= MAX_VALUE) return;
      const updateCart = [...cart];
      updateCart[itemExist].quantity++;
      setCart(updateCart);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
    }
  }

  function removeFrontCart(id) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  }

  function increaseQuantity(id) {
    const updateCart = cart.map((item) => {
      if (id === item.id && item.quantity < MAX_VALUE) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(updateCart);
  }
  function decreasedQuantity(id) {
    const updateCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_VALUE) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(updateCart);
  }function clearCart() {
    setCart([])
    
    
  }

  return (
    <>
      <Header
        cart={cart}
        removeFrontCart={removeFrontCart}
        increaseQuantity={increaseQuantity}
        decreasedQuantity={decreasedQuantity}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar key={guitar.id} guitar={guitar} addToCart={addToCart} />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
