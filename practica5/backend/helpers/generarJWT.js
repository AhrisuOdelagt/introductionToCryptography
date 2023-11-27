import jwt from "jsonwebtoken"

const generarJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "28d"
    });
};

const generarJWT_registro = (userinfo) => {
    return jwt.sign(userinfo, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });
};

export {
    generarJWT,
    generarJWT_registro
};
