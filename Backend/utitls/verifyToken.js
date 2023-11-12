import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log("Token:", token); // Add this line
  if (!token)
  return next(createError(401, "You are not authorized from token"));
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      console.error("Token verification error:", err);
      return next(createError(403, "Token is not valid"));
    }
    console.log("Decoded user:", user); // Check the decoded user object
    // Make sure userType is included in the decoded user object
    if (!user.userType) {
      return next(createError(403, "User type is missing in token"));
    }
    req.user = user; // Keep this line as it is
    if (user.isAdmin) {
      req.user.userType = "admin";
    } else if (req.user.userType === "diary-manager") {
      req.user.userType = "diary-manager";
    } else if (req.user.userType === "attendance-manager") {
      req.user.userType = "attendance-manager";
    } else if (req.user.userType === "contact-manager") {
      req.user.userType = "contact-manager";
    }
    else {
      req.user.userType = "director";
    }
    next();
  });
};

// verify user
export const verifyUser = (req, res, next) => {
  if (req.user.id === req.params.id) {
    next();
  } else {
    return next(createError(401, "you are not authorized from verifyUser"));
  }
};
// verify admin
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin === true) {
      next();
    } else {
      return next(createError(403, "you are not authorized"));
    }
  });
};


// import jwt from "jsonwebtoken";
// import { createError } from "./error.js";

// // Verify token
// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.access_token;
//   if (!token)
//     return next(createError(401, "You are not authorized from token"));

//   jwt.verify(token, process.env.JWT, (err, user) => {
//     if (err) return next(createError(403, "Token is not valid"));
//     req.user = user;
//     next();
//   });
// };

// // Verify user
// export const verifyUser = (req, res, next) => {
//   if (req.user.id === req.params.id) {
//     next();
//   } else {
//     return next(createError(401, "You are not authorized from verifyUser"));
//   }
// };

// // Verify admin
// export const verifyAdmin = (req, res, next) => {
//   verifyToken(req, res, (err) => {
//     if (err) {
//       return next(err); // Pass the error to the error handling middleware
//     }

//     if (req.user.isAdmin === true) {
//       next();
//     } else {
//       return next(createError(403, "You are not authorized as an admin"));
//     }
//   });
// };
