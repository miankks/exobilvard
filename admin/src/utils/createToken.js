// import axios from "axios";
// import { createContext, useContext, useEffect, useState } from "react";

// const validateToken = async () => {
//   const storedToken = localStorage.getItem("token");
//   if (!storedToken) return;

//   try {
//     await axios.get(`${url}/api/admin/getadmin`, {
//       headers: { Authorization: `Bearer ${storedToken}` },
//     });
//     setToken(storedToken); // token is valid
//   } catch (error) {
//     // token expired or invalid
//     localStorage.removeItem("token");
//     setToken(null);
//   }
// };

// export default validateToken;
