const { createContext, useContext, useReducer, useState } = require('react');

const BlogContext = createContext();

function BlogProvider({ children }) {
  const [post, setPost] = useState({});
  return (
    <BlogContext.Provider value={{ post, setPost }}>
      {children}
    </BlogContext.Provider>
  );
}

function useBlog() {
  return useContext(BlogContext);
}

export { BlogProvider, useBlog };
