import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import { Routes, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ROUTES from '../../../navigations/Routes';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Department() {
  const querypa = useQuery();
  const [form, setForm] = useState({ name: "", image: null, university: querypa.get("id") });
  const [formError, setFormError] = useState({ name: "", image: "" });
  const [departments, setDepartments] = useState([]);
  const [departmentsId, setDepartmentsId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    GetAll();
  }, [querypa]);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onDepartmentSubmit = () => {
    let errors = false;
    let error = { name: "", image: "" };

    if (form.name.trim().length === 0) {
      errors = true;
      error = { ...error, name: "Name Empty" };
    }
    if (!form.image) {
      errors = true;
      error = { ...error, image: "Image Empty" };
    }

    if (errors) {
      setFormError(error);
    } else {
      setFormError({ name: "", image: "" });
      departmentsId ? UpdateDepartment() : SaveDepartment();
    }
  };

  const resetForm = () => {
    setForm({ name: "", image: null });
    setDepartmentsId(null);
  };

  const renderDepartment = () => {
    return departments?.map((item) => (
      <tr key={item._id}>
        <td>
          <img src={"http://localhost:8763/" + item.image} alt={item.name} width="80%" height="100" />
        </td>
        <td>{item.name}</td>
        <td>
          <button className='btn btn-primary' onClick={() => navigate(ROUTES.productAdmin.name+"?id="+item._id+ "&name="+item.name)}>Add Product</button>
        </td>
        <td>
        <button className='btn btn-info' onClick={() => {
    setDepartmentsId(item._id);
    setForm({...form, name: item.name});
}
          }>Edit</button>
        </td>
        <td>
          <button className='btn btn-danger' onClick={() => DeleteDepartment(item._id)}>Delete</button>
        </td>
      </tr>
    ));
  };



  const GetAll = async () => {
    try {
      const response = await axios.get(`http://localhost:8763/department?universityId=${querypa.get("id")}`);
      setDepartments(response.data.depData);
    } catch (error) {
      alert("Failed to fetch data");
    }
  };

  const SaveDepartment = async () => {
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("image", form.image, form.image.name);
      formData.append("universityId", querypa.get("id"));

      const response = await axios.post("http://localhost:8763/department", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(response.data.message);
      GetAll();
      resetForm();
    } catch (error) {
      alert("Failed to submit data");
    }
  };

  const UpdateDepartment = async () => {
    try {
      const formData = new FormData();
      formData.append("id", departmentsId);
      formData.append("name", form.name);
      formData.append("image", form.image, form.image.name);
      formData.append("universityId", querypa.get("id"));

      const response = await axios.put("http://localhost:8763/department", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(response.data.message);
      GetAll();
      resetForm();
    } catch (error) {
      alert("Failed to submit data");
    }
  };

  function DeleteDepartment (id) {
    try {
      const response =  axios.delete("http://localhost:8763/department", { data: { id: id } });
      alert(response.data.message);
      GetAll();
    } catch (error) {
      alert("Failed to delete data");
    }
  };

  return (
    <div>
      <Header />
      <div className='row m-2 p-2'>
        <div className="card text-center mx-auto">
          <div className="card-header bg-info text-white">
            {departmentsId ? "Edit Department" : "New Department"}
          </div>
          <div className="card-body">
            <div className='form-group row'>
              <label className='col-4'>University Name</label>
              <div className='col-8'>
                <input type='text' value={querypa.get("name")} disabled className='form-control' />
              </div>
            </div>
            <div className='form-group row'>
              <label className='col-4'>Department Name</label>
              <div className='col-8'>
                <input
                  type='text'
                  name='name'
                  className='form-control'
                  value={form.name}
                  onChange={changeHandler}
                  placeholder='Department Name'
                />
                <p className='text-danger'>{formError.name}</p>
              </div>
            </div>
            <div className='form-group row'>
              <label className='col-4'>Department Image</label>
              <div className='col-8'>
                <input
                  type='file'
                  className='form-control'
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setForm({ ...form, image: file });
                  }}
                />
                <p className='text-danger'>{formError.image}</p>
              </div>
            </div>
          </div>
          <div className="card-footer text-muted">
            <button className='btn btn-info' onClick={onDepartmentSubmit}>
              {departmentsId ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
      <div className='border m-2 p-2'>
        <table className='table table-bordered table-striped'>
          <thead>
            <tr>
              <th>Department Image</th>
              <th>Department Name</th>
              <th>Add Department</th>
              <th>Edit Department</th>
              <th>Delete </th>
            </tr>
          </thead>
          <tbody>{renderDepartment()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Department;
