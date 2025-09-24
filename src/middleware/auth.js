const adminAuth = (req, res, next) => {
  console.log("Admin auth getting checked");
  const token = "xyz";
  const isAuthorized = token === "xyz";
  if (!isAuthorized) {
    res.status(401).send("Unauthorized");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("User auth getting checked");
  const token = "xyz";
  const isAuthorized = token === "xyz";
  if (!isAuthorized) {
    res.status(401).send("Unauthorized");
  } else {
    next();
  }
};

module.exports = { adminAuth,userAuth };
