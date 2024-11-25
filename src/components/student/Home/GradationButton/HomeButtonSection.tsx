import React, { useEffect } from 'react'
import { css } from "@emotion/react"
import HomeGradationButton from './HomeGradationButton'
import LoadImage from '@/components/common/LoadImage/LoadImage'
import useNavigate from '@/hooks/useNavigate'
import { useRouter } from 'next/router'
import Link from 'next/link'
import useGetNation from '@/hooks/useGetNation'
import { appendEiGa } from '@/util/isEndWithConsonant'


function HomeButtonSection() {
    const navigate = useNavigate()
    const [nation] = useGetNation()


    
  return (
    <div css={buttonSectionWrapperCSS}>
        <div css={columnCSS}>
            {/* <HomeGradationButton cssProps={css`width: 42%; height: 140px;`} backgroundColor={['#e0c3fc', '#8ec5fc']} onClick={() => {navigate('/student/home/coupon', 'bottomToTop')}}>
            
                <div css={lsizeFontCSS}>
                    쿠폰을 써보아요.
                </div>
                <div css={[imageWrapperCSS, css`margin-top: -12px; margin-left: 8px;`]}>
                    <LoadImage src={'/assets/home/coupon.png'} alt={'coupon'} wrapperCss={css`width: 120px; height: 120px;`} />
                </div>
                

                
            </HomeGradationButton> */}
            <HomeGradationButton cssProps={css`width: 50%; height: 140px;`} backgroundColor={['green', 'green']} onClick={() => {navigate('/student/home/exchequer', 'bottomToTop')}}>
                <div css={msizeFontCSS}>
                    우리나라의 국고에
                </div>
                <div css={lsizeFontCSS}>
                    {nation.treasury.toLocaleString('ko-KR')} {appendEiGa(nation.currency)}
                </div>
                <div css={msizeFontCSS}>
                    남아있어요!
                </div>
                <div css={[imageWrapperCSS, css`margin-top: -24px;`]}>
                    <LoadImage src={'/assets/home/exchequer.png'} alt={'exchequer'} wrapperCss={css`width: 120px; height: 80px;`}/>
                </div>
            </HomeGradationButton>
            <HomeGradationButton cssProps={css`width: 50%; height: 140px;`} backgroundColor={['skyblue', 'pink']} onClick={() => {navigate('/student/finance/deposit', 'bottomToTop')}}>
                <div css={lsizeFontCSS}>
                    예금하러 가기!
                </div>
                <div css={[imageWrapperCSS, css`margin-top: 1px;`]}>
                    <LoadImage src={'/assets/home/deposit.png'} alt={'deposit'} wrapperCss={css`width: 120px; height: 80px;`} />
                </div>
            </HomeGradationButton>
            </div>

            <div css={columnCSS}>
            <HomeGradationButton cssProps={css`width: 50%; height: 140px;`} backgroundColor={['black', 'white']} onClick={() => {navigate('/student/gov/rule', 'bottomToTop')}}>
                <div css={lsizeFontCSS}>
                    퀴즈풀러 가기!
                </div>
                <div css={[imageWrapperCSS, css`margin-top: 1px;`]}>
                    <LoadImage src={'/assets/home/quiz.png'} alt={'quiz'} wrapperCss={css`width: 120px; height: 80px;`} />
                </div>
            </HomeGradationButton>
            <HomeGradationButton cssProps={css`width: 50%; height: 140px;`} backgroundColor={['blue', 'red']} onClick={() => {navigate('/student/finance/invest', 'bottomToTop')}}>
                <div css={lsizeFontCSS}>
                    투자 체험하러 가기!
                </div>
                <div css={[imageWrapperCSS, css`margin-top: 1px;`]}>
                    <LoadImage src={'/assets/home/stock.png'} alt={'stock'} wrapperCss={css`width: 120px; height: 77px;`} />
                </div>
            </HomeGradationButton>

        </div>
        
    </div>
  )
}

const buttonSectionWrapperCSS = css`
    width: 95%;
`

const columnCSS = css`
    display: flex;
    justify-content: space-between;
`

const lsizeFontCSS = css`
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 4px;
`

const msizeFontCSS = css`
    font-size: var(--student-h4);
    font-weight: 700;
    margin-bottom: 4px;
`

const imageWrapperCSS = css`
    width: 100%;
    display: flex;
    justify-content: end;
`
export default HomeButtonSection