import React, { useRef, useEffect } from "react"
import { css } from "@emotion/react"

type FormInputProps = {
	inputState: any
	children: any
	titleChangeHandler: React.ChangeEventHandler
	contentChangeHandler: React.ChangeEventHandler
	answerChangeHandler?: (value: boolean) => void
	titlePlaceHolder?: string
	contentPlaceHolder?: string
	noTitle?: boolean
	showToggleBox?: boolean;
}
function FormInput({
	children,
	titleChangeHandler,
	contentChangeHandler,
	answerChangeHandler,
	titlePlaceHolder,
	contentPlaceHolder,
	noTitle,
	inputState,
	showToggleBox = false,
}: FormInputProps) {
	const contentRef = useRef<HTMLTextAreaElement>(null)

	const resizeHeightHandler = () => {
		if (contentRef.current) {
			contentRef.current.style.height = "auto"
			contentRef.current.style.height = contentRef.current.scrollHeight + "px"
		}
	}

	useEffect(() => {
		resizeHeightHandler()
	}, [])

	const titleInput = (
		<React.Fragment>
			<input css={inputCSS} value={inputState.title} onChange={titleChangeHandler} placeholder={titlePlaceHolder} />
			<div css={lineCSS} />
		</React.Fragment>
	)

	const contentInput = (
		<textarea
			ref={contentRef}
			css={textareaCSS}
			value={inputState.content}
			onChange={(event) => {
				contentChangeHandler(event)
				resizeHeightHandler()
			}}
			placeholder={contentPlaceHolder}
		/>
	)

	const toggleBox = 
		showToggleBox && answerChangeHandler ? (
		<div css={toggleBoxCSS}>
			<button
				css={toggleButtonCSS(inputState.answer === true, true)}
				onClick={() => answerChangeHandler(true)}
			>
				O
			</button>
			<button
				css={toggleButtonCSS(inputState.answer === false, false)}
				onClick={() => answerChangeHandler(false)}
			>
				X
			</button>
		</div>
	) : null;

	return (
		<div css={wrapperCSS}>
			{noTitle !== true && titleInput}
			<div css={contentWrapperCSS}>
				{contentInput}
				{toggleBox}
				{children}
			</div>
			
		</div>
	)
}

const wrapperCSS = css`
	width: 100%;
	/* height: 100%; */
	box-sizing: border-box;
	border-radius: 10px;
	
	/* padding: 4px 16px 4px 16px; */
	background-color: rgba(255, 255, 255, 0.1);
	/* overflow: hidden; */
	display: flex;
	flex-direction: column;
`

const inputCSS = css`
	width: 100%;
	outline: none;
	border: none;
	background-color: rgba(255, 255, 255, 0);
	color: white;
	padding: 16px;
	font-size: var(--teacher-h5);
	font-weight: 500;
	&::placeholder {
		color: rgba(255, 255, 255, 0.6);
	}
`

const textareaCSS = css`
	width: 100%;
	outline: none;
	border: none;
	background-color: rgba(255, 255, 255, 0);
	color: white;
	padding: 16px;
	font-size: var(--teacher-h5);
	font-weight: 500;
	resize: none;
	&::placeholder {
		color: rgba(255, 255, 255, 0.6);
	}
	/* flex: 1; */
`

const lineCSS = css`
	width: 100%;
	height: 1px;
	border-bottom: 2px solid rgba(255, 255, 255, 0.1);
`

const contentWrapperCSS = css`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	position: relative;
`

const toggleBoxCSS = css`
	display: flex;
	justify-content: flex-start;
	position: absolute;
	bottom: 8px;
	left: 0;
	margin-top: 8px;
`

const toggleButtonCSS = (isActive: boolean, isOButton: boolean) => css`
	background-color: ${isActive ? (isOButton ? "#4caf50" : "#f44336") : "#b0b0b0"};
	color: white;
	border: none;
	border-radius: 4px;
	padding: 8px 20px;
	cursor: pointer;
	margin: 0 8px;
	font-size: 1.2em;
	&:hover {
		opacity: 0.8;
	}
`

export default FormInput
