import { createContext, useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Footer, Navbar } from "../ui/components";
import { Download, Home } from "../views";

export const Context = createContext(null);

export const App = () => {
  const [question, setQuestion] = useState("");
  const [message, setMessage] = useState("");
  const [keywords, setKeyWords] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <Context.Provider
      value={{
        question,
        setQuestion,
        message,
        setMessage,
        keywords,
        setKeyWords,
        loading,
        setLoading,
      }}
    >
      <div>
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/download" element={<Download />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </div>
    </Context.Provider>
  );
};
