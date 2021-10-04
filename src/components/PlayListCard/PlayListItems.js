import React from "react";

import PlayListItem from "./PlayListItem";

function PlayListItems(props) {
  const items = props.items || [];
  return (
    <div className="container">
      <h4 className="my-4">Trending Playlists</h4>
      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 row-cols-xl-6 g-3 mb-4">
        {items.map((item) => (
          <PlayListItem key={item.listid} item={item} />
        ))}
      </div>
    </div>
  );
}

export default PlayListItems;
