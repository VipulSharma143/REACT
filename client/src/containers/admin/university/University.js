import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../../navigations/Routes';

function University() {
  const [form, setForm] = useState({ name: "", image: null });
  const [formError, setFormError] = useState({ name: "", image: "" });
  const [universities, setUniversities] = useState(null);
  const [universityId, setUniversityId] = useState(null);
  const navigate=useNavigate();

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Save University
  // const saveUniversity = () => {
  //   try {
  //     let formData = new FormData();
  //     formData.append("name", form.name);
  //     formData.append("image", form.image, form.image.name);
  //     axios.post("http://localhost:8763/university", formData, {
  //       headers: { "Content-Type": "multipart/form-data" }
  //     }).then((response) => {
  //       alert(response.data.message);
  //       getAllUniversities();
  //       // resetForm();
  //     });
  //   } catch (error) {
  //     alert("Failed to submit data");
  //   }
  // };

  const SaveUniversity = () => {
    try {
      let formData = new FormData();
      formData.append("name", form.name);
      formData.append("image", form.image, form.image.name);
      axios.post("http://localhost:8763/university", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      }).then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response.data.message,
        }).then(() => {
          getAllUniversities();
          resetForm();
        });
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to submit data',
      });
    }
  };
  



  // Update University
  // const updateUniversity = () => {
  //   try {
  //     let formData = new FormData();
  //     formData.append("name", form.name);
  //     formData.append("image", form.image, form.image.name);
  //     formData.append("id", universityId);
  //     axios.put("http://localhost:8763/university", formData, {
  //       headers: { "Content-Type": "multipart/form-data" }
  //     }).then((response) => {
  //       alert(response.data.message);
  //       getAllUniversities();
  //       // resetForm();
  //     });
  //   } catch (error) {
  //     alert("Failed to submit data");
  //   }
  // };

  const UpdateUniversity = () => {
    try {
      
      let formData = new FormData();
      formData.append("name", form.name);
      formData.append("image", form.image);
      formData.append("_id", universityId);
      
      axios.put("http://localhost:8763/university", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      }).then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response.data.message,
        }).then(() => {
          getAllUniversities();
          resetForm();
        });
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update university',
      });
    }
  };
  
  


  // Delete University
  // const deleteUniversity = (id) => {
  //   try {
  //     let ans = window.confirm("Are you sure you want to delete?");
  //     if (!ans) return;
  //     axios.delete("http://localhost:8763/university", { data: { id: id } }).then((response) => {
  //       alert(response.data.message);
  //       getAllUniversities();
  //     });
  //   } catch (error) {
  //     alert("Failed to submit data");
  //   }
  // };

  const DeleteUniversity = (id) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this university!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete("http://localhost:8763/university", { data: { id: id } }).then((response) => {
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: response.data.message,
            }).then(() => {
              getAllUniversities();
            });
          });
        }
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to submit data',
      });
    }
  };


  // Get all universities
  const getAllUniversities = () => {
    try {
      axios.get("http://localhost:8763/university").then((response) => {
        setUniversities(response.data.uniData);
      });
    } catch (error) {
      alert("Failed to fetch data");
    }
  };

  useEffect(() => {
    getAllUniversities();
  }, []);

  // Reset form
  const resetForm = () => {
    setForm({ name: "", image: null });
    setFormError({ name: "", image: "" });
  }

  // Form submission handler
  const onUniversitySubmit = () => {
    let errors = false;
    let error = { name: "", image: "" };
    
    if (form.name.trim().length === 0) {
      errors = true;
      error = { ...error, name: "University Name Empty" };
    }
    if (form.image === null) {
      errors = true;
      error = { ...error, image: "Please Select Image" };
    }

    if (errors) {
      setFormError(error);
    } else {
      setFormError({ name: "", image: "" });
      universityId ? UpdateUniversity() : SaveUniversity();
    }
  };

  // Render universities
  const renderUniversity = () => {
    return universities?.map((item, index) => (
      <tr key={index}>
        <td>
          <img src={"http://localhost:8763/" + item.image} alt={item.name} width="80%" height="100"/>
        </td>
        <td>{item.name}</td>
        <td>
          <button className='btn btn-primary'onClick={()=>{
            navigate(
              ROUTES.departmentAdmin.name+
              "?id="+item._id+
              "&name="+item.name);
              
          }} >Add Department</button>
        </td>
        <td>
          <button className='btn btn-info' onClick={() => setUniversityId(item._id)}>Edit</button>
        </td>
        <td>
          <button className='btn btn-danger' onClick={() => DeleteUniversity(item._id)}>Delete</button>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <Header />
      <div className='row'>
        <div className="card text-center mx-auto">
          <div className="card-header bg-info text-white">
            {universityId ? "Edit University" : "New University"}
          </div>
          <div className="card-body">
            <div className='form-group row'>
              <label className='col-4'>University Name</label>
              <div className='col-8'>
                <input type='text' name='name' className='form-control' placeholder='University Name'value={form.name} onChange={changeHandler} />
                <p className='text-danger'>{formError.name}</p>
              </div>
            </div>
            <div className='form-group row'>
              <label className='col-4'>University Image</label>
              <div className='col-8'>
                <input type='file' className='form-control' value={form.files} onChange={(e) => setForm({ ...form, image: e.target.files[0] })} />
                <p className='text-danger'>{formError.image}</p>
              </div>
            </div>
          </div>
          <div className="card-footer text-muted">
            <button className='btn btn-info' onClick={onUniversitySubmit}>{universityId ? "Update" : "Save"}</button>
          </div>
        </div>
      </div>
      <div className='border p-2 m-2'>
        <table className='table table-bordered table-striped table-active'>
          <thead>
            <tr>
              <th>University Image</th>
              <th>University Name</th>
              <th>Add Department</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {renderUniversity()}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default University;
