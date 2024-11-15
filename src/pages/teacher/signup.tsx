import { useReducer, useEffect } from "react"
import { css } from "@emotion/react"
import { postTeacherAPI } from "@/api/teacher/user/postTeacherAPI"
import { KOREAN_ONLY, ENG_NUM_ONLY } from "@/util/regex"
import { lengthCheck } from "@/util/lengthCheck"
import LoadImage from "@/components/common/LoadImage/LoadImage"
import Input from "@/components/common/Input/Input"
import Button from "@/components/common/Button/Button"
import { NAME_ICON, ID_ICON, PASSWORD_ICON, PASSWORD2_ICON } from "@/components/teacher/Signup/SignupIcons/SignupIcons"
import { postDuplicationCheckAPI } from "@/api/common/postDuplicationCheckAPI"
import { useRouter } from "next/router"

const inputReducer = (
	state: { name: string; id: string; password: string; password2: string },
	action: { type: string; value: string },
) => {
	switch (action.type) {
		case "CHANGE_NAME":
			return { ...state, name: action.value }
		case "CHANGE_ID":
			return { ...state, id: action.value }
		case "CHANGE_PW":
			return { ...state, password: action.value }
		case "CHANGE_PW2":
			return { ...state, password2: action.value }
		default:
			return state
	}
}

const validReducer = (
	state: { name: boolean; id: boolean; password: boolean; password2: boolean },
	action: { type: string; value: boolean },
) => {
	switch (action.type) {
		case "VALID_NAME":
			return { ...state, name: action.value }
		case "VALID_ID":
			return { ...state, id: action.value }
		case "VALID_PW":
			return { ...state, password: action.value }
		case "VALID_PW2":
			return { ...state, password2: action.value }
		default:
			return state
	}
}

const validMessageReducer = (
	state: { name: string; id: string; password: string; password2: string },
	action: { type: string; value: string },
) => {
	switch (action.type) {
		case "VALID_NAME":
			return { ...state, name: action.value }
		case "VALID_ID":
			return { ...state, id: action.value }
		case "VALID_PW":
			return { ...state, password: action.value }
		case "VALID_PW2":
			return { ...state, password2: action.value }
		default:
			return state
	}
}

function Signup() {
	const [validState, dispatchValid] = useReducer(validReducer, {
		name: false,
		id: false,
		password: false,
		password2: false,
	})
	const [validMessageState, dispatchValidMessage] = useReducer(validMessageReducer, {
		name: "",
		id: "",
		password: "",
		password2: "",
	})
	const [inputState, dispatchInput] = useReducer(inputReducer, {
		name: "",
		id: "",
		password: "",
		password2: "",
	})

	const router = useRouter()

	useEffect(() => {
		checkValidNameHandler()
	}, [inputState.name])
	useEffect(() => {
		checkValidIDHandler()
	}, [inputState.id])
	useEffect(() => {
		checkValidPWHandler()
	}, [inputState.password])
	useEffect(() => {
		checkValidPW2Handler()
	}, [inputState.password2])

	const checkValidNameHandler = (forSumbit = false) => {
		if (inputState.name === "") {
			if (forSumbit) {
				dispatchValidMessage({ type: "VALID_NAME", value: "이름을 입력해 주세요." })
			}
			dispatchValid({ type: "VALID_NAME", value: false })
			return
		}
		if (KOREAN_ONLY.test(inputState.name) === false) {
			dispatchValidMessage({ type: "VALID_NAME", value: "이름은 한글만 입력 가능합니다." })
			dispatchValid({ type: "VALID_NAME", value: false })
			return
		}
		dispatchValidMessage({ type: "VALID_NAME", value: "" })
		dispatchValid({ type: "VALID_NAME", value: true })
	}

	const checkValidIDHandler = (forSumbit = false, checkVerify = false) => {
		if (inputState.id === "") {
			if (forSumbit) {
				dispatchValidMessage({ type: "VALID_ID", value: "아이디를 입력해 주세요." })
			}
			dispatchValid({ type: "VALID_ID", value: false })
			return
		}
		if (ENG_NUM_ONLY.test(inputState.id) === false || lengthCheck(inputState.id, 4, 10) === false) {
			dispatchValid({ type: "VALID_ID", value: false })
			dispatchValidMessage({
				type: "VALID_ID",
				value: "아이디는 영어, 숫자 조합으로 최소 4자부터 최대 10자까지 입력 가능합니다.",
			})
			return
		}
		if (forSumbit) {
			if (!validState.id) {
				dispatchValidMessage({ type: "VALID_ID", value: "아이디 중복 확인을 해주세요." })
				dispatchValid({ type: "VALID_ID", value: false })
				return
			}
		}
		dispatchValidMessage({ type: "VALID_ID", value: "" })
		dispatchValid({ type: "VALID_ID", value: false })

		if (checkVerify) {
			postDuplicationCheckAPI({ body: { identity: inputState.id } }).then((res) => {
				if (res?.isDuplicated === false) {
					dispatchValidMessage({ type: "VALID_ID", value: "사용 가능한 ID입니다." })
					dispatchValid({ type: "VALID_ID", value: true })
				} else {
					dispatchValidMessage({ type: "VALID_ID", value: "이미 중복된 아이디, 혹은 사용 불가능한 아이디입니다." })
					dispatchValid({ type: "VALID_ID", value: false })
				}
			})
		}
	}

	const checkValidPWHandler = (forSumbit = false) => {
		if (inputState.password === "") {
			if (forSumbit) {
				dispatchValidMessage({
					type: "VALID_PW",
					value: "비밀번호를 입력해 주세요.",
				})
			}
			dispatchValid({ type: "VALID_PW2", value: false })
			return
		}
		if (ENG_NUM_ONLY.test(inputState.password) === false || lengthCheck(inputState.password, 8, 16) === false) {
			dispatchValid({ type: "VALID_PW2", value: false })
			dispatchValidMessage({
				type: "VALID_PW",
				value: "비밀번호는 영어, 숫자 조합으로 최소 8자부터 최대 16자까지 입력 가능합니다.",
			})
			return
		}
		dispatchValidMessage({ type: "VALID_PW", value: "사용 가능한 비밀번호입니다." })
		dispatchValid({ type: "VALID_PW", value: true })
	}

	const checkValidPW2Handler = () => {
        if (inputState.password === "") {
            dispatchValid({ type: "VALID_PW2", value: false })
            dispatchValidMessage({ type: "VALID_PW2", value: "비밀번호를 먼저 입력해 주세요." })
            return
        }
        if (inputState.password2 === "") {
            dispatchValid({ type: "VALID_PW2", value: false })
            dispatchValidMessage({ type: "VALID_PW2", value: "비밀번호 확인을 입력해 주세요." })
            return
        }
        if (inputState.password2 !== inputState.password) {
            dispatchValid({ type: "VALID_PW2", value: false })
            dispatchValidMessage({ type: "VALID_PW2", value: "비밀번호가 일치하지 않습니다." })
            return
        }
        dispatchValidMessage({ type: "VALID_PW2", value: "비밀번호가 일치합니다." })
        dispatchValid({ type: "VALID_PW2", value: true })
    }

	const signUpHandler = async () => {
		checkValidNameHandler(true)
		checkValidIDHandler(true)
		checkValidPWHandler(true)
		checkValidPW2Handler()

		if (validState.name && validState.id && validState.password && validState.password2) {
			postTeacherAPI({
				body: {
					name: inputState.name,
					identity: inputState.id,
					password: inputState.password,
					checkedPassword: inputState.password,
				},
			})
				.then(() => {
					router.push("/teacher/login")
				})
				.catch((error) => {
					console.log(error)
				})
		}
	}

	const messageGenerator = ({ message, isValid }: { message: string; isValid: boolean }) => {
		return <div css={messageCSS({ isValid })}>{message}</div>
	}

	return (
		<div css={wrapperCSS}>
			<div css={innerWrapperCSS}>
				<LoadImage src={"/assets/signup/illust.png"} alt={"signup_illust"} wrapperCss={imageWrapperCSS} dev={false} />
				<div css={inputTitleCSS}>이름</div>
				<Input
					leftContent={NAME_ICON}
					theme={"mobileDefault"}
					placeholder="이름 (한글만 입력해주세요)"
					onChange={(e) => {
						dispatchInput({ type: "CHANGE_NAME", value: e.target.value })
					}}
					customCss={inputCSS}
				/>
				{messageGenerator({ message: validMessageState.name, isValid: validState.name })}

				<div css={inputTitleCSS}>아이디</div>
				<Input
					leftContent={ID_ICON}
					rightContent={
						<Button
							theme={"RadialPositiveMobile"}
							width={"96px"}
							height={"42px"}
							text={"중복 확인"}
							fontSize={"var(--teacher-h5)"}
							onClick={() => {
								checkValidIDHandler(false, true)
							}}
						></Button>
					}
					theme={"mobileDefault"}
					customCss={inputCSS}
					type="text"
					placeholder="영어, 숫자 4자~10자 입력해주세요"
					onChange={(e) => {
						dispatchInput({ type: "CHANGE_ID", value: e.target.value })
					}}
				/>
				{messageGenerator({ message: validMessageState.id, isValid: validState.id })}

				<div css={inputTitleCSS}>비밀번호</div>
				<Input
					leftContent={PASSWORD_ICON}
					theme={"mobileDefault"}
					customCss={inputCSS}
					type="password"
					placeholder="영어와 숫자를 조합해 8자~16자 입력해주세요"
					onChange={(e) => {
						dispatchInput({ type: "CHANGE_PW", value: e.target.value })
					}}
				/>
				{messageGenerator({ message: validMessageState.password, isValid: validState.password })}

				<div css={inputTitleCSS}>비밀번호 확인</div>
				<Input
					leftContent={PASSWORD2_ICON}
					theme={"mobileDefault"}
					customCss={inputCSS}
					type="password"
					placeholder="비밀번호를 다시 입력해 주세요"
					onChange={(e) => {
						dispatchInput({ type: "CHANGE_PW2", value: e.target.value })
					}}
				/>
				{messageGenerator({ message: validMessageState.password2, isValid: validState.password2 })}

				<div css={footerWrapperCSS}>
					<Button
						theme={"highlighted"}
						width={"180px"}
						height={"64px"}
						text={"회원가입"}
						fontSize={"var(--teacher-h4)"}
						onClick={signUpHandler}
					></Button>
				</div>
			</div>
		</div>
	)
}

const messageCSS = ({ isValid }: { isValid: boolean }) => {
	return css`
		font-size: var(--teacher-h6);
		color: ${isValid ? "rgba(0, 20, 50, 1)" : "var(--teacher-warning-color)"};
		margin: 8px 0px 16px 0px;
		height: 12px;
	`
}

const imageWrapperCSS = css`
	width: 100%;
	height: 23.3vw;
`

const wrapperCSS = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
`

const innerWrapperCSS = css`
  width: 40vw;
  display: flex;
  flex-direction: column;
`

const inputTitleCSS = css`
  color: rgba(0, 20, 50, 0.5);
  margin-bottom: 10px;
  font-weight: 700;
`

const inputCSS = css`
  width: 100%;
`

const footerWrapperCSS = css`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 24px 0px 84px 0px;
`

export default Signup
