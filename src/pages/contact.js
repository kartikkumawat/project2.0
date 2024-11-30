import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./css/contact.css";
function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_h3fyrhk", "template_vttff74", form.current, {
        publicKey: "FsRkP14L26NvH543W",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          form.current.reset();
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };
  return (
    <>
      <div className="contact">
        <div className="contactUs">
          <h1>Contact Us</h1>
          <form ref={form} onSubmit={sendEmail}>
            <label>Name</label>
            <br />
            <input
              className="contactInput"
              type="text"
              name="name"
              placeholder="Enter Name"
            />
            <br />
            <br />
            <label>Email</label>
            <br />
            <input
              className="contactInput"
              type="email"
              name="email"
              placeholder="Enter Email"
            />
            <br />
            <br />
            <label>Message</label>
            <br />
            <textarea
              name="message"
              className="contactInput"
              placeholder="Enter Message"
            />
            <br />
            <br />
            <button type="submit" value="Send" className="contactBtn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export default Contact;
