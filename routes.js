const landlordController = require("./controllers/landlord");
const tenantController = require("./controllers/tenant");

module.exports = (server) => {
  server.group("/api/tenants", (router) => {
    router.post("/register", tenantController.createTenant);
    router.post("/login", tenantController.login);
    router.post("/update", tenantController.updateTenant);
    router.post(
      "/phoneValidation",
      tenantController.validatePhoneVerificiation
    );
  });
  server.group("/api/landlord", (router) => {
    router.post("/register", landlordController.createLandLord);
    router.post("/login", landlordController.login);
    router.post("/update", landlordController.updateLandLord);
    router.post(
      "/phoneValidation",
      landlordController.validatePhoneVerificiation
    );
  });
};
