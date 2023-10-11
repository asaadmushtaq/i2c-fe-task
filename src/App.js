import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./pages/Search";
import Bookmarks from "./pages/Bookmarks";
import NoPage from "./pages/NoPage";
import AppLayout from "./components/common/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/search" element={<Search />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
