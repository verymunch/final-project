import './App.css';
import {Route, Routes} from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import Customers from "./components/customers/Customers";
import AddCustomer from "./components/customers/AddCustomer";
import UpdateCustomer from "./components/customers/UpdateCustomer";
import Items from "./components/items/Items";
import AddItem from "./components/items/AddItem";
import UpdateItem from "./components/items/UpdateItem";
import Sales from "./components/sales/Sales";

function App() {
    return (
        <div className="App">
            <NavBar/>
            <Routes>
                <Route path='/*' element={<NotFound/>}></Route>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/customers' element={<Customers/>}></Route>
                <Route path='/addCustomer' element={<AddCustomer/>}></Route>
                <Route path='/updateCustomer/:id' element={<UpdateCustomer/>}></Route>
                <Route path='/items' element={<Items/>}></Route>
                <Route path='/addItem' element={<AddItem/>}></Route>
                <Route path='/updateItem/:id' element={<UpdateItem/>}></Route>
                <Route path='/sales' element={<Sales/>}></Route>
            </Routes>
        </div>
    );
}

export default App;