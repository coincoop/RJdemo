const { CartItemModel } = require("../models/cartModel");
const { InvoiceModel, InvoiceItemModel } = require("../models/invoiceModel");
const { CartModel } = require("../models/cartModel");
const ProductModel = require("../models/productModel");

// Tạo hóa đơn mới
const createInvoice = async (req, res) => {
    try {
        const { id_user, products, shippingAddress, paymentMethod, note } = req.body;


        // Tính toán tổng tiền
        let subtotal = 0;
        for (const item of products) {
            const product = await ProductModel.findById(item.id_product);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Không tìm thấy sản phẩm với ID: ${item.product}`
                });
            }
            subtotal += product.price * item.quantity;
        }

        // Tính thuế (ví dụ: 10%)
        const tax = subtotal * 0.1;
        const total = subtotal + tax;

        // Tạo hóa đơn mới
        const newInvoice = await InvoiceModel.create({
            id_user: id_user,   
            subtotal,
            tax,
            total,
            shippingAddress,
            paymentMethod,
            note,
            status: 'pending'
        });

        const cart = await CartModel.findOne({ id_user: id_user });

        // Tạo các invoice items
        for (const item of products) {
            const product = await ProductModel.findById(item.id_product);
            
            await InvoiceItemModel.create({
                id_invoice: newInvoice._id,
                id_product: product._id,
                quantity: item.quantity,
            });
            await CartItemModel.deleteOne({ id_product: product._id, id_cart: cart._id });
        }

        // Lấy lại hóa đơn với items đã populate
        const populatedInvoice = await InvoiceModel.findById(newInvoice._id);
        const invoiceItems = await InvoiceItemModel.find({ id_invoice: newInvoice._id })
            .populate('id_product');
        const result = {
            ...populatedInvoice.toObject(),
            items: invoiceItems
        };

        return res.status(200).json({
            success: true,
            message: "Tạo hóa đơn thành công",
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Lỗi khi tạo hóa đơn",
            error: error.message
        });
    }
};

// Lấy danh sách hóa đơn của người dùng
const getUserInvoices = async (req, res) => {
    try {
        const userId = req.user._id;
        const invoices = await InvoiceModel.find({ id_user: userId })
            .sort({ createdAt: -1 });

        // Lấy items cho từng hóa đơn
        const invoicesWithItems = await Promise.all(invoices.map(async (invoice) => {
            const items = await InvoiceItemModel.find({ id_invoice: invoice._id })
                .populate('id_product');
            return {
                ...invoice.toObject(),
                items
            };
        }));
        
        return res.status(200).json({
            success: true,
            message: "Lấy danh sách hóa đơn thành công",
            data: invoicesWithItems
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Lỗi khi lấy danh sách hóa đơn",
            error: error.message
        });
    }
};

// Lấy chi tiết một hóa đơn
const getInvoiceDetail = async (req, res) => {
    try {
        const { invoiceId } = req.params;
        const userId = req.user._id;

        const invoice = await InvoiceModel.findOne({
            _id: invoiceId,
            id_user: userId
        });

        if (!invoice) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy hóa đơn"
            });
        }

        const items = await InvoiceItemModel.find({ id_invoice: invoiceId })
            .populate('id_product');

        const result = {
            ...invoice.toObject(),
            items
        };

        return res.status(200).json({
            success: true,
            message: "Lấy chi tiết hóa đơn thành công",
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Lỗi khi lấy chi tiết hóa đơn",
            error: error.message
        });
    }
};

// Hủy hóa đơn
const cancelInvoice = async (req, res) => {
    try {
        const { invoiceId } = req.params;
        const userId = req.user._id;

        const invoice = await InvoiceModel.findOne({
            _id: invoiceId,
            id_user: userId,
            status: 'pending'
        });

        if (!invoice) {
            return res.status(400).json({
                success: false,
                message: "Không thể hủy hóa đơn này"
            });
        }

        invoice.status = 'cancelled';
        await invoice.save();

        return res.status(200).json({
            success: true,
            message: "Hủy hóa đơn thành công",
            data: invoice
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Lỗi khi hủy hóa đơn",
            error: error.message
        });
    }
};

module.exports = {
    createInvoice,
    getUserInvoices,
    getInvoiceDetail,
    cancelInvoice
}; 