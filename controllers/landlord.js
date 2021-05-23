/**
 * Create all CRUD statements for a Landlord
 */
const helper = require("../lib/passwords");
const poolObject = require("../database/db");
const findAllLandLords = async (req, res, next) => {
  try {
    const pool = poolObject.pool("AllKey");
    const results = await pool.query("SELECT * FROM landlords ORDER BY id ASC");
    res.locals.result = {
      status: "valid",
      data: results[0],
      message:
        "The following user has requested to fetch all the landlords in the database : " +
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
        "An issue happened while fetching all the landlords from the database  \n" +
        "The error is " +
        error +
        "  \n" +
        "The request was made by the following : " +
        req,
    };
    next();
  }
};

const createLandLord = async (req, res, next) => {
  try {
    const pool = poolObject.pool("AllKey");
    const hash = await helper.hashPassword(req.body.password);
    const results = await pool.execute(
      "INSERT INTO landlords (Firstname, Lastname, Phonenumber,Email, Password ) VALUES (?,?,?,?,?)",
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
          "landlord Profile with email " +
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
          "Lanlord Profile with email " + req.body.email + " has been created",
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
        "An issue happened while trying to create a landlord \n" +
        "The error is " +
        error +
        "  \n" +
        "The request body contained the following : " +
        req.body,
    };
    next();
  }
};

const updateLandLord = async (req, res, next) => {
  try {
    const pool = poolObject.pool("AllKey");
    const results = await pool.execute(
      "UPDATE landlords SET  Firstname= ?, Lastname = ? , Phonenumber = ? WHERE id = ?",
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
          "landlord Profile with email " +
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
        message:
          "landlord Profile with id " + req.body.id + " has been updated",
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
        "An issue happened while trying to updating a landlord \n" +
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
      "UPDATE landlords SET  PhoneVerification= $1 WHERE email = $2",
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
          "landlord Profile with email " +
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
          "landlord Profile with email " +
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
        "An issue happened while trying to validate the phone verification of  a landlord \n" +
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
      "UPDATE landlords SET  AdminVerification= ? WHERE email = ?",
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
          "landlord Profile with email " +
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
          "landlord Profile with email " +
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
        "An issue happened while trying to validate the admin verification of a landlord \n" +
        "The error is " +
        error +
        "  \n" +
        "The request body contained the following : " +
        req.body,
    };
    next();
  }
};

const findLandLord = async (req, res, next) => {
  try {
    const pool = poolObject.pool("AllKey");
    const [results, fields] = await pool.query(
      "Select * FROM landlords WHERE email = ?",
      [req.body.email]
    );
    res.locals.result = {
      status: "valid",
      data: {
        staus: true,
        value: results[0],
      },
      message: "Fetching landlord with the following email " + req.body.email,
    };
    next();
  } catch (error) {
    res.locals.result = {
      status: "invalid",
      responseStatus: 500,
      error_code: 200,
      data: "An error occured ",
      message:
        "An issue happened while fetching a landlord from the USERS database  \n" +
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
      "Select password from landlords where email = ?",
      [req.body.email]
    );
    if (helper.comparePassword(req.body.password, result[0]["password"])) {
      res.locals.result = {
        status: "valid",
        data: true,
        message:
          "Valid login for the landlord with the following email " +
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
          "Invalid login for the landlord with the following email " +
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
  findLandLord,
  findAllLandLords,
  createLandLord,
  updateLandLord,
  validatePhoneVerificiation,
  validateAdminVerification,
  login,
};
