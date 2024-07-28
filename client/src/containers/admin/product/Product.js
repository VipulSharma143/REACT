import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Product() {
  const querypa = useQuery();
  const [products, setProducts] = useState(null);
  const [productId, setProductId] = useState(null);
  const [formError, setFormError] = useState({ name: "", images: "", description: "", quantity: "", price: "" });
  const [form, setForm] = useState({ name: "", images: null, department: querypa.get("id"), description: "", quantity: 10, price: 0 });

  useEffect(() => {
    GetAll();
  }, []);

  const GetAll = async () => {
    try {
      debugger
      const response = await axios.get(`http://localhost:8763/product?departmentId=${querypa.get("id")}`);
      setProducts(response.data.ProData);
    } catch (error) {
      alert("Failed To Fetch Data");
    }
  };

  const SaveProduct = async () => {
    try {
      const formData = new FormData();
      for (let i = 0; i < form.images.length; i++) {
        formData.append("images", form.images[i], form.images[i].name);
      }
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("quantity", form.quantity);
      formData.append("departmentId", querypa.get("id"));
      
      const response = await axios.post("http://localhost:8763/product", formData, {
        "content-type": "multipart/form-data",
      });
      alert(response.data.message);
      GetAll();
      resetForm();
    } catch (error) {
      alert("Failed To Save Data");
    }
  };

  const UpdateProduct = async () => {
    try {
      const formData = new FormData();
      for (let i = 0; i < form.images.length; i++) {
        formData.append("images", form.images[i], form.images[i].name);
      }
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("quantity", form.quantity);
      formData.append("departmentId", querypa.get("id"));
      formData.append("id", productId);

      const response = await axios.put("http://localhost:8763/product", formData, {
        "content-type": "multipart/form-data",
      });
      alert(response.data.message);
      GetAll();
      resetForm();
    } catch (error) {
      alert("Failed To Update Data");
    }
  };

  const DeleteProduct = async (id) => {
    
    let ans = window.confirm("Delete Data");
    if (!ans) return;
    try {
      const response = await axios.delete("http://localhost:8763/product", { data: { id: id } });
      alert(response.data.message);
      GetAll();
    } catch (error) {
      alert("Failed To Delete Data");
    }
  };

  const OnProductSubmit = (e) => {
    e.preventDefault();
    let errors = false;
    let error = { name: "", images: "", description: "", quantity: "", price: "" };

    if (form.name.trim().length === 0) {
      errors = true;
      error = { ...error, name: "Name is required" };
    }
    if (!form.images) {
      errors = true;
      error = { ...error, images: "Image is required" };
    }
    if (!form.description) {
      errors = true;
      error = { ...error, description: "Description is required" };
    }
    if (!form.price) {
      errors = true;
      error = { ...error, price: "Price is required" };
    }

    if (errors) {
      setFormError(error);
    } else {
      setFormError({ name: "", images: "", description: "", quantity: "", price: "" });
      productId ? UpdateProduct() : SaveProduct();
    }
  };

  const resetForm = () => {
    setForm({ name: "", images: null, description: "", price: 0, quantity: 10 });
    setProductId(null);
  };

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const renderProducts = () => {

    return products?.map((item) => (
      <tr key={item._id}>
        <td> <img src={"http://localhost:8763/" + item.images[0]} width="80%" height="100" /></td>
        <td>{item.name}</td>
        <td>{item.description}</td>
        <td>{item.price}</td>
        <td>{item.quantity}</td>
        <td><button className='btn btn-danger' onClick={() => DeleteProduct(item._id)}>Delete Product</button></td>
        <td><button className='btn btn-primary' onClick={() => { setForm({ name: item.name, images: item.images, description: item.description, price: item.price, quantity: item.quantity }); setProductId(item._id); }}>Edit</button></td>
      </tr>
    ));
  };

  return (
    <div>
      <Header />
      <div className='row m-2 p-2'>
        <div className="card text-center mx-auto">
          <div className="card-header bg-info text-white">
            {productId ? "Edit Product" : "New Product"}
          </div>
          <div className="card-body">
            <form onSubmit={OnProductSubmit}>
              <div className='form-group row'>
                <label className='col-4'>Department Name</label>
                <div className='col-8'>
                  <input type='text' value={querypa.get("name")} disabled className='form-control' />
                </div>
              </div>
              <div className='form-group row'>
                <label className='col-4'>Product Name</label>
                <div className='col-8'>
                  <input
                    type='text'
                    name='name'
                    className='form-control'
                    value={form.name}
                    onChange={changeHandler}
                    placeholder='Product Name'
                  />
                  <p className='text-danger'>{formError.name}</p>
                </div>
              </div>
              <div className='form-group row'>
                <label className='col-4'>Product Image</label>
                <div className='col-8'>
                  <input
                    type='file'
                    className='form-control' multiple
                    onChange={(e) => {
                      setForm({ ...form, images: e.target.files });
                    }}
                  />
                  <p className='text-danger'>{formError.images}</p>
                </div>
              </div>
              <div className='form-group row'>
                <label className='col-4'>Product Price</label>
                <div className='col-8'>
                  <input
                    type='number'
                    name='price'
                    className='form-control'
                    value={form.price}
                    onChange={changeHandler}
                    placeholder='Product Price'
                  />
                  <p className='text-danger'>{formError.price}</p>
                </div>
              </div>
              <div className='form-group row'>
                <label className='col-4'>Product Description</label>
                <div className='col-8'>
                  <input
                    type='text'
                    name='description'
                    className='form-control'
                    value={form.description}
                    onChange={changeHandler}
                    placeholder='Product Description'
                  />
                  <p className='text-danger'>{formError.description}</p>
                </div>
              </div>
              <div className='form-group row'>
                <label className='col-4'>Product Quantity</label>
                <div className='col-8'>
                  <input
                    type='number'
                    name='quantity'
                    className='form-control'
                    value={form.quantity}
                    onChange={changeHandler}
                    placeholder='Product Quantity'
                  />
                  <p className='text-danger'>{formError.quantity}</p>
                </div>
              </div>
              <div className="card-footer text-muted">
                <button type="submit" className='btn btn-info'>
                  {productId ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className='border m-2 p-2'>
        <table className='table table-bordered table-striped'>
          <thead>
            <tr>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Product Description</th>
              <th>Product Quantity</th>
              <th>Product Price</th>
              <th>Delete Product</th>
              <th>Edit Product</th>
            </tr>
          </thead>
          <tbody>{renderProducts()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Product;
