import express from "express";
import { create, get, getAll, remove, update } from "../controllers/category";
import { checkPermission } from '../middleware/checkPermission'


const router = express.Router();


//Trả về full danh sách
// Gửi theo yêu cầu get đến đường dẫn:
router.get("/categories/", getAll);

// Trả về 1 sản phẩm
//Gửi theo yêu cầu get đến đường đẫn:
router.get("/categories/:id", get);

// Thêm sản phẩm
router.post("/categories", create);

//Xóa sản phẩm
router.delete("/categories/:id",  remove);

// Cập nhật sản phẩm
// PUT chỉ cập nhật 1 trường và mất tất cả các trường khác
// PATCH cập nhật những trường chúng ta cập nhật và giữ nguyên các trường không cập nhật
router.patch("/categories/:id", update);


export default router;