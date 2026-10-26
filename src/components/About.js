
const About = () => {

  return (
  <div
    className="container"
    style={{ maxWidth: "1100px", color: "#252a31" }}
  >
    <div className="mb-4">
      <p
        className="text-uppercase mb-3"
        style={{
          fontSize: "12px",
          letterSpacing: "3px",
          color: "#858b94",
          fontWeight: "600",
        }}
      >
        Discover iNotebook
      </p>

      <h1
        
        style={{
          fontSize: "clamp(32px, 4vw, 48px)",
          fontWeight: "600",
          letterSpacing: "-1.5px",
        }}
      >
        About iNotebook
      </h1>

    </div>

    <div className="accordion" id="aboutAccordion">
      {[
        {
          id: "one",
          title: "What is iNotebook?",
          text: "iNotebook is a digital workspace designed to help you create, view, update, and delete notes with ease. Keep your important information organized in one simple place.",
        },
        {
          id: "two",
          title: "Key Features",
          text: "Create notes, edit existing content, remove notes you no longer need, and manage your information through a clean and straightforward interface.",
        },
        {
          id: "three",
          title: "Privacy and Security",
          text: "Account-based authentication helps restrict access to personal notes. Your information is managed through your account, so you can work in your own dedicated space.",
        },
        {
          id: "four",
          title: "Our Philosophy",
          text: "We believe the best tools stay out of your way. iNotebook focuses on simplicity, clarity, and a distraction-free note-taking experience.",
        },
      ].map((item, index) => (
        <div
          className="accordion-item"
          key={item.id}
          style={{
            border: "none",
            borderBottom: "1px solid #e8e9eb",
            background: "transparent",
          }}
        >
          <h2 className="accordion-header">
            <button
              className={`accordion-button ${index !== 0 ? "collapsed" : ""}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#${item.id}`}
              aria-expanded={index === 0}
              aria-controls={item.id}
              style={{
                backgroundColor: "transparent",
                color: "#30343b",
                boxShadow: "none",
                padding: "24px 8px",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              <span
                style={{
                  color: "#a0a4aa",
                  fontSize: "12px",
                  letterSpacing: "1px",
                  marginRight: "22px",
                }}
              >
                0{index + 1}
              </span>
              {item.title}
            </button>
          </h2>

          <div
            id={item.id}
            className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
            data-bs-parent="#aboutAccordion"
          >
            <div
              className="accordion-body"
              style={{
                padding: "0 8px 26px 45px",
                maxWidth: "800px",
                fontSize: "15px",
                lineHeight: "1.9",
                color: "#737982",
              }}
            >
              {item.text}
            </div>
          </div>
        </div>
      ))}
    </div>

    <div
      className="mt-5 pt-4"
      style={{ borderTop: "1px solid #e8e9eb" }}
    >
      <p
        className="mb-2"
        style={{
          fontSize: "18px",
          fontWeight: "500",
          letterSpacing: "-0.3px",
        }}
      >
        Less clutter. More clarity.
      </p>

      <p
        className="mb-0"
        style={{
          fontSize: "14px",
          color: "#858b94",
          lineHeight: "1.8",
        }}
      >
        Your space for thoughts, ideas, and everything worth remembering.
      </p>
    </div>
  </div>
  
  )
}

export default About





