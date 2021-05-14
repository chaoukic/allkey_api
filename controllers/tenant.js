/**
 * Create all CRUD statements for a Tenants
 */
const helper = require("../lib/passwords");
const poolObject = require("../database/db");
const findAllTenants = (req, res, next) => {
  const pool = poolObject.pool("tenants");
  return pool
    .query("SELECT * FROM tenants ORDER BY id ASC")
    .then((results) => {
      res.locals.result = {
        status: "valid",
        data: results.rows,
        message:
          "The following user has requested to fetch all the tenants in the database : " +
          req,
      };
      next();
    })
    .catch((error) => {
      throw error;
    });
};

const createTenant = (req, res, next) => {
  const pool = poolObject.pool("tenants");
  const hash = helper.hashPassword(req.body.password);
  const query = {
    text: "INSERT INTO tenants (Firstname, Lastname, Phonenumber,Email, Password ) VALUES ($1,$2,$3,$4, $5) ",
    values: [
      req.body.firstname,
      req.body.lastname,
      req.body.phonenumber,
      req.body.email,
      hash,
    ],
  };
  return pool
    .query(query)
    .then((results) => {
      res.locals.result = {
        status: "valid",
        data: results.rows,
        message:
          "Tenant Profile with email " + req.body.email + " has been created",
      };
      next();
    })
    .catch((error) => {
      throw error;
    });
};

const updateTenant = (req, res, next) => {
  const pool = poolObject.pool("tenants");
  const query = {
    text: "UPDATE tenants SET  Firstname= $1, Lastname = $2 , Phonenumber = $3 WHERE id = $4",
    values: [
      req.body.firstname,
      req.body.lastname,
      req.body.phonenumber,
      req.body.id,
    ],
  };
  return pool
    .query(query)
    .then((results) => {
      res.locals.result = {
        status: "valid",
        data: results.rows,
        message: "Tenant Profile with id " + req.body.id + " has been updated",
      };
      next();
    })
    .catch((error) => {
      throw error;
    });
};

const validatePhoneVerificiation = (req, res, next) => {
  const pool = poolObject.pool("tenants");
  const query = {
    text: "UPDATE tenants SET  PhoneVerification= $1 WHERE id = $2",
    values: [true, req.body.id],
  };
  return pool
    .query(query)
    .then((results) => {
      res.locals.result = {
        status: "valid",
        data: results.rows,
        message: "Your phone verification has been completed",
      };
      next();
    })
    .catch((error) => {
      throw error;
    });
};

const validateAdminVerification = (req, res, next) => {
  const pool = poolObject.pool("tenants");
  const query = {
    text: "UPDATE tenants SET  AdminVerification= $1 WHERE id = $2",
    values: [true, req.body.id],
  };
  return pool
    .query(query)
    .then((results) => {
      res.locals.result = {
        status: "valid",
        data: results.rows,
        message: "Tenant has been verified by an admin",
      };
      next();
    })
    .catch((error) => {
      throw error;
    });
};

const findTenant = (req, res, next) => {
  const pool = poolObject.pool("tenants");
  const query = {
    text: "Select * FROM tenants WHERE id = $1",
    values: [req.body.id],
  };
  return pool
    .query(query)
    .then((results) => {
      res.locals.result = {
        status: "valid",
        data: results.rows,
        message: "Fetching tenant with the following id " + req.body.id,
      };
      next();
    })
    .catch((error) => {
      throw error;
    });
};

const login = (req, res, next) => {
  const pool = poolObject.pool("tenants");
  const query = {
    text: "Select password from tenants where email = $1",
    values: [req.body.email],
  };
  const result = pool
    .query(query)
    .then((results) => {
      return results.rows;
    })
    .catch((error) => {
      throw error;
    });
  if (helper.comparePassword(req.body.password, result["password"])) {
    res.locals.result = {
      status: "valid",
      result: true,
      message:
        "Valid login for the tenant with the following email " + req.body.email,
    };
    next();
  } else {
    res.locals.result = {
      status: "invalid",
      error_code: 100,
      data: false,
      message:
        "Invalid login for the tenant with the following email " +
        req.body.email,
    };
    next();
  }
};

module.exports = {
  findTenant,
  findAllTenants,
  createTenant,
  updateTenant,
  validatePhoneVerificiation,
  validateAdminVerification,
  login,
};
