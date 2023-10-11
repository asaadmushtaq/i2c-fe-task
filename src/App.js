import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import Bookmarks from "./pages/Bookmarks";
import NoPage from "./pages/NoPage";
import AppLayout from "./components/common/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
