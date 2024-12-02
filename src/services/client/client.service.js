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

module.exports = {
  createOrUpdateClientDetails,
};
