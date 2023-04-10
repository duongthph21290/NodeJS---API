import User from '../models/user';
import { signinSchema, signupSchema } from '../schemas/auth';
//Thư viện mã hóa mật khẩu
import bcrypt from 'bcryptjs';
// Json web token -> trả về đoạn mã token
import jwt from 'jsonwebtoken';

// Đăng kí:
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const { error } = signupSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }

        //Kiểm tra email
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                message: "Email đã tồn tại",
            });
        }

        //Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);


        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        //Không trả về password cho phía client 
        user.password = undefined;

        //Đăng kí thành công rồi trả về phái client (Người dùng)
        return res.status(200).json({
            message: "Đăng kí thành công",
            user,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }

};




// Đăng nhập 
export const signin = async (req, res) => {
    try {
        // Destructuring : email , password
        const { email, password } = req.body;


        const { error } = signinSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }

        // Kiểm tra email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: " Tài khoản không tồn tại",
            });
        }
        
        //Mã hóa mật khẩu và kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Mật khẩu không đúng",
            });
        }
        // server trả token về để đăng nhập
        const token = jwt.sign({ id: user._id }, "HaiDuong", { expiresIn: "1d" });
        return res.status(200).json({
            message: " Đăng nhập thành công",
            accessToken: token,
            user,
        });
    } catch (error) {

    }
};


//B1: Validate giá trị client gửi lên
//B2: Kiểm tra user có tồn tại trong db hay không? Nếu không có trả về lỗi
//B3: Kiểm tra mật khẩu từ client gửi lên có khớp với mật khẩu db?
//B4: Tạo token mới và trả về client cùng thông tin user

/**
 * Nhìn
 * Hiểu
 * Bonus: Viết từng bước 1
 * Nhớ
 * Code
 * Làm lạii
 * 
 */