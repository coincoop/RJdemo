// const InvoiceModel = require("../models/invoiceModel");
// const { successResponse, errorResponse } = require("../utils/response");

// // Lấy tất cả hóa đơn (có phân trang và tìm kiếm)
// const getAllInvoices = async (req, res) => {
//     try {
//         const { page = 1, limit = 10, status, search } = req.query;
//         const query = {};

//         if (status) query.status = status;
//         if (search) {
//             query.$or = [
//                 { invoiceNumber: { $regex: search, $options: 'i' } },
//                 { 'customer.email': { $regex: search, $options: 'i' } }
//             ];
//         }

//         const invoices = await InvoiceModel.find(query)
//             .populate('customer', 'email name')
//             .populate('items.product')
//             .sort({ createdAt: -1 })
//             .limit(limit * 1)
//             .skip((page - 1) * limit);

//         const count = await InvoiceModel.countDocuments(query);

//         return successResponse(res, "Lấy danh sách hóa đơn thành công", {
//             invoices,
//             totalPages: Math.ceil(count / limit),
//             currentPage: page
//         });
//     } catch (error) {
//         return errorResponse(res, "Lỗi khi lấy danh sách hóa đơn", error);
//     }
// };

// // Cập nhật trạng thái hóa đơn
// const updateInvoiceStatus = async (req, res) => {
//     try {
//         const { invoiceId } = req.params;
//         const { status } = req.body;

//         const invoice = await InvoiceModel.findById(invoiceId);
//         if (!invoice) {
//             return errorResponse(res, "Không tìm thấy hóa đơn", 404);
//         }

//         invoice.status = status;
//         await invoice.save();

//         return successResponse(res, "Cập nhật trạng thái hóa đơn thành công", invoice);
//     } catch (error) {
//         return errorResponse(res, "Lỗi khi cập nhật trạng thái hóa đơn", error);
//     }
// };

// // Thống kê doanh thu
// const getRevenueStats = async (req, res) => {
//     try {
//         const { startDate, endDate } = req.query;
//         const query = { status: 'paid' };

//         if (startDate && endDate) {
//             query.createdAt = {
//                 $gte: new Date(startDate),
//                 $lte: new Date(endDate)
//             };
//         }

//         const stats = await InvoiceModel.aggregate([
//             { $match: query },
//             {
//                 $group: {
//                     _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
//                     totalRevenue: { $sum: "$total" },
//                     count: { $sum: 1 }
//                 }
//             },
//             { $sort: { _id: 1 } }
//         ]);

//         return successResponse(res, "Lấy thống kê doanh thu thành công", stats);
//     } catch (error) {
//         return errorResponse(res, "Lỗi khi lấy thống kê doanh thu", error);
//     }
// };

// module.exports = {
//     getAllInvoices,
//     updateInvoiceStatus,
//     getRevenueStats
// }; 