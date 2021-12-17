import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
const Record = (props) => (

  <tr style={{ textAlign: "center" }}>
    <td>
      <img
        width={50}
        height={50}
        style={{ borderRadius: "50%", objectFit: "cover" }}
        src={props.record.person_image}
        alt="Not Found"
      />
    </td>

    <td>{props.record.person_name}</td>
    <td>{props.record.person_age}</td>
    <td>{props.record.person_joined_orphanage.split("T")[0]}</td>
    <td>{props.record.person_grade}</td>

    {props.user.role === "admin" ? (
      <td>
        <Link to={"/theadmin/edit/" + props.record._id}>
          <FiEdit size={25} />
        </Link>{" "}
        |
        <a
          href="/"
          onClick={() => {
            props.deleteRecord(props.record._id);
          }}
        >
          <MdDeleteForever size={25} color="red" />
        </a>
      </td>
    ) : (
      <></>
    )}
  </tr>
);

export default class RecordList extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.state = { records: [] };
  }

  // This method will get the data from the database.
  componentDidMount() {
    axios
      .get("http://localhost:5000/record/")
      .then((response) => {
        this.setState({ records: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // This method will delete a record based on the method
  deleteRecord(id) {
    axios.delete("http://localhost:5000/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      record: this.state.records.filter((el) => el._id !== id),
    });
  }

  // This method will map out the users on the table
  recordList() {
    return this.state.records.map((currentrecord) => {
      return (
        <Record
          record={currentrecord}
          deleteRecord={this.deleteRecord}
          key={currentrecord._id}
          user={this.props.user}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  render() {
    return (
      <div>
        {/* <h3>Record List</h3> */}
        <table
          className="table table-bordered table-dark table-striped"
          style={{ marginTop: 20 }}
        >
          <thead>
            <tr style={{ textAlign: "center" }}>
              <th>Image</th>

              <th>Name</th>
              <th>Age</th>
              <th>Joined</th>
              <th>Grade</th>


              {this.props.user.role === "admin" ? <th>Action</th> : <></>}
            </tr>
          </thead>
          <tbody>{this.recordList()}</tbody>
        </table>
        <div
          class="modal fade"
          id="exampleModalLong"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLongTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  Modal title
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">...</div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
