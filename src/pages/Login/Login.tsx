import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import Loader from "../../components/Loader/Loader"

import logo from "../../assets/images/Group.svg";
import welcome from "../../assets/images/Welcome!.svg";
import split1 from "../../assets/images/pablo-sign-in 1.svg";

interface LoginFormState {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginFormState>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

 const validate = (): boolean => {
  const newErrors: { email?: string; password?: string } = {};

  const email = form.email.trim();
  const password = form.password.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  if (!email) {
    newErrors.email = "Email is required";
  } else if (!emailRegex.test(email)) {
    newErrors.email = "Enter a valid email address";
  }

  if (!password) {
    newErrors.password = "Password is required";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard"); 
    });
  };

  return (
    <div className="login">
      <div className="header">
        <img className="kin" src={logo} alt="Logo" />
      </div>

      <div className="split">
        <div>
          <img className="split1" src={split1} alt="Split Illustration" />
        </div>

        <div className="login-form">
          <img src={welcome} alt="Welcome Illustration" />
          <p className="text">Enter Details to login.</p>

          <form onSubmit={handleSubmit} noValidate>
            <div>
              <input
                className="input"
                type="text"
                placeholder="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div className="input-container">
              <input
                className="input1"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
              <span
                className="toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "HIDE" : "SHOW"}
              </span>
            </div>
              {errors.password && <p className="error">{errors.password}</p>}

            <div className="footer">
              <h6 className="forgot">FORGOT PASSWORD?</h6>
              <button className="btn" type="submit" disabled={loading}>
                {loading ? (
                  <span className="btn__loader" aria-label="Loading">
                    <Loader />
                  </span>
                ) : (
                  "LOG IN"
                )}
              </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};



export default Login;
