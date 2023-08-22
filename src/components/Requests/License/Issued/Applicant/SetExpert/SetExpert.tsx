import { Formik, Form } from "formik";
import React, { FC, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import {
  Card,
  CardBody,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from "reactstrap";
import { ToastTypes } from "../../../../../../core/enums";
import { FullOption } from "../../../../../../core/models";
import {
  useGetActiveLiceseRequestExpert,
  useSendLicenseRequestToExpert,
} from "../../../../../../core/services/api";
import { showToast } from "../../../../../../core/utils";
import { FormDivider, SubmitButton } from "../../../../../common/Form";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import * as Yup from "yup";

import Styles from "./SetExpert.module.scss";
import { getAccessToken } from "../../../../../../core/services/authentication/authentication.service";
import { User } from "react-feather";
import { ShowImage } from "../../../../../common/DownloadRow/ShowImage/ShowImage";

interface IPropTypes {
  licenseDetail: any;
  dataGiven: boolean;
}
const SetExpert: FC<IPropTypes> = ({ licenseDetail, dataGiven }) => {
  const validate = Yup.object().shape({
    expert: Yup.object()
      .shape({
        value: Yup.string(),
        label: Yup.string().nullable(),
      })
      .required("این فیلد باید پر شود!")
      .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  });

  const [initialValue, setInitialValue] = useState<{ expert: any }>({
    expert: null,
  });
  const [expertDetails, setExpertDetails] = useState<any>(false);
  const [expertPicture, setExpertPicture] = useState<any>(null);
  const [expertSelectOption, setExpertSelectOption] = useState<FullOption[]>(
    []
  );
  const [isShow, setIsShow] = useState(false);

  const { req_id, status }: any = useParams();
  const history = useHistory();

  const getExperts = useGetActiveLiceseRequestExpert(req_id);
  const sendExpert = useSendLicenseRequestToExpert();


  const setProfilePicture = async (data: any) => {
    const MainUrl = process.env.REACT_APP_PUBLIC_PATH;
    const token = getAccessToken();

    const result = await fetch(
      MainUrl +
        "​/api/Upload/ServeProfilePicture?fileName=" +
        data.profilePicture,
      {
        headers: {
          Authorization: token ? "Bearer " + token : "",
        },
      }
    );
    if (result.status === 200 || result.ok) {
      const arrayBuffer = await result.arrayBuffer();
      const blob = new Blob([arrayBuffer]);

      const url = URL.createObjectURL(blob);
      setExpertPicture(url);
    } else {
      setExpertPicture(null);
    }
  }

  useEffect(() => {
    if (getExperts.isSuccess) {
      const result = getExperts.data.data.result;

      const experts: FullOption[] = [
        {
          label: "یک کارشناس انتخاب کنید",
          options: [],
        },
      ];

      result.experts.forEach((exp: any) => {
        experts[0].options.push({
          ...exp,
          value: exp.id,
          label: exp.name + " " + exp.lastName,
        });
      });
      if (
        licenseDetail &&
        licenseDetail.expertId &&
        licenseDetail.expertId > 0
      ) {
        let selectedExpert = result.experts.find(
          (row: any) => row.id === licenseDetail.expertId
        );

        if (selectedExpert) {
          setProfilePicture(selectedExpert);
          setExpertDetails(selectedExpert);
          setInitialValue({
            expert: {
              ...selectedExpert,
              value: selectedExpert.id,
              label: selectedExpert.name + " " + selectedExpert.lastName,
            },
          });
        }
      }
      setExpertSelectOption(experts);
    }
  }, [getExperts.isSuccess]);

  useEffect(() => {
    if (dataGiven) {
      getExperts.refetch();
    }
  }, [dataGiven]);

  const onExpertChange = async (
    opt: any,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void
  ) => {
    setFieldValue("expert", { value: opt.value, label: opt.label });
    if(opt){
      setExpertDetails(opt);

      if (opt.profilePicture) {
        await setProfilePicture(opt);
      } else {
        setExpertPicture(null);
      }
    }else{
      setExpertDetails(null);
    }
  };

  const onSubmit = (value: any) => {
    console.log(value);
    const expertObj = {
      expertId: value.expert ? value.expert.value : 0,
      licenseRequestId: +req_id,
    };

    sendExpert.mutate(expertObj, {
      onSuccess: () => {
        showToast(["با موفقیت انجام شد"], ToastTypes.success);
        history.push("/License/List");
      },
    });
  };

  return (
    <>
      <Card>
        <CardBody>
          <Formik
            initialValues={initialValue}
            onSubmit={onSubmit}
            validationSchema={validate}
            enableReinitialize={true}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <FormDivider textHeader="انتخاب کارشناس">
                  {expertPicture && (
                    <ShowImage
                      isOpen={isShow}
                      modalSize="md"
                      toggle={() => setIsShow(false)}
                      image={expertPicture}
                    />
                  )}
                  <Col sm="6">
                    <BasicSelectOption
                      data={expertSelectOption}
                      name="expert"
                      hasLabel
                      isDisabled={
                        licenseDetail &&
                        licenseDetail.expertId &&
                        licenseDetail.expertId > 0
                      }
                      lableText="انتخاب کارشناس"
                      placeHolder="کارشناس مورد نظر را انتخاب کنید"
                      significant
                      isLoading={getExperts.isLoading}
                      onChange={(opt) => onExpertChange(opt, setFieldValue)}
                    />
                  </Col>
                </FormDivider>
                <hr />
                {expertDetails && (
                  <Card>
                    <FormDivider textHeader="مشخصات کارشناس">
                      <Row style={{ margin: "25px 0px" }}>
                        <Col className="d-flex justify-content-center" md="3">
                          {expertPicture ? (
                            <img
                              src={expertPicture}
                              className="round"
                              height="200"
                              width="200"
                              alt="avatar"
                              style={{
                                border: "1px solid #ccc",
                                boxShadow: "0px 0px 1px 1px #ccc",
                                cursor: "pointer",
                              }}
                              onClick={() => setIsShow(true)}
                            />
                          ) : (
                            <User
                              width="200"
                              height="200"
                              className="round"
                              style={{
                                border: "1px solid #ccc",
                                boxShadow: "0px 0px 1px 1px #ccc",
                              }}
                            />
                          )}
                        </Col>
                        <Col md="9">
                          <CardBody>
                            <ListGroup tag="div">
                              <ListGroup className="list-group-horizontal-sm">
                                <ListGroupItem
                                  className={Styles["item-flex"]}
                                  tag="a"
                                >
                                  نام کارشناس : {expertDetails.name}
                                </ListGroupItem>
                                <ListGroupItem
                                  className={Styles["item-flex"]}
                                  tag="a"
                                >
                                  نام خانوادگی : {expertDetails.lastName}
                                </ListGroupItem>
                              </ListGroup>

                              <ListGroup className="list-group-horizontal-sm">
                                <ListGroupItem
                                  className={Styles["item-flex"]}
                                  tag="a"
                                >
                                  تحصیلات کارشناس :{" "}
                                  {expertDetails.educationLevelTitle}
                                </ListGroupItem>
                                <ListGroupItem
                                  className={Styles["item-flex"]}
                                  tag="a"
                                >
                                  رشته کارشناس :{" "}
                                  {expertDetails.educationFiledEnumTitle}
                                </ListGroupItem>
                              </ListGroup>
                              <ListGroup className="list-group-horizontal-sm">
                                <ListGroupItem
                                  className={Styles["item-flex"]}
                                  tag="a"
                                >
                                  تلفن کارشناس : {expertDetails.cellphone}
                                </ListGroupItem>
                              </ListGroup>
                            </ListGroup>
                          </CardBody>{" "}
                        </Col>
                      </Row>

                      {/* </Card> */}
                    </FormDivider>
                  </Card>
                )}
                {(status == 2 || status == 4) && (
                  <SubmitButton
                    isLoading={sendExpert.isLoading}
                    btnText="ارسال به کارشناس"
                    values={values}
                    schema={validate}
                  />
                )}
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </>
  );
};

export { SetExpert };
