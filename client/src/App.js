import React, { useEffect, useState } from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import Edit from "./components/edit";
import Create from "./components/create";
import RecordList from "./components/recordList";
import CreateItem from "./components/createitem";
import ItemEdit from "./components/edititem";
import ItemList from "./components/ItemList";
import Login from "./components/login";
import Register from "./components/register";
import HomePage from './components/HomePage';
import AAc from './components/AdminAccess';

const App = () => {
  const [user, setLoginUser] = useState({});

  useEffect(() => {
    console.log(user.name?'t':'f');
  }, [user])

  return (
    <div>
      <Navbar user={user} setLoginUser={setLoginUser} />

      <Routes>
        <Route exact path="/theadmin/create" element={ user.name? user.role==='admin'?<Create userfromstart={user} />:<AAc />:<Login setLoginUser={setLoginUser} />}></Route>
        <Route exact path="/theadmin/item/create" element={ user.name? user.role==='admin'?<CreateItem userfromstart={user} />:<AAc />:<Login setLoginUser={setLoginUser} />}></Route>
        <Route exact path="/theadmin/edit/:id" element={ user.name? user.role==='admin'?<Edit userfromstart={user} />:<AAc />:<Login setLoginUser={setLoginUser} />} />
        <Route exact path="/theadmin/item/edit/:id" element={ user.name? user.role==='admin'?<ItemEdit userfromstart={user} />:<AAc />:<Login setLoginUser={setLoginUser} />} />
        <Route exact path="/items/donate/edit/:id" element={ user.name? <ItemEdit userfromstart={user} />:<Login setLoginUser={setLoginUser} />}></Route>
        <Route exact path="/items" element={ user.name? <ItemList user={user} />:<Login setLoginUser={setLoginUser} />}></Route>
        <Route exact path="/records" element={ user.name? <RecordList user={user} />:<Login setLoginUser={setLoginUser} />}></Route>
        <Route exact path="/Login" element={<Login setLoginUser={setLoginUser} />} >  </Route>
        <Route exact path="/Register" element={<Register />}>  </Route>
        <Route exact path="/" element={user && user._id ? <HomePage/>:<Login setLoginUser={setLoginUser} />} ></Route>
      </Routes>
    </div>
  );
};

export default App;
