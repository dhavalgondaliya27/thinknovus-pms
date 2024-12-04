const { Router } = require('express');
const clientController = require('../../controllers/client/client.controller');
const { verifyJWT } = require('../../middleware/auth.middleware');

const clientRoutes = Router();

clientRoutes.post(
  '/client/createOrUpdateClientDetails',
  verifyJWT,
  clientController.createOrUpdateClientDetails,
);
clientRoutes.get(
  '/client/getClientDetails/:client_id',
  verifyJWT,
  clientController.getClientInfo,
);

module.exports = clientRoutes;
