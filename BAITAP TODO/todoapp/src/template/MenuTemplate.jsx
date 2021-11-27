import React, { Fragment } from "react";
import { Route } from "react-router-dom";

const MenuLayout = (props) => {
  return <Fragment>{props.children}</Fragment>;
};
export default function MenuTemplate({ Component, ...props }) {
  return (
    <Route
      {...props}
      render={(propsComponent) => (
        <MenuLayout>
          <Component {...propsComponent} />
        </MenuLayout>
      )}
    />
  );
}
