import { useState, useEffect } from "react";

const GrowingLine = ({ isVisibleEmail }) => {
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    if (isVisibleEmail) {
      const lineHeight = 300;
      setLineHeight(lineHeight);
    } else {
      setLineHeight(0);
    }
  }, [isVisibleEmail]);

  return (
    <div
      className={`line ${isVisibleEmail ? "expand" : ""}`}
      style={{ height: `${lineHeight}px` }}
    >
      <div className="content">
        <h3
          className="text"
          style={{ display: isVisibleEmail ? "block" : "none" }}
        >
          Lewis_webster@hotmail.com
        </h3>
      </div>
      <style jsx>{`
        .line {
          position: fixed;
          top: -5px;
          left: 10%;
          width: 30px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          transition: height 2.5s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1000;
          border-radius: 2px;
          background-color: rgba(var(--callout-rgb), 0.5);
          border: 1px solid rgba(var(--callout-border-rgb), 0.3);
        }

        .content {
          margin-bottom: 110px;
        }

        .text {
          transform: rotate(-90deg); /* Rotate text in opposite direction */
          color: white;
          font-size: 16px;
          padding-left: 15px;
        }

        // .expand {
        //   height: 50%;
        // }
        @media (max-width: 700px) {
        }

        @media (min-width: 701px) and (max-width: 1120px) {
        }
      `}</style>
    </div>
  );
};

export default GrowingLine;
