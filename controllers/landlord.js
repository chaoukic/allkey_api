/**
 * Create all CRUD statements for a Landlord
 */
const helper = require("./lib/passwords");
const findAllLandLords = (call, pool) => {
  return pool
    .query("SELECT * FROM landlords ORDER BY id ASC")
    .then((results) => {
      return results.rows;
    })
    .catch((error) => {
      throw error;
    });
};

const createLandLord = (call, pool) => {
  const hash = helper.hashPassword(call.request.password);
  const query = {
    text: "INSERT INTO landlords (Firstname, Lastname, Phonenumber,Email, Password ) VALUES ($1,$2,$3,$4, $5) ",
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

const updateLandLord = (call, pool) => {
  const query = {
    text: "UPDATE landlords SET  Firstname= $1, Lastname = $2 , Phonenumber = $3 WHERE id = $4",
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

const deleteLandLord = (call, pool) => {
  const query = {
    text: "DELETE FROM landlords WHERE id = $1",
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

const findLandLord = (call, pool) => {
  const query = {
    text: "Select * FROM landlords WHERE id = $1",
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
  findLandLord,
  findAllLandLords,
  createLandLord,
  updateLandLord,
  deleteLandLord,
};
