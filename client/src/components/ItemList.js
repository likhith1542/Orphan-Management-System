import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {FiEdit} from "react-icons/fi";
import {MdDeleteForever} from "react-icons/md";
import {FcDonate} from "react-icons/fc";

const Item = (props) => (
  <tr style={{textAlign:'center'}} >
    <td>{props.item.item_name}</td>
    <td>{props.item.item_quantity}</td>
    {props.user.role === "admin" ? 
    <td>
      <Link to={"/theadmin/item/edit/" + props.item._id}><FiEdit size={25} /></Link> |
      <a
        href="/"
        onClick={() => {
          props.deleteItem(props.item._id);
        }}
      >
        <MdDeleteForever size={25} color="red" />
      </a>
    </td>:<></>}
    {props.user.role==='donor'?<td>
    <Link to={"/items/donate/edit/" + props.item._id}><FcDonate size={25} /></Link>
    </td>:<></>}
  </tr>
);

export default class ItemList extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
    this.state = { items: [] };
  }

  // This method will get the data from the database.
  componentDidMount() {
    axios
      .get("http://localhost:5000/item/")
      .then((response) => {
        this.setState({ items: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // This method will delete a item based on the method
  deleteItem(id) {
    axios.delete("http://localhost:5000/item/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      item: this.state.items.filter((el) => el._id !== id),
    });
  }

  // This method will map out the users on the table
  itemList() {
    return this.state.items.map((currentitem) => {
      return (
        <Item
          item={currentitem}
          deleteItem={this.deleteItem}
          key={currentitem._id}
          user={this.props.user}
        />
      );
    });
  }

  // This following section will display the table with the items of individuals.
  render() {
    return (
      <div>
        <table className="table table-bordered table-dark table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr style={{textAlign:'center'}} >

              <th>Name</th>
              <th>Quantity</th>
              {this.props.user.role === "admin" ? <th>Action</th> : <></>}
              {this.props.user.role === "donor" ? <th>Donate</th> : <></>}

            </tr>
          </thead>
          <tbody>{this.itemList()}</tbody>
        </table>
        <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

      </div>
    );
  }
}
