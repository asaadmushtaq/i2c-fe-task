import React, { useState } from "react";
import { Space, Table, Input, Typography, notification } from "antd";
import axios from "axios";
const { Search } = Input;
const { Paragraph } = Typography;

function SearchPage() {
  const [tableData, setTableData] = useState([]);
  const [fetchingData, setFetchingData] = useState(false);

  const bookmarkRepo = (record, action) => {
    if (action === "forward") {
      let updatedBookmarkedRepos = [];

      const bookmarkedReposExist = localStorage.getItem("bookmarkedRepos");

      if (bookmarkedReposExist) {
        const bookmarkedRepos = JSON.parse(bookmarkedReposExist);
        const alreadyBookmarked = bookmarkedRepos.some(
          (bookmarkedRepo) =>
            bookmarkedRepo.name === record.name &&
            bookmarkedRepo.owner === record.owner
        );

        if (!alreadyBookmarked) {
          updatedBookmarkedRepos = [record, ...bookmarkedRepos];
          updateTableAfterAction(record);
          localStorage.setItem(
            "bookmarkedRepos",
            JSON.stringify(updatedBookmarkedRepos)
          );
          notification.success({
            message: "Bookmark Added",
            description: `Bookmark for ${record.name} by ${record.owner} has been added.`,
          });
        }
      } else {
        updatedBookmarkedRepos = [record];
        updateTableAfterAction(record);
        localStorage.setItem(
          "bookmarkedRepos",
          JSON.stringify(updatedBookmarkedRepos)
        );
        notification.success({
          message: "Bookmark Added",
          description: `Bookmark for ${record.name} by ${record.owner} has been added.`,
        });
      }
    } else {
      const bookmarkedReposExist = localStorage.getItem("bookmarkedRepos");
      let updatedBookmarks = [];
      if (bookmarkedReposExist) {
        const bookmarkedRepos = JSON.parse(bookmarkedReposExist);

        console.log(bookmarkedRepos);
        console.log(record);

        updatedBookmarks = bookmarkedRepos.filter(
          (bookmarkedRepo) =>
            bookmarkedRepo.name !== record.name ||
            bookmarkedRepo.owner !== record.owner
        );
      }

      console.log(updatedBookmarks);
      updateTableAfterAction(record);
      localStorage.setItem("bookmarkedRepos", JSON.stringify(updatedBookmarks));
      notification.success({
        message: "Bookmark Removed",
        description: `Bookmark for ${record.name} by ${record.owner} has been removed.`,
      });
    }
  };

  const updateTableAfterAction = (record) => {
    const oldTableData = tableData;

    const updatedTableData = oldTableData.map((row) => {
      if (row.name === record.name && row.owner === record.owner) {
        return record; // Update the object that matches the criteria
      }
      return row; // Keep other objects unchanged
    });

    setTableData(updatedTableData);
  };

  const searchRepos = async (query) => {
    if (query === "") {
      setTableData([]);
    } else {
      setFetchingData(true);
      await axios
        .get(`https://api.github.com/search/repositories?q=${query}+in:name`)
        .then((res) => {
          setFetchingData(false);
          const repositories = res.data.items;
          if (repositories.length === 0) {
            notification.error({
              message: "API Error",
              description: "There was an error while making the API call.",
            });
          }
          console.log(repositories);
          const transformRepos = repositories.map((repo, index) => ({
            key: index,
            name: repo.name,
            owner: repo.owner.login,
            description: repo.description,
            stars: repo.stargazers_count,
          }));

          setTableData(transformRepos);
        })
        .catch((err) => {
          setFetchingData(false);
          console.error("Error fetching repositories:", err);
        });
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "30%",
      render: (record) => (
        <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: "more" }}>
          {record}
        </Paragraph>
      ),
    },
    {
      title: "Stars",
      dataIndex: "stars",
      key: "stars",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        const bookmarkedReposExist = localStorage.getItem("bookmarkedRepos");
        let alreadyBookmarked = false;
        if (bookmarkedReposExist) {
          const bookmarkedRepos = JSON.parse(bookmarkedReposExist);
          alreadyBookmarked = bookmarkedRepos.some(
            (bookmarkedRepo) =>
              bookmarkedRepo.name === record.name &&
              bookmarkedRepo.owner === record.owner
          );
        }

        return (
          <Space size="middle">
            <button
              className="bookmark"
              onClick={() =>
                bookmarkRepo(record, alreadyBookmarked ? "reverse" : "forward")
              }
            >
              {alreadyBookmarked ? "Un-Bookmark" : "Bookmark"}
            </button>
          </Space>
        );
      },
    },
  ];

  return (
    <div className="search">
      <div className="header">
        <h2 className="title">Search</h2>
        <p className="subtitle">Search for Github Repositories</p>
      </div>
      <hr />
      <div className="body">
        <div className="input">
          <Search
            placeholder="Search Repositories"
            allowClear
            enterButton="Search"
            size="large"
            loading={fetchingData}
            onSearch={(e) => searchRepos(e)}
          />
        </div>
        <div className="table">
          <Table
            // style={{ height: "calc(100vh-10rem)" }}
            scroll={{ y: "calc(100vh - 25rem", x: "fit-content" }}
            loading={fetchingData}
            columns={columns}
            dataSource={tableData}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
