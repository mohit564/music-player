import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Loader from "./components/Loader";
const Navbar = React.lazy(() => import("./components/Navbar"));
const Home = React.lazy(() => import("./pages/Home"));
const Search = React.lazy(() => import("./pages/Search"));
const Song = React.lazy(() => import("./pages/Song"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const PlayListMusicItems = React.lazy(() =>
  import("./components/PlayListCard/PlayListMusicItems")
);

function App() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Navbar />
        <main>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/search" component={Search} />
            <Route path="/songs/:songId" component={Song} />
            <Route
              path="/playlists/:playlistId"
              component={PlayListMusicItems}
            />
            <Route path="*" component={NotFound} />
          </Switch>
        </main>
      </Suspense>
    </Router>
  );
}

export default App;
