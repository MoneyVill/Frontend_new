import { css } from "@emotion/react"
import Image from "next/image"
import { useRouter } from "next/router"
import { useQuery } from "@tanstack/react-query"
import Carousel from "@/components/common/Carousel/Carousel"
import Button from "@/components/common/Button/Button"
import { getStudentProductDetailAPI } from "@/api/common/shop/getStudentProductDetailAPI"
import { getStudentProductDetailType } from "@/types/teacher/apiReturnTypes"
import { postAllowedStudentProposalAPI } from "@/api/teacher/shop/postAllowedStudentProposalAPI"
import { deleteDeniedStudentProposalAPI } from "@/api/teacher/shop/deleteDeniedStudentProposalAPI"

function Product() {
  const router = useRouter()
  const { pid } = router.query
  const productId = typeof pid === "string" ? pid : ""

  const { data } = useQuery<getStudentProductDetailType>(
    ["product", productId], 
    () => getStudentProductDetailAPI({ pid: productId }),
    {
      enabled: !!productId,
    }
  )

  const allowedProposal = async () => {
    try {
      await postAllowedStudentProposalAPI({ pid: productId })
      router.push("/teacher/shop/student")
    } catch (error) {
      console.error(error)
    }
  }

  const deniedProposal = async () => {
    try {
      await deleteDeniedStudentProposalAPI({ pid: productId })
      router.push("/teacher/shop/student")
    } catch (error) {
      console.error(error)
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

  return (
    <div css={wrapperCSS}>
      <div css={headerCSS}>
        <div css={productCSS}>
          <div>{data?.title}</div>
          <hr />
          {data && (
            <div>
              <div>{data?.amount}미소</div>
              <div>현재 상품이 {data?.count - data?.sold}개 남았습니다.</div>
            </div>
          )}
        </div>
        <div css={QRcss}>
          <Image 
            src={"https://placehold.it/150x150"} 
            alt={"QR"} 
            width={150} 
            height={150} 
          />
        </div>
      </div>

      <div css={parentCSS}>
        {imageElements.length > 0 && (
          <Carousel content={imageElements} identifier="student" />
        )}
      </div>

      <div css={footerCSS}>
        <div>
          <div>상품 상세 설명</div>
          <div>{data?.detail}</div>
        </div>
        <div>
          <Button
            text="상품 승인하기"
            fontSize="var(--teacher-h5)"
            width="190px"
            height="30px"
            theme="positive"
            onClick={allowedProposal}
          />
          <Button
            text="상품 반려하기"
            fontSize="var(--teacher-h5)"
            width="190px"
            height="30px"
            theme="warning"
            onClick={deniedProposal}
          />
        </div>
      </div>
    </div>
  )
}

const imageCSS = css`
  width: auto;
  height: 40vh;
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
    border: 1.5px solid rgba(0, 0, 0, 0.5);
    margin-bottom: 5px;
  }

  > div:nth-of-type(1) {
    font-size: 3rem;
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

const QRcss = css`
  margin-left: 20px;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;

  > div:nth-of-type(1) {
    width: 70%;
    
    > div:nth-of-type(1) {
      font-size: 1.6rem;
    }
    > div:nth-of-type(2) {
      font-size: 0.95rem;
      word-wrap: break-word;
    }
  }

  > div:nth-of-type(2) {
    display: flex;
    width: 30%;
  }
`

export default Product