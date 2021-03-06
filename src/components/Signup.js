import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { BoxWrap, InputCss, ButtonCss, Heading } from "./Login.js";
import { MultiSelectCss } from "./Profile";

const Signup = () => {
  const options = [
    { label: "Sport", value: "Sport" },
    { label: "Food", value: "Food" },
    { label: "Travel", value: "Travel" },
    { label: "Fashion", value: "Fashion" },
    { label: "Health", value: "Health" },
  ];

  const [detail, setDetail] = useState(localStorage.getItem("detail") || []);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [about, setAbout] = useState("");
  const [passWord, setPassWord] = useState("");
  const [selected, setSelected] = useState([]);

  const navigate = useNavigate();

  const submitData = (e) => {
    e.preventDefault();
    const mailofdata = detail.map((elm) => elm.email);
    const mobileofData = detail.map((elm) => elm.mobile);
    if (mailofdata.includes(email)) {
      toast.warn("Already Email Exisits!!");
    } else if (mobileofData.includes(mobile)) {
      toast.warn("Already Mobile No. Exisitis!!");
    } else {
      if (name !== "") {
        if (
          email !== "" &&
          email.match(
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
          )
        ) {
          if (mobile === "" || mobile.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
            if (selected.some((obj) => obj)) {
              if (passWord !== "") {
                let interstedValue = [];
                selected.forEach((obj) => interstedValue.push(obj.value));

                let data = {
                  name,
                  email,
                  mobile,
                  about,
                  passWord,
                  interstedValue,
                };

                const totalData = [...detail, data];
                setDetail(totalData);
                setName("");
                setEmail("");
                setMobile("");
                setAbout("");
                setPassWord("");
                setSelected([]);

                localStorage.setItem("detail", JSON.stringify(totalData));

                toast.success("Successfully Signup!");
                navigate("/login");
              } else {
                toast.warn("Please Enter Password!");
              }
            } else {
              toast.warn("Please Select atleast one Interest!");
            }
          } else {
            toast.warn("Enter Valid Number");
          }
        } else {
          toast.warn("Please Enter Valid Email!");
        }
      } else {
        toast.warn("Please Enter Your Name!");
      }
    }
  };
  useEffect(() => {
    const data = localStorage.getItem("detail");

    if (data !== null) {
      setDetail(JSON.parse(data));
    }
  }, []);

  const onSelect = (data) => {
    setSelected(data);
  };

  return (
    <>
      <BoxWrap
        style={{
          margin: "20px auto 0 auto",
          maxWidth: "550px",
          maxHeight: "1000px",
        }}
      >
        <div>
          <div>
            <Heading>SignUp</Heading>
          </div>
          <form>
            <div className="mb-3">
              <label htmlFor="inputName" className="form-label">
                Name <span style={{ color: "red" }}>*</span>
              </label>
              <InputCss
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="form-control"
                id="inputName"
                style={{ width: "350px" }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputEmail" className="form-label">
                Email <span style={{ color: "red" }}>*</span>
              </label>
              <InputCss
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email address"
                className="form-control"
                id="inputEmail"
                style={{ width: "350px" }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="mobileNumber" className="form-label">
                Mobile Number
              </label>
              <InputCss
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter your Mobile Number"
                className="form-control"
                id="mobileNumber"
                style={{ width: "350px" }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="aboutMe" className="form-label">
                About Me
              </label>
              <InputCss
                type="text"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Enter about yourself"
                className="form-control"
                id="aboutMe"
                style={{ width: "350px" }}
              />
            </div>
            <p className="mb-2">Gender </p>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Male
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
              />
              <label
                className="form-check-label mb-3"
                htmlFor="flexRadioDefault2"
              >
                Female
              </label>
            </div>
            <div className="mb-3">
              <p>
                Select Interest <span style={{ color: "red" }}>*</span>
              </p>

              <MultiSelectCss
                options={options}
                value={selected}
                onChange={onSelect}
                labelledBy="Select"
              />
            </div>

            <div className="mb-3 mt-2">
              <label htmlFor="Inputpassword" className="form-label">
                Password <span style={{ color: "red" }}>*</span>
              </label>
              <InputCss
                type="password"
                value={passWord}
                onChange={(e) => setPassWord(e.target.value)}
                placeholder="Enter password"
                className="form-control"
                id="Inputpassword"
                style={{ width: "350px" }}
              />
            </div>

            <ButtonCss type="submit" onClick={submitData}>
              Submit
            </ButtonCss>
            <div className="mb-3 mt-2">
              <p className="form-label">
                Already User? <Link to={"/login"}>Login</Link>
              </p>
            </div>
          </form>
          <div>
            <p>
              <span style={{ color: "red" }}>*</span>Required Field
            </p>
          </div>
        </div>
      </BoxWrap>
    </>
  );
};

export default Signup;
