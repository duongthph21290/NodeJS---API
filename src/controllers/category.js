import Joi from "joi";
import Category from "../models/category";
import Product from '../models/product'

const categorySchema = Joi.object({
    name: Joi.string().required(),

})


//Trả về full danh sách sản phẩm 
// Khởi tạo 1 biến export get All:
export const getAll = async (req, res) => {
    try {
        const data = await Category.find().populate("products");
        if (data.length == 0) {
            return res.json({
                message: "Không có sản phẩm nào!",
            });
        }
        return res.json(data);
    } catch (error) { }

};


//Sử dụng thử viện axios gửi yêu cầu get đến địa chỉ:
// const { data } = await axios.get("http://localhost:3000/products");
// trả kết quả dưới dạng response json chứa danh sách toàn bộ sản phẩm:


// Trả về 1 sản phẩm
export const get = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Category.findById(id).populate("products");
        if (category.length === 0) {
            return res.status(200).json({
                message: "Không có danh mục nào",
            });
        }
        // // Trả về danh mục sản phẩm và sản phẩm trong danh mục đó
        // const products = await Product.find({ categoryId: id });
        // return res.status(200).json({
        //     message: "Lấy 1 danh mục thành công!",
        //     products
        // });
        return res.status(200).json({
            message: "Lấy 1 danh mục thành công!",
             category,
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};



// Thêm sản phẩm:
export const create = async (req, res) => {
    try {
        //lấy dữ liệu từ client body gửi lên
        const body = req.body;
        const { error } = categorySchema.validate(body);
        if (error) {
            return res.json({
                message: error.details.map((item) => item.message),
            });
        }
        const data = await Category.create(body);
        if (data.length === 0) {
            return res.status(400).json({
                message: "Thêm danh mục thất bại",
            });
        }
        // trả kết quả dưới dang res json, rồi thông báo thành công + load data lên
        return res.status(200).json({
            message: "Thêm danh mục thành công!",
            data,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });

    }
};
// console.log(1);
// Xóa sản phẩm: 
export const remove = async (req, res) => {
    try {
        // await axios.delete(`http://localhost:3000/products/${req.params.id}`)
        const data = await Category.findByIdAndDelete(req.params.id);
        return res.json({
            message: "Xóa danh mục thành công",
            data,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }

};


// Cập nhật sản phẩm: 
// phương thức findOneAndUpdate: Lọc ID theo yêu cầu gửi lên
export const update = async (req, res) => {
    try {
        // const { data } = await axios.patch(`http://localhost:3000/products/${req.params.id}`, req.body);
        const data = await Category.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
        });
        if (!data) {
            return res.status(400).json({
                message: "Cập nhật danh mục thất bại",
            });
        }
        return res.json({
            message: "Cập nhật danh mục thành công",
            data,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }

};