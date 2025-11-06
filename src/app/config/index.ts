import dotenv from 'dotenv';

dotenv.config({
  path: process.cwd() + '/.env',
});

export default {
  database_password: process.env.DATABASE_PASSWORD,
  database_url: process.env.DATABASE_URL,
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  stripe_sk_test: process.env.STRIPE_SK_TEST,
  sender_email: process.env.SENDER_EMAIL,
  sender_app_password: process.env.SENDER_APP_PASSWORD,
  sender_phone: process.env.SENDER_PHONE,
  sender_name: process.env.SENDER_NAME,
  store_id: process.env.STORE_ID,
  store_password: process.env.STORE_PASSWORD,
  is_live: process.env.IS_LIVE === 'true' ? true : false,
  validation_url: process.env.VALIDATION_URL,
  backend_url: process.env.BACKEND_URL,
  frontend_url: process.env.FRONTEND_URL,
  success_url: process.env.SUCCESS_URL,
  failed_url: process.env.FAILED_URL,
  cancel_url: process.env.CANCEL_URL,
};
