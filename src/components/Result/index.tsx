import React from "react";
import "./Result.scss";
interface Props {
  data: number;
}

const Result: React.FC<Props> = ({ data }) => {
  return (
    <div className="result">
      <span>$</span>
      <p> {data} </p>
    </div>
  );
};

export default Result;
