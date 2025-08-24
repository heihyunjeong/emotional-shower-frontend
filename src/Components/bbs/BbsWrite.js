import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";
import API_BASE_URL, { API_ENDPOINTS, getAuthFileHeaders } from "../../config/api";

import "../../css/bbswrite.css";

function BbsWrite() {
  const { auth, setAuth } = useContext(AuthContext);
  const { headers, setHeaders } = useContext(HttpHeadersContext);

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const changeTitle = (event) => {
    setTitle(event.target.value);
  };

  const changeContent = (event) => {
    setContent(event.target.value);
  };

  const handleChangeFile = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const remainingSlots = 5 - files.length;
    const filesToAdd = selectedFiles.slice(0, remainingSlots);
    
    // 파일 크기 검증 (10MB 제한)
    const oversizedFiles = filesToAdd.filter(file => file.size > 10 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      alert(`파일 크기는 10MB 이하여야 합니다.\n용량 초과 파일: ${oversizedFiles.map(f => f.name).join(', ')}`);
      return;
    }

    setFiles((prevFiles) => [...prevFiles, ...filesToAdd]);
    
    // 입력 필드 초기화
    event.target.value = '';
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  /* 파일 업로드 */
  const fileUpload = async (boardId) => {
    if (files.length === 0) {
      console.log("업로드할 파일이 없습니다.");
      return;
    }

    try {
      console.log("업로드할 파일 목록:", files);
      const fd = new FormData();
      files.forEach((file) => fd.append("file", file));

      const response = await axios.post(
        API_BASE_URL + API_ENDPOINTS.FILE.UPLOAD(boardId), 
        fd, 
        { headers: getAuthFileHeaders() }
      );

      console.log("[BbsWrite.js] fileUpload() success :D");
      console.log(response.data);
    } catch (error) {
      console.log("[BbsWrite.js] fileUpload() error :<");
      console.error(error);
      
      const errorMsg = error.response?.data?.message || "파일 업로드 중 오류가 발생했습니다.";
      alert("⚠️ " + errorMsg);
      throw error; // 에러를 다시 던져서 상위에서 처리
    }
  };

  /* 입력 유효성 검사 */
  const validateInput = () => {
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return false;
    }
    
    if (title.trim().length < 2) {
      alert("제목은 2자 이상 입력해주세요.");
      return false;
    }
    
    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      return false;
    }
    
    if (content.trim().length < 5) {
      alert("내용은 5자 이상 입력해주세요.");
      return false;
    }
    
    return true;
  };

  /* [POST /board/write]: 게시글 작성 */
  const createBbs = async () => {
    // 유효성 검사
    if (!validateInput()) {
      return;
    }

    // 중복 제출 방지
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const req = {
        title: title.trim(),
        content: content.trim(),
      };

      const response = await axios.post(
        API_BASE_URL + API_ENDPOINTS.BOARD.WRITE, 
        req, 
        { headers: headers }
      );

      console.log("[BbsWrite.js] createBbs() success :D");
      console.log(response.data);
      
      const boardId = response.data.boardId;
      console.log("boardId:", boardId);

      // 파일이 있으면 업로드
      if (files.length > 0) {
        await fileUpload(boardId);
      }

      alert("새로운 게시글을 성공적으로 등록했습니다 :D");
      navigate(`/bbsdetail/${boardId}`);
      
    } catch (error) {
      console.log("[BbsWrite.js] createBbs() error :<");
      console.error(error);
      
      if (error.response?.status === 401) {
        alert("로그인이 필요합니다.");
        navigate("/login");
      } else if (error.response?.status === 403) {
        alert("게시글 작성 권한이 없습니다.");
      } else {
        const errorMsg = error.response?.data?.message || "게시글 등록 중 오류가 발생했습니다.";
        alert("⚠️ " + errorMsg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // 컴포넌트가 렌더링될 때마다 localStorage의 토큰 값으로 headers를 업데이트
    setHeaders({
      Authorization: `Bearer ${localStorage.getItem("bbs_access_token")}`,
    });

    // 로그인한 사용자인지 체크
    if (!auth) {
      alert("로그인 한 사용자만 게시글을 작성할 수 있습니다 !");
      navigate("/login");
    }
  }, []);

  // 파일 크기를 읽기 쉽게 변환
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <h2 className="mb-4">게시글 작성</h2>
          
          <table className="table">
            <tbody>
              <tr>
                <th className="table-primary" style={{width: '150px'}}>작성자</th>
                <td>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={localStorage.getItem("id") || ""} 
                    readOnly 
                  />
                </td>
              </tr>

              <tr>
                <th className="table-primary">제목</th>
                <td>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={title} 
                    onChange={changeTitle}
                    placeholder="제목을 입력해주세요 (2자 이상)"
                    maxLength="100"
                  />
                  <small className="text-muted">{title.length}/100</small>
                </td>
              </tr>

              <tr>
                <th className="table-primary">내용</th>
                <td>
                  <textarea 
                    className="form-control" 
                    value={content} 
                    onChange={changeContent}
                    rows="15"
                    placeholder="내용을 입력해주세요 (5자 이상)"
                    maxLength="2000"
                  ></textarea>
                  <small className="text-muted">{content.length}/2000</small>
                </td>
              </tr>

              <tr>
                <th className="table-primary">파일첨부</th>
                <td>
                  {files.length > 0 && (
                    <div className="mb-3">
                      <h6>첨부된 파일 ({files.length}/5):</h6>
                      {files.map((file, index) => (
                        <div key={index} className="d-flex align-items-center justify-content-between border rounded p-2 mb-2">
                          <div>
                            <strong>{file.name}</strong>
                            <small className="text-muted ms-2">({formatFileSize(file.size)})</small>
                          </div>
                          <button 
                            className="btn btn-sm btn-outline-danger" 
                            type="button" 
                            onClick={() => handleRemoveFile(index)}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {files.length < 5 && (
                    <div>
                      <input 
                        type="file" 
                        name="file" 
                        onChange={handleChangeFile} 
                        multiple 
                        className="form-control"
                        accept="*/*"
                      />
                      <small className="text-muted">
                        파일 크기: 최대 10MB | 개수: 최대 5개 | 현재 {files.length}/5개 선택됨
                      </small>
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="d-flex justify-content-center gap-3 my-4">
            <button 
              className="btn btn-secondary" 
              onClick={() => navigate(-1)}
              disabled={isSubmitting}
            >
              <i className="fas fa-arrow-left"></i> 취소
            </button>
            
            <button 
              className="btn btn-primary" 
              onClick={createBbs}
              disabled={isSubmitting || !title.trim() || !content.trim()}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  등록 중...
                </>
              ) : (
                <>
                  <i className="fas fa-pen"></i> 등록하기
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BbsWrite;