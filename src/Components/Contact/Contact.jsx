import React from "react";
import { useSelector } from "react-redux";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import black_arrow from "../../assets/dark-arrow.png";
import location_icon from "../../assets/location-icon.png";
import mail_icon from "../../assets/mail-icon.png";
import msg_icon from "../../assets/msg-icon.png";
import phone_icon from "../../assets/phone-icon.png";
import white_arrow from "../../assets/white-arrow.png";
import "./Contact.css";

const Contact = () => {
  const theme = useSelector((state) => state.theme.value) ? "dark" : "light";
  const reversetheme = useSelector((state) => state.theme.value)
    ? "light"
    : "dark";
  const arrowImage = theme === "light" ? white_arrow : black_arrow;
  const [emailError, setEmailError] = React.useState("");

  const [result, setResult] = React.useState("");
  
  //-----email vaidation check
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const approvedDomains = [".com", ".in", ".org", ".net"]; // Add more domains as needed
    
    if (emailPattern.test(email)) {
      let domain = email.substring(email.lastIndexOf("."));
      return approvedDomains.includes(domain);
    } else {
      return false;
    }
  };
  const [mobileNumber, setMobileNumber] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [isDisabled, setIsDisabled] = React.useState(true);
  const handleInputChange = (event) => {
    const value = event.target.value;
    
    if (/^\d*$/.test(value)) {
      setMobileNumber(value);

      // Regular expression to match exactly 10 digits
      const regex = /[2-9]{2}\d{8}/;
      if ( regex.test(value)) {
        setMessage(value.length === 10 ? 'Mobile number is valid.' : 'Mobile number not valid. It must be exactly 10 digits and should not start with 0 or 1.');
     setIsDisabled(value.length===10?false:true)
      } 
      else {
        setMessage('Mobile number must be exactly 10 digits and should not start with 0 or 1.');
        setIsDisabled(true)
      }
    } else {
      setMessage('Only digits are allowed.');
      setIsDisabled(true)
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    setEmailError(""); // Reset email error message
setMessage("")
    const formData = new FormData(event.target);
    const email = formData.get("email");

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      setResult("");
      return;
    }


    formData.append("access_key", "5759d7fc-28f1-473a-a904-ab8d5f981280");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      toast("✅Form Submitted Successfully!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        closeButton: false,
        transition: Slide,
        className: "custom-toast",
        bodyClassName: "custom-toast-body",
      });
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
      toast.error("🚫 Form Submission Failed!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        closeButton: false,
        theme: "light",
        transition: Slide,
        className: "custom-toast",
        bodyClassName: "custom-toast-body",
      });
    }
  };

  return (
    <div className={`contact ${theme}`} id="contact">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        closeButton:false
        theme="light"
        transition={Slide}
      />
      <div className="contact-col">
        <h3 className="send">
          Send us a message<img src={msg_icon} alt=""></img>
        </h3>
        <p>
          Feel free to reach out through contact form. Your feedback, questions
          and suggestions are important to us.
        </p>
        <ul>
          <li>
            <img src={mail_icon} alt=""></img>
            <a href="mailto:startconnecthub@gmail.com">
              {" "}
              yuvrajraika437@gmail.com
            </a>
          </li>
          <li>
            <img src={phone_icon} alt=""></img>+91 9079918467
          </li>
          <li>
            <img src={location_icon} alt=""></img>Address Noida 62
          </li>
        </ul>
      </div>
      <div className="contact-col">
        <form onSubmit={onSubmit}>
        {/* <p style={{color:'black'}}>{isDisabled==true?'1':'0'}</p> */}
          <label>Your name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            required
          ></input>

          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            required
          ></input>
          {emailError && <span style={{ color: "red" }}>{emailError}</span>}

          <label>Phone number</label>
          <input
             type="text"
             name="phone"
             value={mobileNumber}
             onChange={handleInputChange}
            placeholder="Only digits are allowed and it must be 10 digit and should not start with 0 or 1"
            required
          ></input>
                     {message && <span style={{ color: "red" }}>{message}</span>}

          <label>Write your message here</label>
          <textarea
            name="message"
            rows="6"
            placeholder="Enter your message"
            required
          ></textarea>
          <div className="btn-div">
            <button type="submit" className={`btn ${reversetheme}`} disabled={isDisabled} >
              Submit <img src={arrowImage}></img>
            </button>
          </div>
        </form>
        <span>{result}</span>
      </div>
    </div>
  );
};

export default Contact;
