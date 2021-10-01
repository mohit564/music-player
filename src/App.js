import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Loader from "./components/Loader";
const Navbar = React.lazy(() => import("./components/Navbar"));
const Top30 = React.lazy(() => import("./pages/Top30"));
const Search = React.lazy(() => import("./pages/Search"));
const Song = React.lazy(() => import("./pages/Song"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Navbar />
        <main>
          <Switch>
            <Route path="/" exact component={Top30} />
            <Route path="/search" component={Search} />
            <Route path="/songs" exact component={Top30} />
            <Route path="/songs/:songId" component={Song} />
            <Route path="*" component={NotFound} />
          </Switch>
        </main>
      </Suspense>
    </Router>
  );
}

export default App;
