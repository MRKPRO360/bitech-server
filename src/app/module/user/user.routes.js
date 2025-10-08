"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_config_1 = require("../../config/multer.config");
const user_controller_1 = require("./user.controller");
const customer_validation_1 = require("../customer/customer.validation");
const admin_validation_1 = require("../admin/admin.validation");
const user_constant_1 = require("./user.constant");
const user_validation_1 = require("./user.validation");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
router.post('/social-login', user_controller_1.UserControllers.socialLogin);
router.route('/create-customer').post(multer_config_1.multerUpload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(customer_validation_1.customerValidationsSchema.createCustomerValidatonSchema), user_controller_1.UserControllers.createCustomer);
router.route('/create-admin').post(multer_config_1.multerUpload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(admin_validation_1.AdminValidationSchema.createAdminValidationSchema), user_controller_1.UserControllers.createAdmin);
router.post('/change-status/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin), (0, validateRequest_1.default)(user_validation_1.UserValidation.changeStatusValidationSchema), user_controller_1.UserControllers.changeStatus);
// router.get(
//   '/me',
//   auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.customer),
//   UserControllers.getMe,
// );
exports.default = router;
