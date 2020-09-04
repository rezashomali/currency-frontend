import React from "react";
import renderer from "react-test-renderer";
import InputAmount from "./index";

test("InputAmount snapshot ", () => {
  const component = renderer.create(
    <InputAmount amount={0} symbol={"$"} onChange={() => {}} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
