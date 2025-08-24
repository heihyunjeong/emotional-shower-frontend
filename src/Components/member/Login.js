/* 로그인 컴포넌트 */

import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../../state/authState';
import { HttpHeadersContext } from "../context/HttpHeadersProvider";
import API_BASE_URL, { API_ENDPOINTS, API_CONFIG } from '../../config/api'; // API 설정 import

function Login() {

	const auth = useRecoilValue(userState);
	const setAuth = useSetRecoilState(userState);
	const { headers, setHeaders } = useContext(HttpHeadersContext);

	const navigate = useNavigate();

	const [id, setId] = useState("");
	const [pwd, setPwd] = useState("");

	const changeId = (event) => {
		setId(event.target.value);
	}

	const changePwd = (event) => {
		setPwd(event.target.value);
	}

	const login = async () => {
		const req = {
			email: id,
			password: pwd
		}

		console.log("[Login.js] 로그인 시도:", req);
		console.log("[Login.js] API URL:", API_BASE_URL + API_ENDPOINTS.USER.LOGIN);

		await axios.post(API_BASE_URL + API_ENDPOINTS.USER.LOGIN, req, API_CONFIG)
		.then((resp) => {
			console.log("[Login.js] login() success :D");
			console.log(resp.data);

			alert(resp.data.email + "님, 성공적으로 로그인 되었습니다 🔐");

			// JWT 토큰 저장
			localStorage.setItem("bbs_access_token", resp.data.token);
			localStorage.setItem("id", resp.data.email);

			setAuth(resp.data.email);
			setHeaders({"Authorization": `Bearer ${resp.data.token}`});

			navigate("/bbslist");
		})
		.catch((err) => {
			console.log("[Login.js] login() error :<");
			console.log("Status Code:", err.response?.status);
			console.log("Error Data:", err.response?.data);
			console.log("Full Error:", err);

			if (err.response?.status === 401) {
				alert("⚠️ 이메일 또는 비밀번호가 올바르지 않습니다.");
			} else if (err.response?.status === 404) {
				alert("⚠️ 서버를 찾을 수 없습니다. 백엔드가 실행 중인지 확인하세요.");
			} else {
				const errorMsg = err.response?.data?.message || err.response?.data || "로그인 중 오류가 발생했습니다.";
				alert("⚠️ " + errorMsg);
			}
		});
	}

	return (
		<div>
			<table className="table">
				<tbody>
					<tr>
						<th className="col-3">아이디</th>
						<td>
							<input type="text" value={id} onChange={changeId} size="50px" />
						</td>
					</tr>

					<tr>
						<th>비밀번호</th>
						<td>
							<input type="password" value={pwd} onChange={changePwd} size="50px" />
						</td>
					</tr>
				</tbody>
			</table><br />

			<div className="my-1 d-flex justify-content-center">
				<button className="btn btn-outline-secondary" onClick={login}>
					<i className="fas fa-sign-in-alt"></i> 로그인
				</button>
			</div>
		</div>
	);
}

export default Login;