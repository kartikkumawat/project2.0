import React, { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq">
      <div className="containers">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item" onClick={() => toggleAnswer(0)}>
          <h3 className="faq-question">How do I create a paper?</h3>
          {activeIndex === 0 && (
            <p className="faq-answer">
              Follow the steps in the <strong>"How to Create a Paper"</strong>{" "}
              section.
            </p>
          )}
        </div>
        <div className="faq-item" onClick={() => toggleAnswer(1)}>
          <h3 className="faq-question">How can I download the paper?</h3>
          {activeIndex === 1 && (
            <p className="faq-answer">
              Once you’ve completed the paper, click on the download button to
              save it in <strong>PDF</strong> or <strong>DOCX</strong> format.
            </p>
          )}
        </div>
        <div className="faq-item" onClick={() => toggleAnswer(2)}>
          <h3 className="faq-question">How do I see old papers?</h3>
          {activeIndex === 2 && (
            <p className="faq-answer">
              You can access old papers from your user dashboard under the{" "}
              <strong>"My Papers"</strong> section.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
