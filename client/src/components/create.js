import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Create({userfromstart}) {


  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [joinedDate, setJoinedDate] = useState("");
  const [grade, setGrade] = useState("");
  const [image, setImage] = useState("");

  const history=useNavigate();

  useEffect(()=>{
    console.log(userfromstart);
    if(userfromstart.role!='admin'){
      history('/')
    }
  },[])

  const submitData = (e) => {
    e.preventDefault();
    const newperson = {
      person_name: name,
      person_age: age,
      person_joined_orphanage: joinedDate,
      person_grade: grade,
      image_url: image,
    };

    axios
      .post("http://localhost:5000/record/add", newperson)
      .then((res) => console.log(res.data));

    setName("");
    setAge("");
    setJoinedDate("");
    setGrade("");
    setImage("");
  };
  return (
    <div style={{ marginTop: 20 }}>
      <h3>Create New Record</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitData(e);
        }}
      >
        <div className="row">
          <div className="form-group col">
            <label>Name of the Orphan: </label>
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
            <label>Orphan's Age: </label>
            <input
              type="text"
              className="form-control"
              value={age}
              onChange={(e) => {
                e.preventDefault();
                setAge(e.target.value);
              }}
            />
          </div>
          <div className="form-group col">
            <label>Orphan's Joined Date: </label>
            <input
              type="date"
              className="form-control"
              value={joinedDate}
              onChange={(e) => {
                e.preventDefault();
                setJoinedDate(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="row">
        <div className="form-group col">
          <label>Orphan's Grade: </label>
          <input
            type="text"
            className="form-control"
            value={grade}
            onChange={(e) => {
              e.preventDefault();
              setGrade(e.target.value);
            }}
          />
        </div>

        <div className="form-group col">
          <label>Orphan's Image Url: </label>
          <input
            type="text"
            className="form-control"
            value={image}
            onChange={(e) => {
              e.preventDefault();
              setImage(e.target.value);
            }}
          />
        </div>

        </div>

        {image!==""?<img height={250} width={250} style={{objectFit:'cover'}} className="form-group col" src={image} />
:<></>}        

        <div className="form-group">
          <input
            type="submit"
            value="Create person"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default Create;
