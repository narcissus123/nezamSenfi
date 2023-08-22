import React, { FC, useContext, useEffect, useState } from "react";
import { Bell, PlusSquare } from "react-feather";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Media,
  Spinner,
  UncontrolledDropdown,
} from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link } from "react-router-dom";
import { useGetMyUnreadTicket } from "../../../core/services/api";
import { ITicketList } from "../../../core/models";
import { stringShorter } from "../../../core/utils";
import { refetchContext } from "../../../core/utils/context/EventContext";

const NavTicketContainer: FC = () => {
  const [unreadTickets, setUnreadTickets] = useState<Array<ITicketList>>([]);
  const [ticketCount, setTicketCount] = useState<number>(0);
  const { data, isFetching, isSuccess, refetch } = useGetMyUnreadTicket();

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  useEffect(() => {
    refetch();
  }, [refetchEvent.unreadTickets]);

  useEffect(() => {
    if (data) {
      try {
        let newState: any = [];

        data.data.result.tickets.forEach((row: any) => {
          newState.push({
            id: row.id,
            createAt: row.createAt,
            isRead: row.isRead,
            text: row.text,
          });
        });
        setUnreadTickets(newState);
        setTicketCount(data.data.result.totalCount);
      } catch (error) {}
    }
  }, [isSuccess, data]);

  const renderTickets = unreadTickets.map((row, inex) => {
    if (inex < 6)
      return (
        <Link to={`/Tickets/MyTickets/${row.id}`}>
          <div className="d-flex justify-content-between">
            <Media className="d-flex align-items-start">
              <Media left href="#">
                <PlusSquare className="font-medium-5 primary" size={21} />
              </Media>
              <Media body>
                <p className="notification-text">
                  {stringShorter(row.text, 40)}
                </p>
              </Media>
              <small>
                <time className="media-meta">{row.createAt}</time>
              </small>
            </Media>
          </div>
        </Link>
      );
  });

  return (
    <UncontrolledDropdown tag="li" className="dropdown-notification nav-item">
      <DropdownToggle tag="a" className="nav-link nav-link-label">
        <Bell size={21} />

        {isFetching ? (
          <>
            <Spinner
              style={{ position: "absolute", left: "-3px", top: "13.5px" }}
              size="sm"
              type="grow"
              color="warning"
            />
          </>
        ) : (
          <Badge pill color="warning" className="badge-up">
            {ticketCount}
          </Badge>
        )}
      </DropdownToggle>
      <DropdownMenu tag="ul" right className="dropdown-menu-media">
        <li className="dropdown-menu-header">
          <div className="dropdown-header mt-0">
            <h3 style={{ paddingBottom: "10px" }} className="text-white">
              {ticketCount} پیام جدید
            </h3>
            <span className="notification-title">پیام های خوانده نشده</span>
          </div>
        </li>
        <PerfectScrollbar
          className="media-list overflow-hidden position-relative"
          options={{
            wheelPropagation: false,
          }}
        >
          {isFetching ? (
            <div
              className="d-flex justify-content-center align-content-center"
              style={{ height: "70px", paddingTop: "24px" }}
            >
              <Spinner color="success" />
            </div>
          ) : (
            renderTickets
          )}
        </PerfectScrollbar>
        <Link to={"/Tickets/MyTickets"}>
          <li className="dropdown-menu-footer">
            <DropdownItem tag="a" className="p-1 text-center">
              <span className="align-middle"> نمایش همه پیام ها</span>
            </DropdownItem>
          </li>
        </Link>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export { NavTicketContainer };
