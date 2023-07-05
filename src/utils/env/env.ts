const { GPT_SECRET } = process.env;

if(!GPT_SECRET) {
    throw new Error("GPT_SECRET is not defined");
}
export {
    GPT_SECRET
}