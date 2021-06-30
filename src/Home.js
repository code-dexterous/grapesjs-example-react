import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_HOST } from "./api_utils";

const Home = () => {
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [pages, setPages] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    console.log("check validation");
    if (!name) {
      setIsValid(false);
      return;
    }
    console.log("Valid submit it", name);
  };

  useEffect(() => {
    async function getAllPages() {
      try {
        const response = await axios.get(`${API_HOST}/`);
        setPages(response.data);
      } catch (error) {
        console.log("error :>> ", error);
        setError(error.message);
      }
    }

    getAllPages();
  }, []);

  return (
    <div classNameName="container">
      <div className="row">
        <div classNameName="col-12 mt-5">
          <form id="create-page">
            <div className="modal-header">
              <h5 className="modal-title" id="addPageModalLabel">
                Create Page
              </h5>
            </div>
            <div className="modal-body">
              <div className="col-auto">
                <label for="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className={`form-control form-control-sm ${
                    isValid ? "" : "is-invalid"
                  }`}
                  id="name"
                  name="name"
                  placeholder="Name of Page"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {!isValid && (
                  <div className="invalid-feedback">
                    Please provide a valid name.
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary btn-sm">
                Clear
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </form>
        </div>
        <div class="col-12 my-2">
          {error && (
            <div className="alert alert-primary" role="alert">
              {error}
            </div>
          )}
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Slug</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {pages.length > 0
                ? pages.map((page) => (
                    <tr>
                      <td>{page._id}</td>
                      <td>{page.name}</td>
                      <td>{page.slug}</td>
                      <td>
                        <Link
                          to={`/editor/${page._id}`}
                          className="btn btn-success btn-sm"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))
                : "No Page Found"}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
