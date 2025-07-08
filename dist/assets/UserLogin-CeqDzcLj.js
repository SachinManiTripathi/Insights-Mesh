import{r as n,u as o,j as e}from"./index-SrrbdRdR.js";import{v as l}from"./v4-BKrj-4V8.js";function g(){const[r,t]=n.useState(""),s=o();return e.jsx("div",{className:"grid h-screen place-items-center bg-gray-100 dark:bg-gray-900",children:e.jsxs("form",{onSubmit:a=>{a.preventDefault(),r.trim()&&(localStorage.setItem("token",l()),s("/"))},className:"rounded-xl bg-white p-6 shadow dark:bg-gray-800",children:[e.jsx("h2",{className:"mb-4 text-lg text-center font-semibold",children:"Login"}),e.jsx("input",{value:r,onChange:a=>t(a.target.value),className:`mb-6 w-full rounded border p-2 bg-white  dark:bg-gray-800\r
                      border border-gray-300 dark:border-gray-600\r
                      text-gray-900 dark:text-gray-100\r
                      placeholder-gray-500 dark:placeholder-gray-400\r
                      p-2\r
                      focus:outline-none focus:ring-2 focus:ring-blue-500\r
                      transition-colors`,placeholder:"Username"}),e.jsx("button",{className:"w-full rounded bg-blue-600 p-2 text-white disabled:opacity-40",disabled:!r.trim(),children:"Click Here to Login"})]})})}export{g as default};
