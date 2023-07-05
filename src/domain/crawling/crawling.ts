import * as console from "console";

const axios = require("axios");
const cheerio = require("cheerio");


const getHtml = async (companyName: string) => {
    try {
        const injae: String = await axios.get('https://www.google.com/search?q=' + companyName + "인재상");
        const culture: String = await axios.get('https://www.google.com/search?q=' + companyName + "문화").data;

        console.log(injae)

        return "asdf"
    } catch (error) {
        console.error(error);
    }
};

getHtml("카카오").then(()=>{
})