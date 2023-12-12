const dotenv = require("dotenv");
dotenv.config();

exports.config = {

    mysql_user: process.env.MYSQL_USER,
    mysql_password: process.env.MYSQL_PASSWORD,
    mysql_database: process.env.MYSQL_DATABASE,
    jwt_secret_key: process.env.JWT_SECRET_KEY,
    jwt_login_duration: process.env.JWT_LOGIN_DURATION

    // cloudinary: {
    //     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    //     api_key: process.env.CLOUDINARY_API_KEY,
    //     api_secret: process.env.CLOUDINARY_API_SECRET
    // }
}
