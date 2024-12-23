import Button from "@/components/common/Button/Button"
import React, { useState, useEffect } from "react"
import QRScanner from "./QRScanner"
import { css } from "@emotion/react"

function QRScannerModal({ closeComp, compState, type, id }: { closeComp?: Function; compState: boolean; type: 'moenyvill_rental' | 'moenyvill_purchase'; id: number; }) {
	const [unmount, setUnmount] = useState<boolean>(false)

	useEffect(() => {
		if (compState === false) {
			setTimeout(() => {
				setUnmount(() => true)
			}, 300)
		} else {
			setUnmount(() => false)
		}
	}, [compState])

	return (
		<div css={wrapperCSS}>
			{unmount === false && <QRScanner closeComp={closeComp} type={type} id={id} />}
			<div css={buttonWrapperCSS}>
				<Button
					text={"취소"}
					fontSize={"var(--student-h3)"}
					width={"40%"}
					theme={"mobileCancel"}
					onClick={() => {
						closeComp && closeComp()
					}}
				/>
			</div>
		</div>
	)
}

const wrapperCSS = css`
	width: 90vw;
	border-radius: 10px;
	box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
	background-color: white;
	overflow: hidden;
`

const buttonWrapperCSS = css`
	width: 100%;
	display: flex;
	justify-content: center;
	padding-bottom: 30px;
`

export default QRScannerModal
