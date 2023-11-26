import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "pages/layout/view";
import DetailPost from "pages/detail_post/view";
import ManagePost from "pages/manage_post/view";
import Home from "pages/home/view";
import Index from "pages/modifyuser/view";
const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* 홈화면 */}
          <Route path={"/"} element={<Home />}></Route>
          <Route path={":category"} element={<Home />}></Route>
          <Route path={"posts/:userid"} element={<Home />}></Route>

          <Route path={"manage/modifyuser/:userid"} element={<Index />} />
          {/* <Route path={"manage/:userid"} element={<>테스트</>}></Route> */}

          {/* 홈화면에서 게시물 클릭하면 나오는 게시물 상세 페이지 */}
          <Route path="posts/:userid/:postid" element={<DetailPost />} />
          {/* 게시물 생성 */}
          <Route path="manage/newpost/:userid" element={<ManagePost />} />
          {/* 게시물 수정 */}
          <Route path="manage/newpost/:userid/:postid" element={<ManagePost />} />
          {/* 자신의 게시물 관리 */}
          {/* <Route path="manage/:userid" element={<ManagePost></ManagePost>} /> */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
