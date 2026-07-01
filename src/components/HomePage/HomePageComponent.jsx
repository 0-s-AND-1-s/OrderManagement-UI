import { useNavigate } from "react-router-dom";
import { userLogIn, usersignUp } from "../../services/AuthenticationService";
import { useState } from "react";

function HomePage() {
  const navigate = useNavigate();

  //To track the loginView page
  const [isLoginView, setLoginView] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const errorHandler = (error) => {
    setErrorMessage(error.message);
    setTimeout(() => {
      setErrorMessage("");
    }, 4000);
  };

  const formSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const roles = formData.getAll("authorityType");
    const userDetails = Object.fromEntries(formData.entries());

    console.log("UserDetails before overiding authorityType", userDetails);
    userDetails.authorityType = roles;
    console.log("UserDetails", userDetails);

    if (isLoginView) {
      try {
        const response = await userLogIn(userDetails);
        const token = response.data.jwt;
        localStorage.setItem("authToken", token);
        navigate("/orderItems");
      } catch (error) {
        errorHandler(error);
      }
    } else {
      try {
        const response = await usersignUp(userDetails);
        setSuccessMessage(response.data);
        setTimeout(() => {
          setSuccessMessage("");
        }, 4000);
      } catch (error) {
        errorHandler(error);
      }
    }
  };

  return (
    <>
      <h1 className="text-center fw-bold" style={{ color: "orange" }}>
        Welcome to Order System Application
      </h1>
      <div className="card-body">
        <form onSubmit={formSubmit} method="post">
          <div className="form-group">
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              id="userName"
              name="userName"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password</label>
            <input
              type="password"
              id="pwd"
              name="password"
              className="form-control"
              required
            />
          </div>
          {!isLoginView && (
            <div className="form-group">
              <p>Role</p>
              <input
                className="form-checkbox"
                type="checkbox"
                id="role"
                name="authorityType"
                value="ROLE_CUSTOMER"
              />
              <label htmlFor="role">Customer</label>
              <br />
              <input
                className="form-checkbox"
                type="checkbox"
                id="role"
                name="authorityType"
                value="ROLE_ADMIN"
              />
              <label htmlFor="role">Admin</label>
            </div>
          )}
          <div className="form-group">
            <input
              type="submit"
              value={isLoginView ? "Sign In" : "Sign Up"}
              className="btn btn-primary mt-3 w-100"
            />
          </div>
        </form>
        <button
          onClick={() => {
            setLoginView(!isLoginView);
          }}
        >
          {isLoginView ? "New user? Sign Up" : "Exisitng User? Sign In"}
        </button>
      </div>
      {errorMessage && (
        <div
          className="alert alert-danger text-center my-3 mx-auto"
          style={{ maxWidth: "400px" }}
          role="alert"
        >
          <strong>Error:</strong>
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div
          className="alert alert-success text-center my-3 mx-auto"
          style={{ maxWidth: "400px" }}
          role="alert"
        >
          <strong>Success:</strong>
          {successMessage}
        </div>
      )}
    </>
  );
}

export default HomePage;
