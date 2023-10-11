import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import GithubCard from "../components/bookmarks/GithubCard";

function Bookmarks() {
  const [bookmarkedRepos, setBookmarkedRepos] = useState();

  useEffect(() => {
    const bookmarkedReposExist = localStorage.getItem("bookmarkedRepos");

    if (bookmarkedReposExist) {
      const bookmarkedRepos = JSON.parse(bookmarkedReposExist);
      setBookmarkedRepos(bookmarkedRepos);
    } else {
      console.log("No Repos");
    }
  }, []);

  return (
    <div className="bookmarks">
      <div className="header">
        <h2 className="title">Bookmarked Repos</h2>
        <p className="subtitle">List of bookmarked repos</p>
      </div>
      <hr />
      <div className="body">
        <Row gutter={[16, 24]}>
          {bookmarkedRepos?.map((bookmarkedRepo, index) => (
            <Col span={6} key={index}>
              <GithubCard
                name={bookmarkedRepo.name}
                description={bookmarkedRepo.description}
                owner={bookmarkedRepo.owner}
                stars={bookmarkedRepo.stars}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Bookmarks;
