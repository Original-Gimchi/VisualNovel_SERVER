const { GPT_SECRET, WRTN_JWT } = process.env;

if(!GPT_SECRET) {
    throw new Error("GPT_SECRET is not defined");
}
export {
    GPT_SECRET,
    WRTN_JWT
}