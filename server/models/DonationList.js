const { Schema, model } = require('mongoose');


const donationListSchema = new Schema(
  {
    fullname: {
        type: String,
        required: true,
    },
    email: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    }
  }
);

const DonationList = model('DonationList', donationListSchema);

module.exports = DonationList;