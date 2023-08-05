import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import './Home.css'

function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [basket, setBasket] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');

  const [updateName, setUpdateName] = useState('');
  const [updatePrice, setUpdatePrice] = useState('');
  const [updateQuantity, setUpdateQuantity] = useState('');

  const SignUp = async () => {
    try {
      const response = await axios.post('http://localhost:8000/signUp', { username, password });
      console.log(response.data);
      alert('signUp sucess')
    } 
    catch (error) {
      console.error(error);
    }
  };

  const SignIn = async () => {
    try {
      const response = await axios.post('http://localhost:8000/signIn', { username, password } ,{ withCredentials: true });
      window.alert(response.data)
    } 
    catch (error) {
      console.error(error);
    }
  };

  const Add = async () => {
    try {
      const response = await axios.post('http://localhost:8000/add', {
        name: itemName,
        price: itemPrice,
        quantity: itemQuantity,
      }, {
        withCredentials: true
      });
      console.log(response.data);
      
    } 
    catch (error) {
      console.error(error);
    }
  };

  const Get = async () => {
    try {
      const response = await axios.get('http://localhost:8000/get', {params: { username }});
      setBasket(response.data.basket);
    } 
    catch (error) {
      console.error(error);
    }
  };
  const Delete = async (itemId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/delete/${itemId}`, 
      {
        withCredentials: true,
      });
  
      if (response.status === 200) {
        setBasket((prevBasket) => prevBasket.filter((item) => item._id !== itemId));
      }
    } 
    catch (error) {
      console.error(error);
    }
  };
  

  const Update = async (itemId) => {
    try {
      const response = await axios.put(`http://localhost:8000/update/${itemId}`, { name: updateName, price: updatePrice, quantity: updateQuantity }, { withCredentials: true });
  
      if (response.status === 200) {
        setBasket(prevBasket =>
          prevBasket.map(item =>
            item._id === itemId? { ...item, name: updateName, price: updatePrice, quantity: updateQuantity }: item
          )
        );
  
        setUpdateName('');
        setUpdatePrice('');
        setUpdateQuantity('');
        console.log(response.data)  
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container'>
    <div className='left'>
      <div className='form'>
        <h2>Form</h2>
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <div><button  className='Button' onClick={SignUp}>SignUp</button></div>
          <div><button className='Button' onClick={SignIn}>SignIn</button></div>
        
        </div>
        <div className='addBasket'> 
          <h2>Add Item to Basket</h2>
          <input type="text" placeholder="Item Name" onChange={(e) => setItemName(e.target.value)} />
          <input type="number" placeholder="Item Price" onChange={(e) => setItemPrice(e.target.value)} />
          <input type="number" placeholder="Item Quantity"onChange={(e) => setItemQuantity(e.target.value)} />
          <button className='Button' onClick={Add}>Add to Basket</button>
        </div>
        <div className='updateBasket'>
          <h2>Update Basket Item</h2>
          <input type="text" placeholder="Item Name" value={updateName} onChange={e => setUpdateName(e.target.value)} />
          <input type="number" placeholder="Item Price" value={updatePrice} onChange={e => setUpdatePrice(e.target.value)} />
          <input type="number" placeholder="Item Quantity" value={updateQuantity} onChange={e => setUpdateQuantity(e.target.value)} />
        </div>
    </div>
    <div className='right'>
      <h2>View Basket</h2>
      <button onClick={Get} className='Button'>Get Basket</button>
      <div className='basket'>
      <ol>
        {basket?.map((item, index) => (
          <li key={index}>
            <div>{item.name} - {item.price} - {item.quantity}</div>
            <button className='updateButton1' onClick={()=>Update(item._id)}>Update</button>
            <button className='deleteButton1' onClick={() => Delete(item._id)}>Delete</button>
          </li>
        ))}
      </ol>
      </div>
    </div>  
    </div>
  );
}

export default Home
