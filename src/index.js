import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <App />
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// import React, { useState, useEffect } from "react";

// import React, { useState, useEffect } from "react";

// import Blog from "./Blog";
// import { BsSave, BsSaveFill } from "react-icons/bs";
// import { BlogWrap } from "./Blog";
// import { Select } from "antd";
// const AllBlog = () => {
//   const [filterSaveData, setFilterSaveData] = useState([]);  // Duplicate
//   const [filterData, setfilterData] = useState([]);  // All Blog
//   const [userData, setUserData] = useState(
//     JSON.parse(localStorage.getItem("data")) || []
//   );
//   const [saved, setSaved] = useState([]);
//   const [login_id, setlogin_id] = useState();
//   const [saveBlogIds, setsaveBlogIds] = useState([]);
//   const [filterValue, setFilterValue] = useState(""); //handlechange title
//   const [topic, setTopic] = useState([]); //handlechange interested
//   const [inputFilterData, setInputFilterData] = useState([]); //needed
//   const [selectData, setSelectData] = useState([]);//needed
//   const { Option } = Select;
//   useEffect(() => {

//     const userData = JSON.parse(localStorage.getItem("data"));
//     setUserData(userData);
//     const login_id = JSON.parse(localStorage.getItem("LogIn_id"));
//     setlogin_id(login_id);
//     filterBlogData();
//     const saved = localStorage.getItem("saveBlog");
//     if (saved) {
//       const saveIds = JSON.parse(saved);
//       setSaved(saveIds);
//     }

//   }, [saveBlogIds]);
//   const filterBlogData = () => {
//     const blogData = JSON.parse(localStorage.getItem("Blog"));
//     const data = JSON.parse(localStorage.getItem("LogUser"));
//     const login_id = JSON.parse(localStorage.getItem("LogIn_id"));
//     if (blogData && data) {
//       let selectValueArray = data.selectvalue;
//       const LogInUserBlog = blogData.filter((data) => {
//         return data.id == login_id;
//       });
//       const otherUserBlog = blogData.filter((data) => {
//         return data.id != login_id;
//       });
//       let elementFilter = [];
//       for (let i = 0; i < selectValueArray.length; i++) {
//         if (otherUserBlog.length != 0) {
//           otherUserBlog.forEach((element) => {
//             if (element.topic.includes(selectValueArray[i])) {
//               if (!filterData.includes(element)) {
//                 elementFilter.push(element);
//               }
//             }
//           });
//         }
//         const updateFilter = elementFilter.concat(LogInUserBlog);
//         const id_Blog = updateFilter.map((data, index) => {
//           return { ...data, save_id: login_id };
//         });
//         setfilterData(id_Blog);
//         setFilterSaveData(id_Blog);
//       }
//     }
//   };
//   const filterChangeHandler = (event) => {
//     let filtervalue = event.target.value;
//     filterTitle.filterChangeHandler = filtervalue;
//     setFilterValue(filtervalue);
//     filterTitle();
//   };
//   const handleChange = (value) => {
//     setTopic(value);
//     filterTitle(value);
//   };
//   const filterTitle = (value) => {

//     let searchFilterData = [...filterSaveData];
//     if (searchFilterData) {
//       let arr = [];
//       let blogId = [];
//       if (filterTitle.filterChangeHandler) {
//         let searchInputFilter = [];
//         if (selectData.length !== 0) {
//           searchFilterData = selectData.filter((data) => {
//             return data.title
//               .toLowerCase()
//               .includes(filterTitle.filterChangeHandler.toLowerCase());
//           });
//           searchInputFilter = searchFilterData;
//         } else {
//           searchFilterData = searchFilterData.filter((data) => {
//             return data.title
//               .toLowerCase()
//               .includes(filterTitle.filterChangeHandler.toLowerCase());
//           });
//           searchInputFilter = searchFilterData;
//         }
//         setInputFilterData(searchInputFilter);
//       }
//       if (
//         filterTitle.filterChangeHandler == undefined ||
//         filterValue.length !== 0
//       ) {
//         if (value) {
//           if (value.length !== 0) {
//             searchFilterData.forEach((data) => {
//               value.forEach((item, index) => {
//                 if (data.topic.includes(item)) {
//                   if (!blogId.includes(data.blog_id)) {
//                     arr.push(data);
//                     blogId.push(data.blog_id);
//                   }
//                 }
//               });
//             });
//             searchFilterData = arr;
//           }
//         } else {
//           if (topic.length !== 0) {
//             searchFilterData.forEach((data) => {
//               topic.forEach((item, index) => {
//                 if (data.topic.includes(item)) {
//                   if (!blogId.includes(data.blog_id)) {
//                     arr.push(data);
//                     blogId.push(data.blog_id);
//                   }
//                 }
//               });
//             });
//             searchFilterData = arr;
//           }
//         }
//       } else {
//         if (topic.length !== 0) {
//           searchFilterData.forEach((data) => {
//             topic.forEach((item, index) => {
//               if (data.topic.includes(item)) {
//                 if (!blogId.includes(data.blog_id)) {
//                   arr.push(data);
//                   blogId.push(data.blog_id);
//                 }
//               }
//             });
//           });
//           searchFilterData = arr;
//         }
//       }
//       if (value) {
//         if (filterValue.length === 0) {
//           setSelectData(filterSaveData);
//           setInputFilterData([]);
//         }
//         if (value.length > 0) {
//           if (filterValue.length !== 0) {
//             const filterItems = [];
//             const filterId = [];
//             inputFilterData.forEach((element) => {
//               value.forEach((item, index) => {
//                 if (element.topic.includes(item)) {
//                   if (!filterId.includes(element.blog_id)) {
//                     filterItems.push(element);
//                     filterId.push(element.blog_id);
//                   }
//                 }
//               });
//             });
//             searchFilterData = filterItems;
//           } else {
//             searchFilterData.forEach((data) => {
//               value.forEach((item, index) => {
//                 if (data.topic.includes(item)) {
//                   if (!blogId.includes(data.blog_id)) {
//                     arr.push(data);
//                     blogId.push(data.blog_id);
//                   }
//                 }
//               });
//             });
//             searchFilterData = arr;
//           }
//           setSelectData([]);
//         }
//         if (value.length === 0) {
//           if (filterValue !== 0) {
//             searchFilterData = filterSaveData.filter((data) => {
//               return data.title
//                 .toLowerCase()
//                 .includes(filterValue.toLowerCase());
//             });
//           }
//         }
//       }
//       setfilterData(searchFilterData);
//     }
//   };
//   const unsaveHandler = (id) => {
//     let lastSave = [...saved];
//     if (lastSave.includes(id)) {
//       const filters = saved.filter((el) => el !== id);
//       lastSave = [...filters];
//     } else {
//       lastSave.push(id);
//     }
//     setSaved(lastSave);
//     const blogData = JSON.parse(localStorage.getItem("Blog"));
//     let arr_isSave = [];
//     blogData.forEach((data) => {
//       if (id == data.blog_id) {
//         if (data.isSave) {
//           data.isSave = false;
//         } else {
//           data.isSave = true;
//         }
//         arr_isSave.push(data);
//       } else {
//         arr_isSave.push(data);
//       }
//     });
//     let arr = [];
//     userData.forEach((data) => {
//       if (data.id === login_id) {
//         const obj = { ...data, saveBlog: lastSave };
//         arr.push(obj);
//       } else {
//         arr.push(data);
//       }
//     });
//     setsaveBlogIds(lastSave);
//     localStorage.setItem("Blog", JSON.stringify(arr_isSave));
//     localStorage.setItem("data", JSON.stringify(arr));
//     localStorage.setItem("saveBlog", JSON.stringify(lastSave));
//   };
