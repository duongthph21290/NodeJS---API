import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    des: {
        type: String,
        required: true,
    },

    author: {
        type: String,
        required: true,
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        //Liên kết với bảng models : "Category"
        ref: "Category",
    },

}, {
    timestamps: true, versionKey: false
});



productSchema.plugin(mongoosePaginate);

export default mongoose.model("Product", productSchema);