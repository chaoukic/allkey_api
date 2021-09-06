/**
 * Create all CRUD statements for a Tenants
 *
 * SMALL NOTE -- ERROR CODE 200 -- REPRESENTS A DATABASE RELATED ISSUE
 *            -- ERROR CODE 100 -- REPRESENTS A INVALID LOGIN MADE BY A USER -- CAN BE A TENANT OR LANDLORD OR CONTRACTOR
 *
 *
 */
const helper = require("../lib/passwords");
const poolObject = require("../database/db");
const findAllTenants = async (req, res, next) => {
  try {
    const pool = poolObject.pool("AllKey");
    const results = await pool.query("SELECT * FROM tenants ORDER BY id ASC");
    res.locals.result = {
      status: "valid",
      data: results[0],
      message:
        "The following user has requested to fetch all the tenants in the database : " +
        req,
    };
    next();
  } catch (error) {
    res.locals.result = {
      status: "invalid",
      responseStatus: 500,
      error_code: 200,
      data: {
        status: false,
        message: "An error occured while processing your request",
      },
      message:
        "An issue happened while fetching all the tenants from the database  \n" +
        "The error is " +
        error +
        "  \n" +
        "The request was made by the following : " +
        req,
    };
    next();
  }
};

const createTenant = async (req, res, next) => {
  try {
    console.log(req.body)
    const pool = poolObject.pool("AllKey");
    const hash = await helper.hashPassword(req.body.password);
    const results = await pool.execute(
      "INSERT INTO tenants (Firstname, Lastname, Phonenumber,Email, Password ) VALUES (?,?,?,?,?)",
      [
        req.body.firstname,
        req.body.lastname,
        req.body.phonenumber,
        req.body.email,
        hash,
      ]
    );
    if (results[0]["affectedRows"] != 1) {
      res.locals.result = {
        status: "valid",
        data: {
          status: false,
          message:
            "An error occured while creating your account, please make sure that you have no account linked to your email",
        },
        message:
          "Tenant Profile with email " +
          req.body.email +
          " has not been created",
      };
    } else {
      res.locals.result = {
        status: "valid",
        data: {
          status: true,
          message: "User has been created",
        },
        message:
          "Tenant Profile with email " + req.body.email + " has been created",
      };
    }
    next();
  } catch (error) {
    res.locals.result = {
      status: "invalid",
      responseStatus: 500,
      error_code: 200,
      data: {
        status: false,
        message:
          "An error occured while creating your account, please make sure that you have no account linked to your email",
      },
      message:
        "An issue happened while trying to create a tenant \n" +
        "The error is " +
        error +
        "  \n" +
        "The request body contained the following : " +
        req.body,
    };
    next();
  }
};

const updateTenant = async (req, res, next) => {
  try {
    const pool = poolObject.pool("AllKey");
    const results = await pool.execute(
      "UPDATE tenants SET  Firstname= ?, Lastname = ? , Phonenumber = ? WHERE id = ?",
      [req.body.firstname, req.body.lastname, req.body.phonenumber, req.body.id]
    );
    if (results[0]["affectedRows"] != 1) {
      res.locals.result = {
        status: "valid",
        data: {
          status: false,
          message:
            "An error occured while updating your account, please make sure that you have respected the our guidelines",
        },
        message:
          "Tenant Profile with email " +
          req.body.email +
          " has not been updated",
      };
    } else {
      res.locals.result = {
        status: "valid",
        data: {
          status: true,
          message: "Your profile has been updated",
        },
        message: "Tenant Profile with id " + req.body.id + " has been updated",
      };
    }
    next();
  } catch (error) {
    res.locals.result = {
      status: "invalid",
      responseStatus: 500,
      error_code: 200,
      data: {
        status: false,
        message:
          "An error occured while updating your account, please make sure that you have respected the our guidelines",
      },
      message:
        "An issue happened while trying to updating a tenant \n" +
        "The error is " +
        error +
        "  \n" +
        "The request body contained the following : " +
        req.body,
    };
    next();
  }
};

const validatePhoneVerificiation = async (req, res, next) => {
  try {
    const pool = poolObject.pool("AllKey");
    const results = await pool.execute(
      "UPDATE tenants SET  PhoneVerification= $1 WHERE email = $2",
      [true, req.body.email]
    );
    if (results[0]["affectedRows"] != 1) {
      res.locals.result = {
        status: "valid",
        data: {
          status: false,
          message: "An error occured while while validating your phone number",
        },
        message:
          "Tenant Profile with email " +
          req.body.email +
          " has not been verified properly",
      };
    } else {
      res.locals.result = {
        status: "valid",
        data: {
          status: true,
          message: "Your phone verification has been completed",
        },
        message:
          "Tenant Profile with email " +
          req.body.email +
          " has been verified by phone",
      };
    }
    next();
  } catch (error) {
    res.locals.result = {
      status: "invalid",
      responseStatus: 500,
      error_code: 200,
      data: {
        status: false,
        message: "An error occured while while validating your phone number",
      },
      message:
        "An issue happened while trying to validate the phone verification of  a tenant \n" +
        "The error is " +
        error +
        "  \n" +
        "The request body contained the following : " +
        req.body,
    };
    next();
  }
};

const validateAdminVerification = async (req, res, next) => {
  try {
    const pool = poolObject.pool("AllKey");
    const results = await pool.execute(
      "UPDATE tenants SET  AdminVerification= ? WHERE email = ?",
      [true, req.body.id]
    );
    if (results[0]["affectedRows"] != 1) {
      res.locals.result = {
        status: "valid",
        data: {
          status: false,
          message: "An error occured while while validating your phone number",
        },
        message:
          "Tenant Profile with email " +
          req.body.email +
          " has not been verified properly",
      };
    } else {
      res.locals.result = {
        status: "valid",
        data: {
          status: true,
          message: "Your phone verification has been completed",
        },
        message:
          "Tenant Profile with email " +
          req.body.id +
          " has been validated by the following admin ----- 'WILL NEED TO ADD INFO ABOUT THE ADMIN WHO ACCEPTED THE USER' ",
      };
    }
    next();
  } catch (error) {
    res.locals.result = {
      status: "invalid",
      responseStatus: 500,
      error_code: 200,
      data: {
        status: false,
        message: "An error occured while while validating your phone number",
      },
      message:
        "An issue happened while trying to validate the admin verification of a tenant \n" +
        "The error is " +
        error +
        "  \n" +
        "The request body contained the following : " +
        req.body,
    };
    next();
  }
};

const findTenant = async (req, res, next) => {
  try {
    const pool = poolObject.pool("AllKey");
    const [results, fields] = await pool.query(
      "Select * FROM tenants WHERE email = ?",
      [req.body.email]
    );
    res.locals.result = {
      status: "valid",
      data: {
        staus: true,
        value: results[0],
      },
      message: "Fetching tenant with the following email " + req.body.email,
    };
    next();
  } catch (error) {
    res.locals.result = {
      status: "invalid",
      responseStatus: 500,
      error_code: 200,
      data: "An error occured ",
      message:
        "An issue happened while fetching a tenant from the USERS database  \n" +
        "The error is " +
        error +
        "  \n" +
        "The request was made by the following : " +
        req,
    };
    next();
  }
};

const login = async (req, res, next) => {
  try {
    const pool = poolObject.pool("AllKey");
    const [result, fields] = await pool.query(
      "Select password from tenants where email = ?",
      [req.body.email]
    );
    if (helper.comparePassword(req.body.password, result[0]["password"])) {
      res.locals.result = {
        status: "valid",
        data: true,
        message:
          "Valid login for the tenant with the following email " +
          req.body.email,
      };
      next();
    } else {
      res.locals.result = {
        status: "invalid",
        responseStatus: 403,
        error_code: 100,
        data: {
          status: false,
          message: "Invalid Login, password or email are not matched",
        },
        message:
          "Invalid login for the tenant with the following email " +
          req.body.email,
      };
      next();
    }
  } catch (error) {
    res.locals.result = {
      status: "invalid",
      responseStatus: 500,
      error_code: 200,
      data: {
        status: false,
        message: "An error occured while processing your request",
      },
      message:
        "An issue happened while validating the login functionality  \n" +
        "The error is " +
        error +
        "  \n" +
        "The request was made by the following : " +
        req,
    };
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
