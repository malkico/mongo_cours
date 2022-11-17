const argon2 = require("argon2")

const hashingConfig = { // based on OWASP cheat sheet recommendations (as of March, 2022)
    parallelism: 1,
    memoryCost: 64000, // 64 mb
    timeCost: 3 // number of itetations
}

exports.hashPassword = async (password)  => {
    return await argon2.hash(password, {
        ...hashingConfig
    })
}
