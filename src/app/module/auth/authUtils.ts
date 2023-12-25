import jwt from 'jsonwebtoken'

export const createToken = (
  jwtPayload: { userId: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  const accessToken = jwt.sign(jwtPayload, secret, {
    expiresIn,
  })

  return accessToken
}
