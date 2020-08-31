import React from "react";

interface Props {
  data: number;
}

const Result: React.FC<Props> = ({ data }) => {
  return (
    <div>
      <span>$</span>
      <p> {data} </p>
    </div>
  );
};

export default Result;
