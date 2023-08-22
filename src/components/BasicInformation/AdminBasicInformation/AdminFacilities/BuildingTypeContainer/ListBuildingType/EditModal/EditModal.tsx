import React, { useContext, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Col, Modal, Row, ModalBody, ModalHeader } from "reactstrap";
import { refetchContext } from "../../../../../../../core/utils/context/EventContext";
import { SubmitButton, TextArea, TextInput } from "../../../../../../common/Form";
import { ToastTypes } from "../../../../../../../core/enums";
import { useEditFacilityBuildings } from "../../../../../../../core/services/api/parts-and-facilities.api";
import { AddBuildingTypeValidation } from "../../../../../../../core/validations/admin-building-type.validation";
import BasicSelectOption from "../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { useGetSelcetOptionOfEnum } from "../../../../../../../core/services/api";
import { FullOptionSel, OptionRow } from "../../../../../../../core/models";
import { showToast } from "../../../../../../../core/utils";


interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop: boolean;
  currentId: number;
  data: any;
}

const EditModal: React.FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  backdrop,
  currentId,
  data,
}) => {

  const editMutation = useEditFacilityBuildings()

  const [initialValue , setInitialValues] = useState<any>({
    name:"",
    code:"",
    order:"",
    roof:null,
    status:null,
    describe:""
  });

  const roofData = [
    {value : 1 , label : 'می باشد'},
    {value : 2 , label : 'نمی باشد'},
  ]

   const statusData = [
    {value : 1 , label : 'فعال'},
    {value : 2 , label : 'غیرفعال'},
  ]

  const [buildingTypeData, setBuildingTypeData] = useState<any>([]);
  
  const getEnumMutation = useGetSelcetOptionOfEnum();

  useEffect(() => {
    getEnumMutation.mutate("FacilityBuildingsTypeEnum", {
      onSuccess: (val) => {
        try {
          const result = val.data.result;
          let typeList: FullOptionSel[] = [
            { label: "انتخاب کنید...", options: [] },
          ];

          result.forEach((item: OptionRow) => {
            typeList[0].options.push({ value: +item.id, label: item.title });
          });

          setBuildingTypeData(typeList);
        } catch (error) {}
      },
    });
  }, []);

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

    useEffect(() => {
      if (currentId) {
        setInitialValues({
          name: data.name,
          code: data.code,
          describe: data.description,
          roof: { value: data.roofType, label: data.roofTypeTitle },
          status: { value: data.status, label: data.statusTitle },
          order: data.viewOrder,
          buildingType: {
            value: data.buildingType,
            label: data.buildingTypeTitle,
          },
        });
      }
    }, [currentId, isOpen]);
  
    const onSubmit = (values:any) => {
  
      const buildingTypeObj = {
        id : data.id,
        name: values.name,
        code: values.code,
        description: values.describe,
        viewOrder: values.order,
        roofType : values.roof.value,
        status : values.status.value,
        buildingType: values.buildingType.value
      };
  
      editMutation.mutate(buildingTypeObj, {
        onSuccess: (val: any) => {
          toggleModal();
          showToast(["با موفقیت انجام شد."], ToastTypes.success);
          const newEvent = { ...refetchEvent };
          newEvent.buildingTypeList = !newEvent.buildingTypeList;
          setRefetchEvent(newEvent);
        },
      });
      
    };

  return (
    <>
      <Modal
        isOpen={isOpen}
        toggle={toggleModal}
        className="modal-dialog-centered"
        backdrop={backdrop}
      >
        <ModalHeader toggle={toggleModal}>ویرایش</ModalHeader>
        <ModalBody>

        <Formik
        enableReinitialize={true}
        initialValues={initialValue}
        validationSchema={AddBuildingTypeValidation}
        onSubmit={onSubmit}
      >
        {({ values }) => {
          return (
            <Form>
              <>
                <Row>
                  <Col>
                    <TextInput
                      lableText="نام "
                      name="name"
                      placeholder="نام"
                      significant
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextInput
                      lableText="کد"
                      name="code"
                      placeholder="کد"
                      significant
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <BasicSelectOption
                      lableText="مسقف"
                      significant={true}
                      placeHolder="انتخاب کنید..."
                      name="roof"
                      data={roofData}
                      isLoading={false}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <BasicSelectOption
                      lableText="نوع تأسیسات"
                      significant={true}
                      placeHolder="انتخاب کنید..."
                      name="buildingType"
                      data={buildingTypeData}
                      isLoading={false}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <TextInput
                      lableText="ترتیب نمایش"
                      name="order"
                      placeholder="ترتیب نمایش"
                      significant
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <BasicSelectOption
                      lableText="وضعیت"
                      significant={true}
                      placeHolder="انتخاب کنید..."
                      name="status"
                      data={statusData}
                      isLoading={false}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextArea
                      lableText="توضیحات"
                      name="describe"
                      placeholder="توضیحات"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <SubmitButton
                      isLoading={editMutation.isLoading}
                      initialValue={initialValue}
                      schema={AddBuildingTypeValidation}
                      values={values}
                    />
                  </Col>
                </Row>
              </>
            </Form>
          );
        }}
      </Formik>

        </ModalBody>
        </Modal>
    </>
  );
};

export { EditModal };
