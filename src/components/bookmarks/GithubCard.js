import React from "react";
import { StarOutlined } from "@ant-design/icons";

function GithubCard({ name, description, owner, stars }) {
  return (
    <div className="github-card">
      <div className="card-top">
        <div className="text-left">
          <h4>{name}</h4>
          <p>{description}</p>
        </div>
      </div>

      <div className="card-bottom">
        <div className="stars">
          <StarOutlined />
          <p>{stars}</p>
        </div>

        <div className="text-right">
          <p>Owner: {owner}</p>
        </div>
      </div>
    </div>
  );
}

export default GithubCard;
