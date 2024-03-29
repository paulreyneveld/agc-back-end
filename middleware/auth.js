const jwt = require('jsonwebtoken')

const authenticateMiddleware = (req, res, next) => {
    const SECRET_KEY = process.env.SECRET
    const { authorization } = req.headers
    const token = authorization && authorization.split(" ")[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) return res.sendStatus(403)
      req.user = user
      next()
     })
}

module.exports = authenticateMiddleware