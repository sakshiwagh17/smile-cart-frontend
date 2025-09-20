import Home from "components/Home";
import PageNotFound from "components/PageNotFound";
import Product from "components/Product";
import { NavLink, Route, Switch } from "react-router-dom";

import "./App.css";

// eslint-disable-next-line import/extensions
// import Product from "./components/Product.jsx";

const App = () => (
  <>
    <div className="flex space-x-2">
      <NavLink exact activeClassName="underline font-bold" to="/">
        Home
      </NavLink>
      <NavLink exact activeClassName="underline font-bold" to="/product">
        Product
      </NavLink>
    </div>
    <Switch>
      <Route exact component={Product} path="/product" />
      <Route exact component={Home} path="/" />
      <Route component={PageNotFound} path="*" />
    </Switch>
  </>
);

export default App;
