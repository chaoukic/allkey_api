/**
 * Create all CRUD statements for a Tenants
 */
const helper = require("./lib/passwords");
const findAllTenants = (call, pool) => {
  return pool
    .query("SELECT * FROM tenants ORDER BY id ASC")
    .then((results) => {
      return results.rows;
    })
    .catch((error) => {
      throw error;
    });
};

const createTenant = (call, pool) => {
  const hash = helper.hashPassword(call.request.password);
  const query = {
    text: "INSERT INTO tenants (Firstname, Lastname, Phonenumber,Email, Password ) VALUES ($1,$2,$3,$4, $5) ",
    values: [
      call.request.firstname,
      call.request.lastname,
      call.request.phonenumber,
      call.request.email,
      hash,
    ],
  };
  return pool
    .query(query)
    .then((results) => {
      return results.rows;
    })
    .catch((error) => {
      throw error;
    });
};

const updateTenant = (call, pool) => {
  const query = {
    text: "UPDATE tenants SET  Firstname= $1, Lastname = $2 , Phonenumber = $3 WHERE id = $4",
    values: [
      call.request.firstname,
      call.request.lastname,
      call.request.phonenumber,
      call.request.id,
    ],
  };
  return pool
    .query(query)
    .then((results) => {
      return results.rows;
    })
    .catch((error) => {
      throw error;
    });
};

const deleteTenant = (call, pool) => {
  const query = {
    text: "DELETE FROM tenants WHERE id = $1",
    values: [call.request.id],
  };
  return pool
    .query(query)
    .then((results) => {
      return results.rows;
    })
    .catch((error) => {
      throw error;
    });
};

const findTenant = (call, pool) => {
  const query = {
    text: "Select * FROM tenants WHERE id = $1",
    values: [call.request.id],
  };
  return pool
    .query(query)
    .then((results) => {
      return results.rows;
    })
    .catch((error) => {
      throw error;
    });
};

module.exports = {
  findTenant,
  findAllTenants,
  createTenant,
  updateTenant,
  deleteTenant,
};
