import { permissions, roles } from "../controllers/rbac/roles_permissions.js";

// Create a middleware to check if user has permission to access the resource
function can(role, action, resource) {
  return roles[role].can.includes(action) && permissions[action].resource === resource;
}

export function authorize(role, action, resource) {
  return (req, res, next) => {
    if (can(role, action, resource)) {
      next();
    } else {
      res.status(403).send("Access denied");
    }
  };
}
