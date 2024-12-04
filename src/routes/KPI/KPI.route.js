const { Router } = require('express');
const { verifyJWT } = require('../../middleware/auth.middleware');
const KPIController = require('../../controllers/KPI/KPI.controller');
const KPIRoutes = Router();

KPIRoutes.post(
  '/KPI/createOrUpdateKPIDetails',
  verifyJWT,
  KPIController.createOrUpdateKPIDetails,
);
KPIRoutes.get('/KPI/getAllKPIs', verifyJWT, KPIController.getAllKPIs);
KPIRoutes.get('/KPI/getKPIById/:KPI_id', verifyJWT, KPIController.getKPIById);

module.exports = KPIRoutes;
