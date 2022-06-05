import BlogData from "./BlogData";
import NavHomes from "./NavHomes";
import { BsSave2 } from "react-icons/bs";
import { BsFillSaveFill } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { MultiSelect } from "react-multi-select-component";

const AllBlog = () => {
  const options = [
    { label: "Sport", value: "Sport" },
    { label: "Food", value: "Food" },
    { label: "Travel", value: "Travel" },
    { label: "Fashion", value: "Fashion" },
    { label: "Health", value: "Health" },
  ];

  const [allData, setAllData] = useState([]);
  const [selectFilterData, setSelectFilterData] = useState([]);
  const [getDataAdd, setGetDataAdd] = useState([]);
  const [isRefresh, setIsRefresh] = useState(true);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const getInterest = JSON.parse(localStorage.getItem("loggedUser"));

  // Change Data as per Interest and Add

  useEffect(() => {
    const getInterest = JSON.parse(localStorage.getItem("loggedUser"));
    const dataFromAdd = JSON.parse(localStorage.getItem("BlogData"));
    const getmail = JSON.parse(localStorage.getItem("email"));

    if (getInterest) {
      if (dataFromAdd) {
        let filteredData = [];
        const selfBlog = dataFromAdd.filter((el) => el.id === getmail);

        const withOutId = dataFromAdd.filter((el) => el.id !== getmail);

        withOutId.forEach((el) => {
          el.interstedValue.forEach((element) => {
            if (getInterest.interstedValue.includes(element)) {
              filteredData.push(el);
            }
          });
        });

        setGetDataAdd([...selfBlog, ...filteredData]);
        setAllData([...selfBlog, ...filteredData]);
      }
    }
  }, []);

  // Saved Data into saveBlog

  const handleClickofSave = (idforcred) => {
    const arr = [];
    const getDataofAllUser = JSON.parse(localStorage.getItem("detail"));
    const getmail = JSON.parse(localStorage.getItem("email"));

    getDataofAllUser.forEach((data) => {
      if (data.email === getmail) {
        let currentUser = data;
        if (currentUser.blogId && Array.isArray(currentUser.blogId)) {
          if (!data.blogId.includes(idforcred)) {
            toast.success("Bloged Saved");
            currentUser.blogId.push(idforcred);
          } else {
            toast.warn("Bloged Unsaved");
            const updateData = currentUser.blogId.filter((index) => {
              return idforcred !== index;
            });
            currentUser.blogId = updateData;
          }
          localStorage.setItem("loggedUser", JSON.stringify(currentUser));
        } else {
          currentUser.blogId = [idforcred];
        }
        arr.push(currentUser);
      } else {
        arr.push(data);
      }
    });

    localStorage.setItem("detail", JSON.stringify(arr));
    setIsRefresh(!isRefresh);
  };

  // Search Filter handle onCHnage

  const handleOnSearch = (e) => {
    setSearch(e.target.value);
    filteredData.handleOnSearch = e.target.value;

    filteredData();
  };
  const onSelect = (obj) => {
    setSelected(obj);

    filteredData(obj);
  };

  const filteredData = (obj) => {
    let blogs = [...allData];

    if (blogs) {
      const arr = [];
      const id = [];
      if (filteredData.handleOnSearch) {
        console.log(">>>>>>", filteredData.handleOnSearch);
        console.log();
        let inputFilter = [];
        if (selected.length > -1) {
          console.log("length", selected.length);
          console.log("before title  >>>>>>>", blogs);
          inputFilter = getDataAdd.filter((data) => {
            return data.title
              .toLowerCase()
              .includes(filteredData.handleOnSearch.toLowerCase());
          });
        } else {
          blogs = allData.filter((data) => {
            return data.title
              .toLowerCase()
              .includes(filteredData.handleOnSearch.toLowerCase());
          });
        }
        console.log("after title >>>>>>>", blogs);
        setAllData(blogs);
      }

      if (selected.length > -1) {
        console.log("length", selected.length);

        if (search) {
          if (obj) {
            console.log("Data before select all", allData);

            getDataAdd.forEach((data) => {
              obj.forEach((item) => {
                if (data.interstedValue.includes(item.value)) {
                  if (!id.includes(data.idforcred)) {
                    arr.push(data);
                    id.push(data.idforcred);
                  }
                }
              });
            });
            console.log("Data after select get", allData);

            blogs = arr;
          }
        } else {
          if (obj) {
            console.log("Data before select all", allData);

            allData.forEach((data) => {
              obj.forEach((item) => {
                if (data.interstedValue.includes(item.value)) {
                  if (!id.includes(data.idforcred)) {
                    arr.push(data);
                    id.push(data.idforcred);
                  }
                }
              });
            });
            console.log("Data after select get", allData);

            blogs = arr;
          }
        }
      }
      setAllData(blogs);
    }
    setGetDataAdd(blogs);
  };

  // Render Data
  return (
    <>
      <div>
        <NavHomes />
        <div className="input-group  mt-4 mb-5">
          <div className="form-outline">
            <input
              type="search"
              id="form1"
              value={search}
              onChange={handleOnSearch}
              placeholder="Search topic"
              className="form-control"
            />
          </div>

          <div className="form-outline mx-5">
            <MultiSelect
              type="search"
              options={options}
              value={selected}
              onChange={onSelect}
              labelledBy="Select As Per Interest"
            />
          </div>
        </div>

        {getDataAdd.length !== 0 ? (
          <>
            <div>
              <div>
                {getDataAdd.map((elem, id) => {
                  return (
                    <>
                      <div>
                        <div>
                          <BlogData
                            title={elem.title}
                            interstedValue={elem.interstedValue}
                            description={elem.description}
                          />
                        </div>
                        <div className="mb-5">
                          {getInterest.blogId &&
                          getInterest.blogId.indexOf(elem.idforcred) > -1 ? (
                            <BsFillSaveFill
                              onClick={() => {
                                handleClickofSave(elem.idforcred);
                              }}
                              cursor="pointer"
                              style={{
                                height: "25px",
                                width: "25px",
                                marginLeft: "450px",
                              }}
                            />
                          ) : (
                            <BsSave2
                              onClick={() => {
                                handleClickofSave(elem.idforcred);
                              }}
                              cursor="pointer"
                              style={{
                                height: "25px",
                                width: "25px",
                                marginLeft: "450px",
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mt-5">
              <p
                className="fs-2"
                style={{
                  textAlign: "center",
                }}
              >
                No Blogs
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AllBlog;
