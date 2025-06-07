const { default: mongoose } = require("mongoose");

const InvoiceSchema = new mongoose.Schema(
  { 
    id_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    tax: {
        type: Number,
        required: true,
        default: 0
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'paid', 'cancelled', 'shipped', 'delivered'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['cash', 'credit_card', 'bank_transfer', 'momo', 'zalopay'],
        default: 'cash'
    },
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        country: String,
        zipCode: String
    },
    note: {
        type: String
    }
  },
  {
    timestamps: true,
  }
);

const InvoiceItemSchema = new mongoose.Schema(
  {
    id_invoice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'invoices',
        required: true
    },
    id_product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
   
  },
  {
    timestamps: true,
  }
);
const InvoiceModel = mongoose.model("invoices", InvoiceSchema);
const InvoiceItemModel = mongoose.model("invoice_items", InvoiceItemSchema);
module.exports = { InvoiceModel, InvoiceItemModel }; 
