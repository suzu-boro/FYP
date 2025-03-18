import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleProduct, updateProduct } from "../../Api/Api";
import { toast } from "react-toastify";

const AdminUpdate = () => {
  const { id } = useParams();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productNewImage, setProductNewImage] = useState(null);
  const [previewNewImage, setPreviewNewImage] = useState(null);
  const [oldImage, setOldImage] = useState("");

  useEffect(() => {
    getSingleProduct(id)
      .then((res) => {
        const product = res.data.product;
        setProductName(product.productName);
        setProductPrice(product.productPrice);
        setProductDescription(product.productDescription);
        setProductCategory(product.productCategory);
        setOldImage(product.productImage);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleImage = (event) => {
    const file = event.target.files[0];
    setProductNewImage(file);
    setPreviewNewImage(URL.createObjectURL(file));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("productCategory", productCategory);
    formData.append("productDescription", productDescription);

    if (productNewImage) {
      formData.append("productImage", productNewImage);
    }

    updateProduct(id, formData)
      .then((res) => {
        if (res.status === 201) {
          toast.success(res.data.message);
        }
      })
      .catch((error) => {
        if (error.response.status === 500) {
          toast.error(error.response.data.message);
        } else if (error.response.status === 400) {
          toast.warning(error.response.data.message);
        }
      });
  };

  return (
    <div className="container mt-3">
      <h2>
        Update product for <span className="text-danger">{productName}</span>
      </h2>
      <div className="d-flex gap-3">
        <form onSubmit={handleUpdate}>
          <label>Product Name</label>
          <input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="form-control"
            type="text"
            placeholder="Enter your product name"
          />

          <label className="mt-2">Product Price</label>
          <input
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="form-control"
            type="number"
            placeholder="Enter your product price"
          />

          <label className="mt-2">Choose category</label>
          <select
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            className="form-control"
          >
            <option value="bowls">Bowls</option>
            <option value="mug">mug</option>
            <option value="plates">plates</option>
            <option value="vase">vase</option>
          </select>

          <label className="mt-2">Enter description</label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            className="form-control"
          ></textarea>

          <label className="mt-2">Choose product Image</label>
          <input onChange={handleImage} type="file" className="form-control" />

          <button type="submit" className="btn btn-danger w-100 mt-2">
            Update Product
          </button>
        </form>

        <div className="image section">
          <h6>Old Image Preview</h6>
          {oldImage && (
            <img
              className="img-fluid object-fit-cover rounded-4"
              height={"200px"}
              width={"200px"}
              src={`http://localhost:3000/products/${oldImage}`}
              alt="Old Product"
            />
          )}

          {previewNewImage && (
            <div>
              <h6>New Image Preview</h6>
              <img
                className="img-fluid object-fit-cover rounded-4"
                height={"200px"}
                width={"200px"}
                src={previewNewImage}
                alt="New Product"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUpdate;
