const mongoose = require("mongoose")

// Custom middleware
module.exports = {
    isLoggedIn: (req, res, next) => {
        req.session.currentUser ? next() : res.render('./auth/login-page', { errorMsg: 'Inicia sesión para continuar' })
    },
    checkRoles: (...roles) => (req, res, next) => {
        roles.includes(req.session.currentUser.role) ? next() : res.render('./auth/login-page', { errorMsg: 'No tienes permisos' })
    }
}