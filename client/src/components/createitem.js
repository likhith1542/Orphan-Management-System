import React, { useState } from "react";
import axios from "axios";

function CreateItem() {

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  

  const submitData = (e) => {
    e.preventDefault();
    const newItem = {
        item_name: name,
        item_quantity: quantity,
    };

    axios
      .post("http://localhost:5000/item/add", newItem)
      .then((res) => console.log(res.data));

    setName("");
    setQuantity("");
  };
  return (
    <div style={{ marginTop: 20 }}>
      <h3>Create New Item</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitData(e);
        }}
      >
        <div className="row">
          <div className="form-group col">
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
          </div>
          <div className="form-group col">
            <label>Quantity Required: </label>
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
            value="Create Item"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default CreateItem;
