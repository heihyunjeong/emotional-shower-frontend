import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CommentWrite from "../comment/CommentWrite";
import CommentList from "../comment/CommentList";
import { AuthContext } from "../context/AuthProvider";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";
import API_BASE_URL, { API_ENDPOINTS } from "../../config/api";

import "../../css/bbsdetail.css";
import FileDisplay from "../file/FileDisplay";

function BbsDetail() {
  const { headers, setHeaders } = useContext(HttpHeadersContext);
  const { auth, setAuth } = useContext(AuthContext);
  const [bbs, setBbs] = useState({});
  const { boardId } = useParams();
  const navigate = useNavigate();

  const getBbsDetail = async () => {
    try {
      const response = await axios.get(
        API_BASE_URL + API_ENDPOINTS.BOARD.DETAIL(boardId)
      );

      console.log("[BbsDetail.js] getBbsDetail() success :D");
      console.log(response.data);

      setBbs(response.data);
    } catch (error) {
      console.log("[BbsDetail.js] getBbsDetail() error :<");
      console.error(error);
      
      if (error.response?.status === 404) {
        alert("게시글을 찾을 수 없습니다.");
        navigate("/bbslist");
      } else if (error.response?.status === 500) {
        alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      } else {
        const errorMsg = error.response?.data?.message || "게시글을 불러오는 중 오류가 발생했습니다.";
        alert("⚠️ " + errorMsg);
      }
    }
  };

  const deleteBbs = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    try {
      const response = await axios.delete(
        API_BASE_URL + API_ENDPOINTS.BOARD.DELETE(boardId),
        { headers: headers }
      );

      console.log("[BbsDetail.js] deleteBbs() success :D");
      console.log(response.data);

      if (response.status === 200) {
        alert("게시글을 성공적으로 삭제했습니다 :D");
        navigate("/bbslist");
      }
    } catch (error) {
      console.log("[BbsDetail.js] deleteBbs() error :<");
      console.error(error);
      
      if (error.response?.status === 403) {
        alert("삭제 권한이 없습니다.");
      } else if (error.response?.status === 404) {
        alert("게시글을 찾을 수 없습니다.");
      } else {
        const errorMsg = error.response?.data?.message || "게시글 삭제 중 오류가 발생했습니다.";
        alert("⚠️ " + errorMsg);
      }
    }
  };

  useEffect(() => {
    // 컴포넌트가 렌더링될 때마다 localStorage의 토큰 값으로 headers를 업데이트
    setHeaders({
      "Authorization": `Bearer ${localStorage.getItem("bbs_access_token")}`
    });
    
    if (boardId) {
      getBbsDetail();
    }
  }, [boardId]);

  const updateBbs = {
    boardId: bbs.boardId,
    writerName: bbs.writerName,
    title: bbs.title,
    content: bbs.content,
    files: bbs.files
  };

  const parentBbs = {
    boardId: bbs.boardId,
    title: bbs.title,
  };

  // 로딩 상태 표시
  if (!bbs.boardId) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">로딩 중...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bbs-detail-container">
      <div>
        <div className="my-3 d-flex justify-content-end">
          <Link className="btn btn-outline-secondary" to="/bbslist">
            <i className="fas fa-list"></i> 글목록
          </Link> &nbsp;

          <Link 
            className="btn btn-outline-secondary" 
            to={`/bbsanswer/${bbs.boardId}`} 
            state={{ parentBbs: parentBbs }}
          >
            <i className="fas fa-pen"></i> 답글쓰기
          </Link> &nbsp;

          {
            /* 자신이 작성한 게시글인 경우에만 수정, 삭제 가능 */
            (localStorage.getItem("id") === bbs.writerName) ?
              <>
                <Link 
                  className="btn btn-outline-secondary"  
                  to="/bbsupdate" 
                  state={{ bbs: updateBbs }}
                >
                  <i className="fas fa-edit"></i> 수정
                </Link> &nbsp;
                <button 
                  className="btn btn-outline-danger"  
                  onClick={deleteBbs}
                >
                  <i className="fas fa-trash-alt"></i> 삭제
                </button>
              </>
            :
            null
          }
        </div>

        <table className="table table-striped">
          <tbody>
            <tr>
              <th className="col-3">작성자</th>
              <td>
                <span>{bbs.writerName}</span>
              </td>
            </tr>

            <tr>
              <th>제목</th>
              <td>
                <span>{bbs.title}</span>
              </td>
            </tr>

            <tr>
              <th>작성일</th>
              <td>
                <span>{bbs.createdDate}</span>
              </td>
            </tr>

            <tr>
              <th>조회수</th>
              <td>
                <span>{bbs.viewCount}</span>
              </td>
            </tr>

            <tr>
              <th>내용</th>
              <td></td>
            </tr>
          </tbody>
        </table>

        <div className="content-box">{bbs.content}</div>
        <div>
          <FileDisplay files={bbs.files} boardId={boardId} />
        </div>
        
        {/* 댓글 리스트 컴포넌트 */}
        <CommentList boardId={boardId} />

        {/* 댓글 작성 컴포넌트 */}
        {
          (auth) ? // 로그인한 사용자만 댓글 작성 가능
            <CommentWrite boardId={boardId}/>
          :
            <div className="text-center my-3">
              <div className="alert alert-info">
                댓글을 작성하려면 <Link to="/login">로그인</Link>해주세요.
              </div>
            </div>
        }
      </div>
    </div>
  );
}

export default BbsDetail;