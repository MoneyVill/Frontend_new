import React from 'react'
import HomeTipCard from './HomeTipCard'
import { css } from "@emotion/react"

function HomeTipSection() {
  return (
    <div css={sectionWrapperCSS}>
        {/* <HomeTipCard mainLabel={'퀴즈를 풀어보아요!'} subLabel={"퀴즈를 맞추면 보상이 주어져요"} url={'/student/gov/rule'}/> */}
        {/* <HomeTipCard mainLabel={'일자리를 찾고 있나요?'} subLabel={"지금 어떤 직업에 자리가 있는지 보러 가볼까요?"} url={'/student/class/jobsearch'}/> */}
    </div>
  )
}

const sectionWrapperCSS = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export default HomeTipSection