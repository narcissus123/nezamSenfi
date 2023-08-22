import React from "react"
import { CreditCard } from "react-feather"
import { quaterlySales, quaterlySalesSeries } from "../StatisticsData"
import StatisticsCards from '../../common/@vuexy/statisticsCard/StatisticsCard';

const QuaterlySales = () => {
  return (  
    <>
      <StatisticsCards
        icon={<CreditCard className="danger" size={22} />}
        iconBg="danger"
        stat="36%"
        statTitle="Quarterly Sales"
        options={quaterlySales}
        series={quaterlySalesSeries}
        type="area"
      />
    </>
  );
}
 
export {QuaterlySales};