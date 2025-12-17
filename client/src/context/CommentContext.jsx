import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CommentContext = createContext(null);

const CommentProvider = ({children}) => {
    const [userComments, setUserComments] = useState([]);
    const url = import.meta.env.VITE_API_URL || "http://localhost:3000";

    const fetchAllComments = async () => {
        const response = await axios.get(url+'/api/comment/getallcomments');
        setUserComments(response.data.comments)
    }

    useEffect(() => {
        fetchAllComments();
    }, []);

    return (
        <CommentContext.Provider value={{ userComments }}>
            {children}
        </CommentContext.Provider>
    )
}

export default CommentProvider;