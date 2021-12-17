import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ItemEdit({userfromstart}) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [dquantity, setDQuantity] = useState("");

  const { id } = useParams();
  let history = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/item/" + id)
      .then((response) => {
        setName(response.data.item_name);
        setQuantity(response.data.item_quantity);
        setDQuantity(response.data.item_quantity);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const submitData = (e) => {
    e.preventDefault();
    const newItem = {
      item_name: name,
      item_quantity: dquantity-quantity,
    };

    axios
      .post("http://localhost:5000/item/update/" + id, newItem)
      .then((res) => console.log(res.data));


    history("/");
  };
  return (
    <div style={{ marginTop: 20 }}>
      <h3>{userfromstart.role==='admin'?"Update":"Donate"} Item: {name}</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitData(e);
        }}
      >
        <div className="row">
          {
            userfromstart.role==='admin'?<div className="form-group col">
            <label>Name of the Item: </label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => {
                e.preventDefault();
                setName(e.target.value);
              }}
            />
          </div>:<></>
          }
          
          <div className="form-group col">
            <label>Item Quantity: </label>
            <input
              type="number"
              className="form-control"
              value={quantity}
              onChange={(e) => {
                e.preventDefault();
                setQuantity(e.target.value);
              }}
            />
          </div>
          
        </div>
        
       

        <div className="form-group">
          <input
            type="submit"
            value={userfromstart.role==='admin'?"Update Item":"Donate Item"}
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default ItemEdit;
