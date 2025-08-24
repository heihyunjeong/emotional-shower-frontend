import React, { useRef } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import Comment from "./Comment.js";
import API_BASE_URL, { API_ENDPOINTS, createCommentPageParams } from '../../config/api';
import "../../css/commentList.css"; // 스타일 파일 import

function CommentList(props) {

	const boardId = props.boardId;

	// Paging
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [totalPages, setTotalPages] = useState(5);
	const [totalCnt, setTotalCnt] = useState(0);
	const [commentList, setCommentList] = useState([]);

	// comment에서 참조
	const getCommentListRef = useRef(null);

	const changePage = (page) => {
		setPage(page);
		getCommentList(page);
		getCommentListRef.current(page);
	}

	const getCommentList = async (page) => {
		try {
			console.log(`[CommentList.js] 댓글 목록 조회 시작 - boardId: ${boardId}, page: ${page}`);
			console.log(`[CommentList.js] API URL: ${API_BASE_URL + API_ENDPOINTS.COMMENT.LIST(boardId)}`);
			
			const params = createCommentPageParams(page - 1, 5); // page는 0부터 시작
			
			const response = await axios.get(
				API_BASE_URL + API_ENDPOINTS.COMMENT.LIST(boardId), 
				{ params }
			);
			
			console.log("[CommentList.js] getCommentList() success :D");
			console.log(response.data);

			setPageSize(response.data.pageSize || response.data.size);
			setTotalPages(response.data.totalPages);
			setTotalCnt(response.data.totalElements);
			setCommentList(response.data.content);
			
		} catch (error) {
			console.log("[CommentList.js] getCommentList() error :<");
			console.log("Status Code:", error.response?.status);
			console.log("Error Data:", error.response?.data);
			console.log("Full Error:", error);

			// 에러 타입별 처리
			if (error.response?.status === 404) {
				console.log("게시글을 찾을 수 없습니다.");
				setCommentList([]);
			} else if (error.response?.status === 500) {
				alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
			} else if (error.code === 'ECONNREFUSED') {
				alert("서버에 연결할 수 없습니다. 백엔드 서버가 실행 중인지 확인해주세요.");
			} else {
				const errorMsg = error.response?.data?.message || "댓글 목록을 불러오는 중 오류가 발생했습니다.";
				alert("⚠️ " + errorMsg);
			}
		}
	}

	useEffect(() => {
		getCommentListRef.current = getCommentList;
		if (boardId) {
			getCommentList(1);
		}
	}, [boardId]);

	// 로딩 상태 표시
	if (!boardId) {
		return (
			<div className="text-center my-3">
				<div className="spinner-border" role="status">
					<span className="visually-hidden">로딩 중...</span>
				</div>
			</div>
		);
	}

	return (
		<>
			<div className="my-1 d-flex justify-content-center">
				<h5>💬 댓글 ({totalCnt}개)</h5>
			</div>

			{/* 댓글이 있을 때만 페이징 표시 */}
			{totalCnt > 0 && (
				<div className="d-flex justify-content-center my-3">
					<Pagination
						activePage={page}
						itemsCountPerPage={pageSize}
						totalItemsCount={totalCnt}
						pageRangeDisplayed={5}
						prevPageText={"‹"}
						nextPageText={"›"}
						onChange={changePage}
						linkClass="page-link"
						itemClass="page-item"
					/>
				</div>
			)}

			{/* 댓글 목록 */}
			{commentList.length > 0 ? (
				commentList.map((comment, idx) => (
					<div className="my-3" key={comment.id || idx}>
						<Comment 
							obj={comment} 
							boardId={boardId}
							page={page} 
							getCommentList={getCommentListRef.current}
						/>
					</div>
				))
			) : (
				<div className="text-center my-5">
					<div className="alert alert-light">
						<i className="fas fa-comment-slash"></i>
						<p className="mb-0">아직 댓글이 없습니다.</p>
						<small className="text-muted">첫 번째 댓글을 작성해보세요!</small>
					</div>
				</div>
			)}
		</>
	);
}

export default CommentList;