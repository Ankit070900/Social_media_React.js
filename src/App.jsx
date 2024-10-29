import Header from "./Component/Header";

import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Component/Footer";
import Sidebar from "./Component/Sidebar";
import CreatePost from "./Component/CreatePost";
import { useState } from "react";
import PostList from "./Component/PostList";
import "./App.css";
import PostListProvider from "./Store/post-list-store";

function App() {
  const [selectedtab, setSelectedTab] = useState("Home");

  return (
    <PostListProvider>
      <div className="appcontainer">
        <Sidebar
          selectedtab={selectedtab}
          setSelectedTab={setSelectedTab}
        ></Sidebar>
        <div className="content">
          <Header></Header>
          {selectedtab === "Home" ? <PostList /> : <CreatePost></CreatePost>}
          <Footer></Footer>
        </div>
      </div>
    </PostListProvider>
  );
}

export default App;
