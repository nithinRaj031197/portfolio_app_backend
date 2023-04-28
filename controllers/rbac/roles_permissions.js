// Define roles and permissions
export const roles = {
  admin: {
    can: ["managePortfolio"],
  },
  candidate: {
    can: ["viewPortfolio"],
  },
};

// Define permissions
export const permissions = {
  managePortfolio: {
    resource: "portfolio",
  },
  viewPortfolio: {
    resource: "portfolio",
  },
};
