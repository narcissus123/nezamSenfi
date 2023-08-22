import React,{ useState} from 'react';
import {
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import Styled from './ContractDetails.module.scss'


interface IPropTypes {
  data: any;
}
 
const ContractDetails: React.FC<IPropTypes> = ({ data}) => {

  const [isLoading,setIsLoading] = useState<any>(false) 
  console.log('daaataa----' , data);

  return (
    <>
      <ListGroupItem tag="a" active>
        جزئیات
      </ListGroupItem>

      <ListGroup className="list-group-horizontal-sm">
        <ListGroupItem tag="a" className={Styled["item-flex"]}>
          نوع تضمین: {data.guaranteeTypeTitle}
        </ListGroupItem>
        <ListGroupItem tag="a" className={Styled["item-flex"]}>
          تاریخ: {data.date}
        </ListGroupItem>
      </ListGroup>
      <ListGroup className="list-group-horizontal-sm">
        <ListGroupItem tag="a" className={Styled["item-flex"]}>
          شماره: {data.number}
        </ListGroupItem>
        <ListGroupItem tag="a" className={Styled["item-flex"]}>
          شماره موبایل ضامن: {data.phoneNumber}
        </ListGroupItem>
      </ListGroup>
      <ListGroup className="list-group-horizontal-sm">
        <ListGroupItem tag="a" className={Styled["item-flex"]}>
          مبلغ: {data.price}
        </ListGroupItem>
        <ListGroupItem tag="a" className={Styled["item-flex"]}>
          نام و نام خانوادگی ضامن: {data.sponsorName}
        </ListGroupItem>
      </ListGroup>
      <ListGroup className="list-group-horizontal-sm">
        <ListGroupItem tag="a" className={Styled["item-flex"]}>
          کد ملی ضامن: {data.nationalCode}
        </ListGroupItem>

        <ListGroupItem tag="a" className={Styled["item-flex"]}>
          جنسیت ضامن: {data.genderTitle}
        </ListGroupItem>
      </ListGroup>
      <ListGroup className="list-group-horizontal-sm">
        <ListGroupItem tag="a" className={Styled["item-flex"]}>
          شماره تلفن ثابت ضامن: {data.telephone}
        </ListGroupItem>

        <ListGroupItem tag="a" className={Styled["item-flex"]}>
          آدرس ضامن: {data.address}
        </ListGroupItem>
      </ListGroup>
      <ListGroup className="list-group-horizontal-sm">
        <ListGroupItem tag="a" className={Styled["item-flex"]}>
         کد پستی ضامن: {data.postalCode}
        </ListGroupItem>

        <ListGroupItem tag="a" className={Styled["item-flex"]}>
          آدرس محل کار ضامن: {data.workAddress}
        </ListGroupItem>
      </ListGroup>
    </>
  )
}
 
export { ContractDetails };