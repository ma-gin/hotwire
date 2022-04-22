import createHttpError from "http-errors"
import { verifyAccessToken } from "./auth"

export const grantAccess = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      next(createHttpError(401, "access token not found"))
    const token = req.headers.authorization.replace("Bearer ", "")
    const payload = await verifyAccessToken(token)
    req.user = {
      _id: payload._id,
      role: payload.role,
    }
    next()
  } catch (error) {
    next(createHttpError(401, "Invalid token"))
  }
}
