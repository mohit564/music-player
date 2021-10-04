import React from "react";
import { Link } from "react-router-dom";

function PlayListItem(props) {
  return (
    <div className="col">
      <Link
        to={`/playlists/${props.item.listid}`}
        className="text-reset text-decoration-none fw-bold"
      >
        <div className="card h-100">
          <figure>
            <img
              // change image url to get 500x500 image
              src={props.item.image.replace(/(\d{3}x\d{3})/, "500x500")}
              alt="album-art"
              className="card-img-top"
              loading="lazy"
            ></img>
            <figcaption>
              <div className="card-body">
                <small
                  className="card-title"
                  dangerouslySetInnerHTML={{
                    __html: props.item.listname,
                  }}
                />
              </div>
            </figcaption>
          </figure>
        </div>
      </Link>
    </div>
  );
}

export default PlayListItem;
