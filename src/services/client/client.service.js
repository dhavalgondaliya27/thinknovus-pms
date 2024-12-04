const Client = require('../../models/client/client.model');

const createOrUpdateClientDetails = async (clientId, data) => {
  if (!clientId) {
    const newClient = new Client(data);
    return await newClient.save();
  }

  return await Client.findOneAndUpdate(
    { _id: clientId },
    { $set: { ...data } },
    { upsert: true, new: true },
  );
};

const findClientById = async (id) => {
  const clientInfo = await Client.findById(id);
  return clientInfo;
};

const getClientInfo = async (clientId) => {
  const info = await Client.findOne({ _id: clientId });
  return info;
};

module.exports = {
  createOrUpdateClientDetails,
  findClientById,
  getClientInfo,
};
