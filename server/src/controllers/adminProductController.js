const UserModel = require("../models/userModel");
const asyncHandle = require("express-async-handler");
const ProductModel = require("../models/productModel")

const getAllProduct = asyncHandle(async(req, res)=>{
    try {
        const all_product = await ProductModel.find()
        res.status(200).json({
            mess: 'Lấy dữ liệu thành công',
            all_product
        })
    } catch (error) {
        res.status(500).json({mess: `Lỗi ${error}`})
    }
})

const createProduct = asyncHandle(async (req, res) => {
    const { name, description, price, item_no, scale, marque, status, img, img_more } = req.body;

    // Kiểm tra các trường bắt buộc cơ bản (Mongoose cũng sẽ validate)
    if (!name || !description || !price || !item_no || !scale || !marque || !status || !img) {
        res.status(400); // Bad Request
        throw new Error('Vui lòng cung cấp đầy đủ các trường bắt buộc: name, description, price, item_no, scale, marque, status, img');
    }

    // (Tùy chọn) Kiểm tra xem item_no đã tồn tại chưa nếu nó phải là duy nhất
    const existingProduct = await ProductModel.findOne({ item_no });
    if (existingProduct) {
        res.status(400);
        throw new Error('Mã sản phẩm (item_no) đã tồn tại.');
    }

    const newProduct = await ProductModel.create({
        name,
        description,
        price,
        item_no,
        scale,
        marque,
        status,
        img,
        img_more: img_more || [] // Đảm bảo img_more là mảng, nếu không có thì là mảng rỗng
    });

    if (newProduct) {
        res.status(201).json({ // 201 Created
            mess: 'Tạo sản phẩm thành công',
            product: newProduct
        });
    } else {
        res.status(400);
        throw new Error('Dữ liệu sản phẩm không hợp lệ');
    }
});

const updateProduct = asyncHandle(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    // Kiểm tra ID hợp lệ
    if (!isValidObjectId(id)) {
        res.status(400);
        throw new Error('ID sản phẩm không hợp lệ');
    }

    // Kiểm tra xem có dữ liệu cập nhật không
    if (Object.keys(updateData).length === 0) {
        res.status(400);
        throw new Error('Không có dữ liệu để cập nhật');
    }

    // (Tùy chọn) Nếu cập nhật item_no, kiểm tra xem item_no mới có bị trùng với sản phẩm khác không
    if (updateData.item_no) {
        const existingProduct = await ProductModel.findOne({
            item_no: updateData.item_no,
            _id: { $ne: id } // Tìm sản phẩm khác có cùng item_no
        });
        if (existingProduct) {
            res.status(400);
            throw new Error('Mã sản phẩm (item_no) mới đã tồn tại ở sản phẩm khác.');
        }
    }


    const updatedProduct = await ProductModel.findByIdAndUpdate(
        id,
        updateData,
        {
            new: true, // Trả về document đã được cập nhật
            runValidators: true // Chạy validation của Mongoose khi cập nhật
        }
    );

    if (!updatedProduct) {
        res.status(404); // Not Found
        throw new Error('Không tìm thấy sản phẩm để cập nhật');
    }

    res.status(200).json({
        mess: 'Cập nhật sản phẩm thành công',
        product: updatedProduct
    });
});

const deleteProduct = asyncHandle(async (req, res) => {
    const { id } = req.params;

    // Kiểm tra ID hợp lệ
    if (!isValidObjectId(id)) {
        res.status(400);
        throw new Error('ID sản phẩm không hợp lệ');
    }

    const deletedProduct = await ProductModel.findByIdAndDelete(id);

    if (!deletedProduct) {
        res.status(404); // Not Found
        throw new Error('Không tìm thấy sản phẩm để xóa');
    }

    res.status(200).json({
        mess: 'Xóa sản phẩm thành công',
        productId: deletedProduct._id // Trả về ID của sản phẩm đã xóa
    });
});

module.exports ={getAllProduct, createProduct, updateProduct, deleteProduct}