import React from "react";
import renderer from "react-test-renderer";
import Header from "./index";

test("Header snapshot ", () => {
  const component = renderer.create(<Header />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
