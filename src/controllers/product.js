import Joi from "joi";
import Product from "../models/product";
import Category from "../models/category";

const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    des: Joi.string().required(),
    author: Joi.string().required(),
    categoryId: Joi.string().required(),

})


//Trả về full danh sách sản phẩm 
// Khởi tạo 1 biến export get All:
export const getAll = async (req, res) => {
    // Req.query._sort => price
    // Desc :  từ bé đến lớn
    // Asc : từ lớn đến bé
    const { _limit = 10, _sort = "createAt", _order = "asc", _page = 1 } = req.query;
    const options = {
        page: _page,
        limit: _limit,
        sort: {
            [_sort]: _order === "desc" ? -1 : 1,
        },
    };
    try {
        const data = await Product.paginate({}, options);
        if (data.length == 0) {
            return res.json({
                message: "Không có sản phẩm nào!",
            });
        }
        return res.json(data);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })
     }

};



// Trả về 1 sản phẩm
export const get = async (req, res) => {
    try {
        const id = req.params.id;
        //Populate dùng để lấy ra 1 sản phẩm liên kết bảng : Gọi dến trường categoryId
        const data = await Product.findById(id).populate("categoryId", "-__v");
        if (data.length === 0) {
            return res.status(200).json({
                message: "Không có sản phẩm",
            });
        }
        return res.status(200).json(data);
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
        const { error } = productSchema.validate(body);
        if (error) {
            return res.json({
                message: error.details[0].message,
            });
        }
        const product = await Product.create(body);
        // console.log(product);
        await Category.findByIdAndUpdate(product.categoryId, {
            $addToSet: {
                products: product,
            },
        });
        if (product.length === 0) {
            return res.status(400).json({
                message: "Thêm sản phẩm thất bại",
            });
        }
        // trả kết quả dưới dang res json, rồi thông báo thành công + load data lên
        return res.status(200).json({
            message: "Thêm sản phẩm thành công!",
            product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });

    }
};

// Xóa sản phẩm: 
export const remove = async (req, res) => {
    try {
        // await axios.delete(`http://localhost:3000/products/${req.params.id}`)
        const data = await Product.findByIdAndDelete(req.params.id);
        return res.json({
            message: "Xóa sản phẩm thành công",
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
        const data = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
        });
        if (!data) {
            return res.status(400).json({
                message: "Cập nhật sản phẩm thất bại",
            });
        }
        return res.json({
            message: "Cập nhật sản phẩm thành công",
            data,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }

};





// Computed protype name (Cú pháp mới của JS)
// Lấy giá trị " name "  ->  Set thành 1 tên biến
// const myName = " name";
// const myInfo = {
//     // Set vào đây : name : "Duong"
//     [myName]: "Duong"
// }
// console.log(myInfo.name);