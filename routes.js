const landlordController = require("./controllers/landlord");
const tenantController = require("./controllers/tenant");
const responseParser = require("./lib/request").requestParser;

module.exports = (server) => {
  server.post(
    "/api/tenants/register",
    tenantController.createTenant,
    responseParser
  );
  server.post("/api/tenants/login", tenantController.login, responseParser);
  server.post(
    "/api/auth/tenants/update",
    tenantController.updateTenant,
    responseParser
  );
  server.post(
    "/api/auth/tenants/phoneValidation",
    tenantController.validatePhoneVerificiation,
    responseParser
  );

  server.post(
    "/api/landlord/register",
    landlordController.createLandLord,
    responseParser
  );
  server.post("/api/landlord/login", landlordController.login, responseParser);
  server.post(
    "/api/auth/landlord/update",
    landlordController.updateLandLord,
    responseParser
  );
  server.post(
    "/api/auth/landlord/phoneValidation",
    landlordController.validatePhoneVerificiation,
    responseParser
  );
};
