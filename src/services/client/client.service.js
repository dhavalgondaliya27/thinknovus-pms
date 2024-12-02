const Client = require('../../models/client/client.model');

const createOrUpdateClientDetails = async (clientId, data) => {
  return await Client.findOneAndUpdate(
    { _id: clientId },
    {
      name: data.name,
      industry: data.industry,
      website: data.website,
      address: data.address,
      country: data.country,
      email: data.email,
      phone: data.phone,
    },
    { upsert: true, new: true },
  );
};

module.exports = {
  createOrUpdateClientDetails,
};
