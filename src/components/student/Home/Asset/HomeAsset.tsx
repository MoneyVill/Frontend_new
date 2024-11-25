// HomeAsset.js
import useGetNation from "@/hooks/useGetNation";
import React from "react";
import HomeAssetItem from "./HomeAssetItem";

const WALLET_ICON = '/assets/icons/wallet.png';
const DEPOSIT_ICON = '/assets/icons/deposit.png';
const STOCK_ICON = '/assets/icons/stock.png';

type HomeAssetProps = {
  account?: number;
  deposit?: number;
  invest?: number;
};

function HomeAsset({ account = 0, deposit = 0, invest = 0 }: HomeAssetProps) {
  const [nation] = useGetNation();

  const list = [
    {
      icon: WALLET_ICON,
      title: "일반 계좌",
      money: account || 0,
      moneyUnit: ` ${nation?.currency}`,
      detailUrl: "/student/home/asset",
    },
    {
      icon: DEPOSIT_ICON,
      title: "정기 예금",
      money: deposit || 0,
      moneyUnit: ` ${nation?.currency}`,
      detailUrl: "/student/finance/deposit",
    },
    {
      icon: STOCK_ICON,
      title: "투자",
      money: invest || 0,
      moneyUnit: ` ${nation?.currency}`,
      detailUrl: "/student/finance/invest",
    },
  ];

  const renderAssets = list.map((el) => (
    <HomeAssetItem key={`assets-${el.title}`} {...el} />
  ));

  return <div>{renderAssets}</div>;
}

export default HomeAsset;
