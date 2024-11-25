import { css } from "@emotion/react";
import PageHeader from "@/components/student/layout/PageHeader/PageHeader";
import CollapseMenu from "@/components/teacher/common/CollapseMenu/CollapseMenu";
import ListNumbering from "@/components/student/Gov/ListNumbering";
import GovRuleGrade from "@/components/student/Gov/Rule/GovRuleGrade";
import TabMenu from "@/components/student/layout/TabMenu/TabMenu";
import { GovTabMenus } from "@/components/student/Gov/GovTabMenus";
import { getClassRuleAPI } from "@/api/student/gov/getClassRuleAPI";
import { useEffect, useState } from "react";
import { getClassRuleType } from "@/types/student/apiReturnTypes";

function index() {
  const [ruleList, setRuleList] = useState<getClassRuleType[]>([]);
  const [feedback, setFeedback] = useState<{ [key: number]: string }>({});
  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);

  useEffect(() => {
    getClassRuleAPI().then((res) => {
      setRuleList(res);
    });
  }, []);

  const handleButtonClick = (index: number, userAnswer: boolean) => {
    const isCorrect = ruleList[index].answer === userAnswer;
    setFeedback((prev) => ({
      ...prev,
      [index]: isCorrect ? "정답입니다!" : "틀렸습니다!",
    }));
    setVisibleIndexes((prev) => [...prev, index]); // Add the index to the visible indexes list
  };

  return (
    <div css={mainWrapperCSS}>
      <PageHeader title={"정글"} addComp={<TabMenu menus={GovTabMenus()} selected={0} />} />
      <div css={wrapperCSS}>
        <div css={contentCSS}>
          <CollapseMenu
            title={<span>신용 등급</span>}
            fontSize={`var(--student-h2)`}
            bracketSize={"10px"}
            children={<GovRuleGrade />}
            marginBottom={"20px"}
          />
          {ruleList.map((rule, idx) => (
            <CollapseMenu
			key={rule.id}
			title={
			  <div css={titleRowCSS}>
				<ListNumbering number={idx + 1} text={rule.title} />
				<div css={buttonGroupCSS}>
				  <button css={oButtonCSS} onClick={() => handleButtonClick(idx,true)}>O</button>
				  <button css={xButtonCSS} onClick={() => handleButtonClick(idx,false)}>X</button>
				</div>
			  </div>
			}
			fontSize={`var(--student-h3)`}
			bracketSize={"10px"}
			children={
                visibleIndexes.includes(idx) && (
                  <div>
                    <span css={feedbackCSS}>{feedback[idx]}</span> {rule.detail}
                  </div>
                )
              }
			marginBottom={"10px"}
		  />
          ))}
        </div>
      </div>
    </div>
  );
}

const mainWrapperCSS = css`
  padding-bottom: 6px;
`;

const wrapperCSS = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const contentCSS = css`
  width: 95%;
`;

const titleRowCSS = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const buttonGroupCSS = css`
  display: flex;
  gap: 10px;
`;

const oButtonCSS = css`
  background-color: blue;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px; /* Increased padding for width */
  cursor: pointer;
  font-size: 16px; /* Increased font size */
  min-width: 60px; /* Ensures a consistent minimum width */
  text-align: center;

  &:hover {
    opacity: 0.8;
  }
`;

const xButtonCSS = css`
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px; /* Increased padding for width */
  cursor: pointer;
  font-size: 16px; /* Increased font size */
  min-width: 60px; /* Ensures a consistent minimum width */
  text-align: center;

  &:hover {
    opacity: 0.8;
  }
`;

const feedbackCSS = css`
  font-weight: bold;
  color: #333;
  margin-right: 10px;
`;

export default index;
