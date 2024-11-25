import { useState, useEffect, useRef } from "react"
import { css } from "@emotion/react"
import { postStudentTokenUpdateAPI } from "@/api/student/user/postStudentTokenUpdateAPI"
import { removeCookie, setCookie } from "@/api/cookie"
import { useRouter } from "next/router"
import { getTokenStatusAPI } from "@/api/common/getTokenStatusAPI"
import Button from "@/components/common/Button/Button"
import LoadImage from "@/components/common/LoadImage/LoadImage"

import useNotification from "@/hooks/useNotification"
import NotiTemplate from "@/components/common/StackNotification/NotiTemplate"
import useGetTokenStatus from "@/hooks/useGetTokenStatus"

function enter() {
	const router = useRouter()
	const noti = useNotification()
	const [getTokenStatus, setTokenStatus] = useGetTokenStatus()

	const refreshToken = async () => {
		getTokenStatusAPI().then((res) => {
			if (res.status == "require_refresh_token") {
				postStudentTokenUpdateAPI().then((res) => {
					setCookie("Authorization", res, { path: "/", maxAge: 30 * 24 * 60 * 60 })
					setTokenStatus({ showMessage: false }).then((res) => {
						console.log("여기에 할일")
					})
					// router.push("/student/home")
				})
			} else {
				noti({
					content: <NotiTemplate type={"alert"} content={`선생님께서 확인 중이에요.`} />,
					duration: 3000,
				})
			}
		})
	}

	useEffect(() => {
		getTokenStatusAPI().then((res) => {
			if (res.role == "STUDENT") {
				if (res.status == "require_submit_code") {
					router.push("/student/enter")
				}

				// if (res.status == "waiting") {
				// 	router.push("/student/check")
				// }

				// if (res.status == "require_refresh_token") {
				// 	router.push("/student/check")
				// }

				if (res.status == "approved") {
					process.env.NODE_ENV === "production"
						? router.push("https://jungle-school.xyz/client")
						: router.push("http://localhost:5173");
				}
			}
		})
	}, [])

	const signoutHandler = () => {
		removeCookie("Authorization", { path: "/" })
		setTokenStatus({ showMessage: false }).then((res) => {
			console.log("여기에 할일")
		})
		// navigate("/teacher/login")
	}

	return (
		<div css={checkWrapperCSS}>
			<div css={logoutWrapperCSS}>
				<div onClick={signoutHandler}>로그아웃</div>
			</div>
			<LoadImage src={"/assets/check/check_image_1.png"} alt={"check_image"} wrapperCss={imageWrapper} dev={false} />

			<div
				css={css`
					margin-top: 20px;
					font-weight: 500;
					font-size: 5vw;
					margin-bottom: 20px;
				`}
			>
				선생님 승인을 기다려주세요.
			</div>

			<Button
				text={"우리반으로 이동!"}
				fontSize={`3vw`}
				width={"30%"}
				height={"10vw"}
				theme={"brownButton"}
				onClick={refreshToken}
				cssProps={css`
					margin-bottom: 36px;
				`}
			></Button>
		</div>
	)
}

const checkWrapperCSS = css`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	flex: 1;
	background-color: #81a521;
`

const imageWrapper = css`
	width: 100%;
	height: 40vw;
	overflow: visible;
`

const logoutWrapperCSS = css`
	width: 100%;
	display: flex;
	justify-content: flex-end;
	padding: 16px;
	position: absolute;
	z-index: 200;
`

export default enter
