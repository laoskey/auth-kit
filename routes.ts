/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 *@type {string[]}
 * **/
export const publicRoutes = ["/", "/new-verification"];

/**
 * An array of routes that are use for authentication
 * These routes will redirect loggedin users to /settings
 *@type {string[]}
 * **/
export const authRoutes = [
  "/login",
  "/register",
  "/error",
  "/reset",
  "/new-password",
];

/**
 * the prefix for API  authentication routes
 * Routess that start with this prefix are used for API authentication purposes
 *@type {string[]}
 * **/
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 *@type {string[]}
 * **/

export const DEFAULT_LOGGIN_REDIRECT = "/setting";
