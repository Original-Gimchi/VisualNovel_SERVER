const {GPT_SECRET, WRTN_JWT, JWT_SECRET, SALT} = process.env;

if (!GPT_SECRET) {
    throw new Error("GPT_SECRET is not defined");
}
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}
export {
    GPT_SECRET,
    WRTN_JWT,
    JWT_SECRET,
    SALT
}