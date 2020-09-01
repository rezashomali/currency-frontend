import React from "react";
import "./Result.scss";
interface Props {
  data: number;
  symbol: string;
}

const Result: React.FC<Props> = ({ data, symbol }) => {
  return (
    <div className="result">
      <span>{symbol}</span>
      <p> {data} </p>
    </div>
  );
};

export default Result;
