import React from "react";
import renderer from "react-test-renderer";
import MoneySelector from "./index";

test("MoneySelector snapshot ", () => {
  const component = renderer.create(
    <MoneySelector
      label="To"
      values={{
        USD: "$ USD - Dollar",
        EUR: "€ EUR - Euro",
        CHF: "ƒ CHF - Swiss Franc",
      }}
      selectedCurrency="EUR"
      onChange={() => {}}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
