import connectDB from "../lib/mongo";
import blogModel from "../models/blogs" ;

class BlogDAS {
    constructor() {
        this.dbConnection = connectDB();
    }

    async getAllBlogsCount(params={}){
        const count = await blogModel.count(params);
        return count;
    }

}

module.exports = BlogDAS;     