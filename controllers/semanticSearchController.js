
import axios from "axios";

export async function semantic_search(req,res){
  
    try {
        let { query, type } = req.query;
        if (!query) {
            return res.status(400).json({
                status: "fail",
                message: "Search query is required"
            });
        }
        console.log("Query:", query);
        console.log("Type:", type);
        const response = await axios.get("http://localhost:8000/search", {
            params: {
                 query: query.toString(),
                type : type ? type.toString() : undefined
                }
        });
        return res.status(200).json({
            status: "success",
            data: response.data.data.result.hits || []
        });
}   catch (error) {
        console.error("Semantic search error:", error.message);
        return res.status(500).json({
            status: "fail",
            message: "Failed to perform semantic search",
            error: error.message
        });
}
}
