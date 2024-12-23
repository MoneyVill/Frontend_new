import React, {useEffect, useState} from "react"
import PageHeader from "@/components/student/layout/PageHeader/PageHeader"

import { css } from "@emotion/react"
import LoadImage from "@/components/common/LoadImage/LoadImage"
import Button from "@/components/common/Button/Button"
import FinanceDepositApplyModal from "@/components/student/Finance/Deposit/Modal/FinanceDepositApplyModal"
import ModalContent from "@/components/common/Modal/ModalContent"
import Modal from "@/components/common/Modal/Modal"
import useCompHandler from "@/hooks/useCompHandler"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getFinanceDepositRateAPI } from "@/api/student/finance/getFinanceDepositRateAPI"
import { getFinanceDepositRateType } from "@/types/student/apiReturnTypes"
import ModalAlert from "@/components/common/Modal/ModalAlert"
import { isNavigating } from "@/store/store"
import { useAtom } from "jotai"
import useGetNation from "@/hooks/useGetNation"



const APPLY_ICON = (
	<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M24.9993 29V17M18.9992 23H30.9993M24.9993 40C34.3881 40 41.9992 32.3888 41.9992 23C41.9992 13.6112 34.3881 6 24.9993 6C15.6104 6 7.99925 13.6112 7.99925 23C7.99925 24.9 8.31094 26.7272 8.88599 28.4332C9.10239 29.0752 9.21059 29.3962 9.2301 29.6429C9.24938 29.8864 9.23481 30.0571 9.17456 30.2939C9.11354 30.5336 8.97884 30.783 8.70944 31.2816L5.43812 37.3367C4.9715 38.2004 4.73819 38.6323 4.79041 38.9655C4.83589 39.2558 5.00674 39.5115 5.2576 39.6645C5.5456 39.8402 6.03385 39.7897 7.01033 39.6887L17.2524 38.63C17.5625 38.598 17.7176 38.5819 17.859 38.5873C17.998 38.5927 18.0961 38.6057 18.2317 38.637C18.3696 38.6687 18.5429 38.7355 18.8896 38.8691C20.7857 39.5996 22.8457 40 24.9993 40Z"
			stroke="black"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
)

type GuidePageProps = {
	data: getFinanceDepositRateType
	refetch: Function
}

function GuidePage({data, refetch}: GuidePageProps) {
	const [openComp, closeComp, compState] = useCompHandler()
	const [isNavigatingAtom, setIsNavigatingAtom] = useAtom(isNavigating)
	const [term, setTerm] = useState<0 | 1>(0)
	const [nation] = useGetNation()

	

	useEffect(() => {
		console.log(data)
	}, [data])

	return (
		<React.Fragment>
			{data && (
				<Modal
					content={
						<ModalContent
							width={"90vw"}
							title={"정기 예금 신청"}
							titleSize={"var(--student-h1)"}
							icon={APPLY_ICON}
							content={<FinanceDepositApplyModal refetch={refetch} closeComp={closeComp} unit={` ${nation?.currency}`} data={data} term={term}/>}
							forChild={true}
						/>
					}
					compState={compState}
					closeComp={closeComp}
					transition={"scale"}
				/>
			
			)}
			{isNavigatingAtom === false && <div css={navBarOverlayCSS}>
				<Button
					text={"7일 단기 예금 가입"}
					fontSize={`var(--student-h3)`}
					width={"48%"}
					theme={"greenButton"}
					onClick={() => {
						setTerm(() => 0)
						openComp()
						
					}}
				/>
				<Button
					text={"21일 장기 예금 가입"}
					fontSize={`var(--student-h3)`}
					width={"48%"}
					theme={"brownButton"}
					onClick={() => {
						setTerm(() => 1)
						openComp()
					}}
				/>
			</div>}
		
				

				<div css={guideWrapperCSS}>
					<div css={mSizeFontCSS}>
						저희 예금 상품은 두 가지가 있어요.
					</div>
					<div css={imageWrapperCSS}>
						<LoadImage
							src={"/assets/deposit/deposit_guide_1.png"}
							alt={"deposit_guide_1"}
							wrapperCss={firstImageWrapperCSS}
						/>
					</div>

					<div css={mSizeFontCSS}>오늘 7일 단기 예금 상품에 가입하면</div>
					<div css={sSizeFontCSS}>
						나의 신용등급 기준{" "}
						<span
							css={css`
								font-weight: 700;
							`}
						>
							{data && data.shortPeriod}% 이자의
						</span>{" "}
						돈을 더 돌려받을 수 있어요.
					</div>
					<div css={imageWrapperCSS}>
						<LoadImage
							src={"/assets/deposit/deposit_guide_2.png"}
							alt={"deposit_guide_1"}
							wrapperCss={firstImageWrapperCSS}
						/>
					</div>
					<div css={mSizeFontCSS}>
						기다리는게 어렵지 않다구요?
						<br />
						그럼 21일 장기 예금 상품에 가입하면
					</div>
					<div css={sSizeFontCSS}>
						나의 신용등급 기준{" "}
						<span
							css={css`
								font-weight: 700;
							`}
						>
							{data && data.longPeriod}% 이자의
						</span>{" "}
						돈을 더 돌려받을 수 있어요.
					</div>
					<div css={imageWrapperCSS}>
						<LoadImage
							src={"/assets/deposit/deposit_guide_3.png"}
							alt={"deposit_guide_1"}
							wrapperCss={firstImageWrapperCSS}
						/>
					</div>
				</div>
	
		</React.Fragment>
	)
}

const navBarOverlayCSS = css`
	width: 100%;
	height: 64px;
	background-color: #81a521;
	position: fixed;
	bottom: 0;
	z-index: 99999999;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0px 16px;

	opacity: 0%;
	animation: fadein 0.2s ease-in forwards;

	@keyframes fadein {
		from {
			opacity: 0%;
		}

		to {
			opacity: 100%;
		}
	}
`

const guideWrapperCSS = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 24px;
	background-color: #81a521;
`

const lSizeFontCSS = css`
	font-size: var(--student-h1);
	font-weight: 700;
	line-height: 120%;
	text-align: center;
`

const mSizeFontCSS = css`
	font-size: var(--student-h2);
	font-weight: 700;
	line-height: 130%;
	text-align: center;
`

const sSizeFontCSS = css`
	font-size: var(--student-h3);
	line-height: 150%;
`

const imageWrapperCSS = css`
	margin: 24px 0px 24px 0px;
	background-color: #81a521;
`

const firstImageWrapperCSS = css`
	width: 50vw;
	height: 40vw;
	background-color: #81a521;
`

export default GuidePage
