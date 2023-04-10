// Cài đặt node js , default đã có rất nhiều package hỗ trợ
import express from "express";
import productRouter from "./routes/product";
import categoryRouter from "./routes/category";
import authRouter from './routes/auth';
import cors from "cors";
// Hỗ trợ cho mongoDB 
import mongoose from "mongoose";

// Khởi tạo 1 biến gán giá trị vào app
const app = express();

// sử dụng moddleware để gửi các request lên server
app.use(express.json());
app.use(cors());

//router
app.use("/api", productRouter);
app.use("/api", categoryRouter);
app.use("/api", authRouter); 


// Sử dụng monggose để kết nối đến bảng (db)
mongoose.connect('mongodb://127.0.0.1:27017/test123')
.then(()=>console.log("Kết nối thành công"));

// Không dùng đến vì đã sử dụng bên trong file ( Vite.config.ts)
// app.listen(8080, () => {
//     console.log("Server is running on port 8080 ");
// });
export const viteNodeApp = app;