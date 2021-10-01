import React from "react";

import MusicItem from "./MusicItem";

function MusicList(props) {
  return (
    <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 row-cols-xl-6 g-3 mb-4">
      {props.items.map((item) => (
        <MusicItem key={item.id} item={item} />
      ))}
    </div>
  );
}
export default MusicList;
