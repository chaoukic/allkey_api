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
    const pool = poolObject.pool("users");
    const results = await pool.query("SELECT * FROM tenants ORDER BY id ASC");
    res.locals.result = {
      status: "valid",
      data: results.rows,
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
      data: "An error occured ",
      message:
        "An issue happened while fetching all the tenants from the USERS database  \n" +
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
    const pool = poolObject.pool("users");
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
    res.locals.result = {
      status: "valid",
      data: results.rows,
      message:
        "Tenant Profile with email " + req.body.email + " has been created",
    };
    next();
  } catch (error) {
    res.locals.result = {
      status: "invalid",
      responseStatus: 500,
      error_code: 200,
      data: "An error occured ",
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
    const pool = poolObject.pool("users");
    const results = await pool.execute(
      "UPDATE tenants SET  Firstname= ?, Lastname = ? , Phonenumber = ? WHERE id = ?",
      [req.body.firstname, req.body.lastname, req.body.phonenumber, req.body.id]
    );
    res.locals.result = {
      status: "valid",
      data: results.rows,
      message: "Tenant Profile with id " + req.body.id + " has been updated",
    };
    next();
  } catch (error) {
    res.locals.result = {
      status: "invalid",
      responseStatus: 500,
      error_code: 200,
      data: "An error occured ",
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
    const pool = poolObject.pool("users");
    const results = await pool.execute(
      "UPDATE tenants SET  PhoneVerification= $1 WHERE id = $2",
      [true, req.body.id]
    );
    res.locals.result = {
      status: "valid",
      data: results.rows,
      message: "Your phone verification has been completed",
    };
    next();
  } catch (error) {
    res.locals.result = {
      status: "invalid",
      responseStatus: 500,
      error_code: 200,
      data: "An error occured ",
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
    const pool = poolObject.pool("users");
    const results = await pool.execute(
      "UPDATE tenants SET  AdminVerification= ? WHERE id = ?",
      [true, req.body.id]
    );
    res.locals.result = {
      status: "valid",
      data: results.rows,
      message: "Tenant has been verified by an admin",
    };
    next();
  } catch (error) {
    res.locals.result = {
      status: "invalid",
      responseStatus: 500,
      error_code: 200,
      data: "An error occured ",
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
    const pool = poolObject.pool("users");
    const results = pool.query("Select * FROM tenants WHERE id = ?", [
      req.body.id,
    ]);
    res.locals.result = {
      status: "valid",
      data: results.rows,
      message: "Fetching tenant with the following id " + req.body.id,
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
    const pool = poolObject.pool("users");
    const result = pool.query("Select password from tenants where email = $1", [
      req.body.email,
    ]);
    if (helper.comparePassword(req.body.password, result["password"])) {
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
        data: false,
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
      data: "An error occured ",
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
