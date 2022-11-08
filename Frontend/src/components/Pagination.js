// import React from 'react'
// import { useState, Link } from 'react'

// const Pagination = () => {
  
//   const [posts, setPosts] = useState([])
//   const [total, setTotal] = useState("")
//   const [page, setPage] = useState(1)
//   const [postPerPage, setPostPerPage] = useState(5)

// const indexOfLastPage = page * postPerPage
// const indexOfFirstPage = indexOfLastPage - postPerPage
// const currentPosts = posts.slice(indexOfFirstPage, indexOfLastPage)

// const onShowSizeChange =(current,pageSize)=>{
//   setPostPerPage(pageSize)
// }

// const itemRender = (current,type,originalElement) =>{
//   if(type === "prev"){
//     return <Link>Previous</Link>
//   }
//   if(type === "next"){
//     return <Link>Next</Link>
//   }
//   return originalElement;
// }


//   return (
//     <>
//     <Pagination

// onChange={(value)=>setPage(value)}
// pageSize={postPerPage}
// total = {total}
// current={page}
// showSizeChanger
// showQuickJumper
// onShowSizeChange={onShowSizeChange}
// itemRender={itemRender}


// />
//     </>
//   )
// }

// export default Pagination



// import React from "react";
// import { Link } from "react-router-dom";

// const Pagination = ({
//   totalPosts,
//   postsPerPage,
//   setCurrentPage,
//   currentPage,
// }) => {
//   let pages = [];
//   for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
//     pages.push(i);
//   }

//   return (
//     <>
//       <div className="pagination-box">
//         <nav aria-label="...">
//           <ul className="pagination">
            
//             {/* Previous Button */}
            
//             <li className="page-item">
//               <Link
//                 className="page-link"
//                 onClick={() => setCurrentPage(currentPage - 1)}
//               >
//                 {" "}
//                 Prev
//               </Link>
//             </li>

//             {/* Page Numbers */}

//             <div>
//               {pages.map((page, index) => {
//                 return (
//                   <button
//                     id="pagination"
//                     key={index}
//                     className={page === currentPage ? "active" : ""}
//                     onClick={() => setCurrentPage(page)}
//                   >
//                     {page}
//                   </button>
//                 );
//               })}
//             </div>

//               {/* Next Button */}
            
//             <li className="page-item">
//               <Link
//                 className="page-link"
//                 onClick={() => setCurrentPage(currentPage + 1)}
//               >
//                 {" "}
//                 Next
//               </Link>
//             </li>

//           </ul>
//         </nav>
//       </div>
//     </>
//   );
// };

// export default Pagination;
