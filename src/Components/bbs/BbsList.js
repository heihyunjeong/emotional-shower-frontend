import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";
import axios from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import {
  bbsListState,
  currentPageState,
  pageSizeState,
  totalPagesState,
  totalCntState,
  choiceValState,
  searchValState,
  searchParamsSelector,
  isLoadingState
} from '../../state/bbsState';

import "../../css/bbslist.css";
import "../../css/page.css";

function BbsList() {
  // Recoil 상태 관리
  const [bbsList, setBbsList] = useRecoilState(bbsListState);
  const [page, setPage] = useRecoilState(currentPageState);
  const [pageSize, setPageSize] = useRecoilState(pageSizeState);
  const [totalPages, setTotalPages] = useRecoilState(totalPagesState);
  const [totalCnt, setTotalCnt] = useRecoilState(totalCntState);
  const [choiceVal, setChoiceVal] = useRecoilState(choiceValState);
  const [searchVal, setSearchVal] = useRecoilState(searchValState);
  const setIsLoading = useSetRecoilState(isLoadingState);
  
  const searchParams = useRecoilValue(searchParamsSelector);

  // 게시글 전체 조회
  const getBbsList = async (pageNum) => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:8989/board/list", {
        params: {"page": pageNum - 1},
      });

      console.log("[BbsList.js] useEffect() success :D");
      console.log(response.data);

      setBbsList(response.data.content);
      setPageSize(response.data.pageSize);
      setTotalPages(response.data.totalPages);
      setTotalCnt(response.data.totalElements);
    } catch (error) {
      console.log("[BbsList.js] useEffect() error :<");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // 게시글 검색
  const search = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:8989/board/search", {
        params: searchParams,
      });

      console.log("[BbsList.js searchBtn()] success :D");
      console.log(response.data);

      setBbsList(response.data.content);
      setTotalCnt(response.data.totalElements);
    } catch (error) {
      console.log("[BbsList.js searchBtn()] error :<");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // 첫 로딩 시, 한 페이지만 가져옴
  useEffect(() => {
    getBbsList(1);
  }, []);

  // 검색 조건 저장
  const changeChoice = (event) => { 
    setChoiceVal(event.target.value);
  };
  
  const changeSearch = (event) => { 
    setSearchVal(event.target.value);
  };

  // 페이징 보여주기 
  const changePage = (pageNum) => {
    setPage(pageNum);
    getBbsList(pageNum);
  };

  return (
    <div>
      {/* 검색 */}
      <table className="search">
        <tbody>
          <tr>
            <td>
              <select
                className="custom-select"
                value={choiceVal}
                onChange={changeChoice}
              >
                <option>검색 옵션 선택</option>
                <option value="title">제목</option>
                <option value="content">내용</option>
                <option value="writer">작성자</option>
              </select>
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                placeholder="검색어"
                value={searchVal}
                onChange={changeSearch}
              />
            </td>
            <td>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={search}
              >
                <i className="fas fa-search"></i> 검색
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <br />

      <table className="table table-hover">
        <thead>
          <tr>
            <th className="col-1">번호</th>
            <th className="col-7">제목</th>
            <th className="col-3">작성자</th>
            <th className="col-1">조회수</th>
          </tr>
        </thead>

        <tbody>
          {bbsList.map(function (bbs, idx) {
            return <TableRow obj={bbs} key={idx} cnt={idx + 1} />;
          })}
        </tbody>
      </table>

      <Pagination
        className="pagination"
        activePage={page}
        itemsCountPerPage={pageSize}
        totalItemsCount={totalCnt}
        pageRangeDisplayed={totalPages}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={changePage}
      />

      <div className="my-5 d-flex justify-content-center">
        <Link className="btn btn-outline-secondary" to="/bbswrite">
          <i className="fas fa-pen"></i> &nbsp; 글쓰기
        </Link>
      </div>
    </div>
  );
}

/* 글 목록 테이블 행 컴포넌트 */
function TableRow(props) {
  const bbs = props.obj;

  return (
    <tr>
      <th>{props.cnt}</th>
      <td>
        <Link to={{ pathname: `/bbsdetail/${bbs.boardId}` }}>
          <span className="underline bbs-title">{bbs.title}</span>
        </Link>
      </td>
      <td>{bbs.writerName}</td>
      <td style={{ textAlign: 'center' }}>{bbs.viewCount}</td>
    </tr>
  );
}

export default BbsList;