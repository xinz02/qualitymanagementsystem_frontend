// import React from "react";

// const ProcedureMainPage = () => {
//   return (
//     <div className="flex flex-col items-center justify-center m-12">
//       <div className="text-4xl font-extrabold mb-5">Procedures</div>
//       <div className="flex">
//         <div className="m-5">
//           <div className="collapse collapse-arrow bg-base-100 border border-base-300">
//             <input type="radio" name="my-accordion-2" defaultChecked />
//             <div className="collapse-title font-semibold">
//               How do I create an account?
//             </div>
//             <div className="collapse-content text-sm">
//               Click the "Sign Up" button in the top right corner and follow the
//               registration process.
//             </div>
//           </div>
//           <div className="collapse collapse-arrow bg-base-100 border border-base-300">
//             <input type="radio" name="my-accordion-2" />
//             <div className="collapse-title font-semibold">
//               I forgot my password. What should I do?
//             </div>
//             <div className="collapse-content text-sm">
//               Click on "Forgot Password" on the login page and follow the
//               instructions sent to your email.
//             </div>
//           </div>
//           <div className="collapse collapse-arrow bg-base-100 border border-base-300">
//             <input type="radio" name="my-accordion-2" />
//             <div className="collapse-title font-semibold">
//               How do I update my profile information?
//             </div>
//             <div className="collapse-content text-sm">
//               Go to "My Account" settings and select "Edit Profile" to make
//               changes.
//             </div>
//           </div>
//         </div>

//         <div className="m-5">
//           <div className="collapse collapse-arrow bg-base-100 border border-base-300">
//             <input type="radio" name="my-accordion-2" defaultChecked />
//             <div className="collapse-title font-semibold">
//               How do I create an account?
//             </div>
//             <div className="collapse-content text-sm">
//               Click the "Sign Up" button in the top right corner and follow the
//               registration process.
//             </div>
//           </div>
//           <div className="collapse collapse-arrow bg-base-100 border border-base-300">
//             <input type="radio" name="my-accordion-2" />
//             <div className="collapse-title font-semibold">
//               I forgot my password. What should I do?
//             </div>
//             <div className="collapse-content text-sm">
//               Click on "Forgot Password" on the login page and follow the
//               instructions sent to your email.
//             </div>
//           </div>
//           <div className="collapse collapse-arrow bg-base-100 border border-base-300">
//             <input type="radio" name="my-accordion-2" />
//             <div className="collapse-title font-semibold">
//               How do I update my profile information?
//             </div>
//             <div className="collapse-content text-sm">
//               Go to "My Account" settings and select "Edit Profile" to make
//               changes.
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProcedureMainPage;

// import { useEffect, useState } from "react";
// import { Category } from "../interface/Category";

// const ProceduresPage = () => {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     fetch("/api/categories") // Fetch categories from backend
//       .then((res) => res.json())
//       .then((data) => setCategories(data));
//   }, []);

//   // Split categories into two even columns
//   const midIndex = Math.ceil(categories.length / 2);
//   const leftColumn = categories.slice(0, midIndex);
//   const rightColumn = categories.slice(midIndex);

//   return (
//     <div className="grid grid-cols-2 gap-4">
//       <div>
//         {leftColumn.map((category) => (
//           <Dropdown key={category.categoryName} category={category} />
//         ))}
//       </div>
//       <div>
//         {rightColumn.map((category) => (
//           <Dropdown key={category.categoryName} category={category} />
//         ))}
//       </div>
//     </div>
//   );
// };

// const Dropdown: React.FC<{ category: Category }> = ({ category }) => {  return (
//     <div className="bg-pink-300 p-2 rounded-md">
//       <button className="w-full text-left font-bold">
//         {category.categoryName}
//       </button>
//       <ul className="mt-2 bg-white p-2 rounded-md">
//         {category.procedures.map((proc, index) => (
//           <li key={index}>{proc.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProceduresPage;

import React from "react";

const ProceduresPage = () => {
  return <div>ProceduresPage</div>;
};

export default ProceduresPage;
