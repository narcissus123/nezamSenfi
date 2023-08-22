import React from "react"
import { Users } from "react-feather"
import { subscribersGained, subscribersGainedSeries } from "../StatisticsData"
import StatisticsCards from '../../common/@vuexy/statisticsCard/StatisticsCard';

const SubscribersGained = () => {
  return ( 
    <>
      <StatisticsCards
        icon={<Users className="primary" size={22} />}
        stat="92.6k"
        statTitle="Subscribers Gained"
        options={subscribersGained}
        series={subscribersGainedSeries}
        type="area"
      />
    </>
  );
}
 
export {SubscribersGained};