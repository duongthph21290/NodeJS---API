import joi from 'joi';


export const signupSchema = joi.object({
    name: joi.string().required().messages({
        "string.empty": "Tên không được để trống",
        "any.required": "Trường 'Tên' là trường bắt buộc",
    }),
    email: joi.string().email().required().messages({
        "string.empty": "Email không được để trống",
        "any.required": "Trường 'Email' là trường bắt buộc",
        "string.email": "Email không đúng định dạng",
    }),
    password: joi.string().min(6).required().messages({
        "string.empty": "Mật khẩu không được để trống",
        "any.required": "Trường 'Mật khẩu' là bắt buộc",
        "string.min": "Mật khẩu phải có ít nhất {#limit} kí tự",
    }),
    confirmpassword: joi.string().valid(joi.ref("password")).required().messages({
        "string.empty": "Nhập lại mật khẩu không được để trống",
        "any.required": "Trường 'Nhập lại mật khẩu' là bắt buộc",
        "any.only": "Nhập lại mật khẩu không khớp",
    }),
});



export const signinSchema = joi.object({
    email: joi.string().email().required().messages({
        "string.empty": "Email không được để trống",
        "any.required": 'Trường "Email" là bắt buộc',
        "string.email": "Email không đúng định dạng",
    }),
    password: joi.string().min(6).required().messages({
        "string.empty": "Mật khẩu không được để trống",
        "any.required": 'Trường "Mật khẩu" là bắt buộc',
        "string.min": "Mật khẩu phải có ít nhất {#limit} kí tự"
    }),

});