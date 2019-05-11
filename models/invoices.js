const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
  prix: Number,
  provider: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
}
},
{
  timestamps: true,
  versionKey: false
})

const Invoice = mongoose.model('Invoice', InvoiceSchema)

module.exports = Invoice