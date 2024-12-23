import { css } from "@emotion/react"
import { useRouter } from "next/router"
import { useQuery } from "@tanstack/react-query"
import Carousel from "@/components/common/Carousel/Carousel"
import { getTeacherProductDetailAPI } from "@/api/common/shop/getTeacherProductDetailAPI"
import { getTeacherProductDetailType } from "@/types/teacher/apiReturnTypes"
import useGetNation from "@/hooks/useGetNation"
import Button from "@/components/common/Button/Button"
import useCompHandler from "@/hooks/useCompHandler"
import Modal from "@/components/common/Modal/Modal"
import ShowQR from "@/components/common/ShowQR/ShowQR"
import { useState } from "react"
import { deleteTeacherProductAPI } from "@/api/teacher/shop/deleteTeacherProductAPI"

function Product() {
  const router = useRouter()
  const { pid } = router.query
  const productId = typeof pid === "string" ? pid : ""
  const [nation] = useGetNation()
  const [openComp, closeComp, compState] = useCompHandler()
  const [time, setTime] = useState<number>(0)

  const { data } = useQuery<getTeacherProductDetailType>(
    ["product", productId],
    () => getTeacherProductDetailAPI({ pid: productId }),
    {
      enabled: !!productId,
    }
  )

  const deleteTeacherProduct = async () => {
    try {
      await deleteTeacherProductAPI({ pid: productId })
      router.push("/teacher/shop/my")
    } catch (err) {
      console.error(err)
    }
  }

  const imageElements = data?.images?.map((imageUrl: string, index: number) => (
    <img
      key={`product-image-${index}`}
      src={imageUrl}
      alt={`Product image ${index + 1}`}
      css={imageCSS}
    />
  )) || []

  const generateTime = () => {
    setTime(new Date().getTime())
  }

  return (
    <div css={wrapperCSS}>
      {data && (
        <Modal
          closeComp={closeComp}
          compState={compState}
          transition="scale"
          content={<ShowQR type="moenyvill_rental" id={data?.id} time={time} />}
        />
      )}
      <div css={headerCSS}>
        <div css={productCSS}>
          <div css={titleWrapperCSS}>
            <div>{data?.title}</div>
            <div css={buttonGroupCSS}>
              <Button
                text="상품 삭제"
                fontSize="var(--teacher-h5)"
                width="140px"
                theme="vividNegative"
                onClick={deleteTeacherProduct}
              />
              {data?.rental && (
                <Button
                  text="QR코드 생성"
                  fontSize="var(--teacher-h5)"
                  width="140px"
                  theme="vividPositive"
                  onClick={() => {
                    generateTime()
                    openComp()
                  }}
                />
              )}
            </div>
          </div>
          <hr />
        </div>
      </div>

      <div css={parentCSS}>
        {imageElements.length > 0 && (
          <Carousel content={imageElements} identifier="teacher" />
        )}
      </div>

      <div css={footerCSS}>
        {data && (
          <div css={adinfoWrapperCSS}>
            <div css={amountWrapperCSS}>
              <div css={decoCSS} />
              상품 정보
            </div>

            <div css={priceCSS}>
              {data?.amount?.toLocaleString('ko-KR')} {nation.currency}
            </div>
            <div css={detailsContainerCSS}>
              <div css={leftWrapperCSS}>{data?.count - data?.sold}개 남음 </div>
              <div css={leftWrapperCSS}>&nbsp; · {data.date}에 등록된 상품입니다.</div>
            </div>
          </div>
        )}
        <div css={lineCSS} />
        <div css={detailLabelWrapperCSS}>
          <div css={decoCSS} />
          상품 상세 설명
        </div>
        <div>{data?.detail}</div>
      </div>
    </div>
  )
}

const imageCSS = css`
  width: auto;
  height: 60vh;
  border-radius: 10px;
`

const buttonGroupCSS = css`
  display: flex;
  gap: 8px;
`

const detailsContainerCSS = css`
  display: flex;
`

const wrapperCSS = css`
  flex: 1;
  display: grid;
  grid-column: 100%;
  background-color: var(--common-back-color-2);
  border-radius: 10px;
  padding: 30px;
  grid-gap: 0;
`

const headerCSS = css`
  display: flex;
  margin-bottom: 10px;
`

const productCSS = css`
  width: 100%;
  height: 100%;

  > hr {
    border: 1px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
  }

  > div:nth-of-type(1) {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 5px;
  }

  > div:nth-of-type(2) {
    font-size: 1.1rem;
    color: rgba(0, 0, 0, 0.8);
    margin-bottom: 30px;
  }

  > div:nth-of-type(3) {
    display: flex;
    justify-content: space-between;
    align-items: center;

    > div:nth-of-type(1) {
      font-size: 1.5rem;
      font-weight: bold;
    }

    > div:nth-of-type(2) {
      font-size: 1.1rem;
    }
  }
`

const parentCSS = css`
  overflow: scroll;

  ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
    background-color: transparent;
  }
`

const footerCSS = css`
  overflow: hidden;
  width: 100%;
`

const adinfoWrapperCSS = css`
  width: 100%;
`

const amountWrapperCSS = css`
  font-size: 1.4rem;
  font-weight: 600;
  height: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 21px;
  margin-top: 36px;
`

const priceCSS = css`
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--teacher-highlight-color);
  margin-bottom: 8px;
`

const detailLabelWrapperCSS = css`
  height: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 21px;
`

const leftWrapperCSS = css`
  color: rgba(0, 0, 0, 0.6);
  font-size: var(--teacher-h5);
  font-weight: 500;
  margin-bottom: 4px;
`

const titleWrapperCSS = css`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

const decoCSS = css`
  height: 100%;
  width: 12px;
  border-radius: 2px;
  background-color: var(--teacher-highlight-color);
`

const lineCSS = css`
  width: 100%;
  height: 1px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  margin-top: 24px;
  margin-bottom: 24px;
`

export default Product