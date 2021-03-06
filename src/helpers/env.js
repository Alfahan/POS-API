require('dotenv').config()

const environment = {
    PORT        : process.env.PORT,
    host        : process.env.DB_host,
    user        : process.env.DB_user,
    password    : process.env.DB_password,
    db          : process.env.DB_database,
    JWTSecreet  : process.env.JWTSecreet,
    emaill      : process.env.EMAIL,
    passwordd   : process.env.PASSWORD,
    url         : process.env.URL,
    urlforgot   : process.env.URLFORGOT
}



module.exports = environment