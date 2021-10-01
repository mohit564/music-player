import React from "react";
import { Link } from "react-router-dom";

function MusicItem(props) {
  return (
    <div className="col">
      <Link
        to={`/songs/${props.item.id}`}
        className="text-reset text-decoration-none fw-bold"
      >
        <div className="card h-100">
          <figure>
            <img
              src={props.item.image}
              alt="Albumart"
              className="card-img-top"
              loading="lazy"
            ></img>
            <figcaption>
              <div className="card-body">
                <small
                  className="card-title"
                  dangerouslySetInnerHTML={{
                    __html: props.item.title || props.item.song,
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

export default MusicItem;
