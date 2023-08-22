import React from "react"
import { Package } from "react-feather"
import { ordersReceived, ordersReceivedSeries } from "../StatisticsData"
import StatisticsCards from '../../common/@vuexy/statisticsCard/StatisticsCard';

const OrdersReceived = () => {
  return ( 
    <>
      <StatisticsCards
        icon={<Package className="warning" size={22} />}
        iconBg="warning"
        stat="97.5K"
        statTitle="Orders Received"
        options={ordersReceived}
        series={ordersReceivedSeries}
        type="area"
      />
    </>
  );
}
 
export {OrdersReceived};