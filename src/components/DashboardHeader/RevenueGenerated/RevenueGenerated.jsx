import React from "react"
import { CreditCard } from "react-feather"
import { revenueGeneratedSeries, revenueGenerated } from "../StatisticsData"
import StatisticsCards from '../../common/@vuexy/statisticsCard/StatisticsCard';

const RevenueGenerated = () => {
  return ( 
    <>
      <StatisticsCards
        icon={<CreditCard className="success" size={22} />}
        iconBg="success"
        stat="97.5k"
        statTitle="Revenue Generated"
        options={revenueGenerated}
        series={revenueGeneratedSeries}
        type="area"
      />
    </>
  );
}
 
export {RevenueGenerated};