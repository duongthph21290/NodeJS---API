import jwt from "jsonwebtoken";
import User from '../models/user';

// B1: Kiểm tra xem user đã đăng nhập chưa?
// B2: Kiểm tra xem token có đúng hay không?
// B3: Giải mã token và tìm user trong db dựa theo id
// B4: Kiểm tra user đấy có phải admin không? Nếu không phải thì bước!
// B5: Cho phép đii tiếp

export const checkPermission = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(403).json({
                message: "Bạn chưa đăng nhập",
            });
        }

        // Bearer xxx ->
        const token = req.headers.authorization.split(" ")[1]; //["bearer", "xxx"]
        const { id } = jwt.verify(token, "HaiDuong");

        const user = await User.findById(id);
        // console.log(user);
        if (user.role !== "admin") {
            return res.status(403).json({
                message: "Bạn không có quyền truy cập tài nguyên!!!",
            });
        }
        next();
    } catch (error) { }
};