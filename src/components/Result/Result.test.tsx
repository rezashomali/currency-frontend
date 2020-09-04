import React from "react";
import renderer from "react-test-renderer";
import Result from "./index";

test("Result snapshot ", () => {
  const component = renderer.create(<Result symbol="$" data={0} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
