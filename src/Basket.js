import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import {username} from './Login'

function Basket() {
  const [basket, setBasket] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');

    const handleAddToBasket = async () => {
        try {
          const response = await axios.post('http://localhost:8000/api/basket/add', {
            name: itemName,
            price: itemPrice,
            quantity: itemQuantity,
          }, {
            withCredentials: true
          });
          console.log(response.data);
          
        } catch (error) {
          console.error(error);
        }
      };
      const handleGetBasket = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/get', {
            params: { username },
          });
          setBasket(response.data.basket);
        } catch (error) {
          console.error(error);
        }
      };
  return (
    <div>
      <h2>Add Item to Basket</h2>
      <input type="text" placeholder="Item Name" onChange={(e) => setItemName(e.target.value)} />
      <input type="number" placeholder="Item Price" onChange={(e) => setItemPrice(e.target.value)} />
      <input
        type="number"
        placeholder="Item Quantity"
        onChange={(e) => setItemQuantity(e.target.value)}
      />
      <button onClick={handleAddToBasket}>Add to Basket</button>

      <h2>View Basket</h2>
      <button onClick={handleGetBasket}>Get Basket</button>
      <ul>
        {basket.map((item, index) => (
          <li key={index}>
            {item.name} - {item.price} - {item.quantity}
            <button >Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Basket
