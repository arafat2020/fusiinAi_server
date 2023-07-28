import jwt from 'jsonwebtoken'

const jwt_severt = '89734jkshfg9309503hnk'

export const createToken = (id: string, name: string) => {
    return jwt.sign({
        data: {
            id, name
        }
    }, jwt_severt, { expiresIn: '24h' });
}

export const verifyJwt = (token: string) => {
    return jwt.verify(token, jwt_severt, function (err, decoded) {
        if (err) {
            return null
        }
        return  decoded
    });
}