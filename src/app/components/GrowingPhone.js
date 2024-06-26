const SlideInTextBox = ({ isVisible, setIsVisible }) => {
  return (
    <div className={`textbox ${isVisible ? "slide-in" : ""}`}>
      <div className="content">
        <h3 style={{ display: isVisible ? "block" : "none" }}>
          Call 0750 000 3912
        </h3>
      </div>
      <style jsx>{`
        .textbox {
          position: fixed;
          top: 150px;
          left: -100%;
          transform: translateX(0);
          height: 40px;
          width: 39%;
          overflow: hidden;
          transition: left 2.5s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: end;
          border-radius: 2px;
          background-color: rgba(var(--callout-rgb), 0.5);
          border: 1px solid rgba(var(--callout-border-rgb), 0.3);
        }

        .slide-in {
          left: 0; /* Slide in from the left */
        }

        .content {
          padding: 20px;
          font-size: 25px;
        }

        @media (min-width: 701px) and (max-width: 1120px) {
          .textbox {
            width: 40%;
            height: 3.5vw;
          }

          .content {
            font-size: 2vw;
          }
        }

        @media (max-width: 700px) {
          .textbox {
            width: 55%;
            height: 25px;
          }

          .content {
            font-size: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default SlideInTextBox;
