import React, { useState } from 'react'
import { Col, Row } from 'reactstrap';
import { FullOptionSel, OptionRow, OptionRowSel } from '../../../../../../../core/models';
import { useGetAllJobProductByProductCategoryId, useGetAllProductCategory } from '../../../../../../../core/services/api/job.api';
import { MultiSelectOption, TextInput } from '../../../../../../common/Form';
import BasicSelectOption from '../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption';


interface IPropTypes {
  index: number
  getProductCategory: any
  setFieldValue: any
  values: any
}

const NewProduct: React.FC<IPropTypes> = ({
  index,
  getProductCategory,
  setFieldValue,
  values
}) => {

  const [product, setProduct] = useState<FullOptionSel[]>([]);
  const getProductByProductCategory = useGetAllJobProductByProductCategoryId();
  
  const onProductCategoryChange = async (
    e: OptionRowSel,
    setFieldValue: any,
    productIds: OptionRowSel[] | null
  ) => {
    setFieldValue(`products.${index}.productCategory`, e);
    //setFieldValue("productIds", null);
    setProduct([]);
    let localProduct: FullOptionSel[] = [];
    
      const result = await getProductByProductCategory.mutateAsync(e.value);

      const data = result.data.result;
      try {
        let productList: FullOptionSel[] = [
          {
            label: `${e.label}`,
            options: [],
          },
        ];

        data.forEach((item: OptionRow) => {
          productList[0].options.push({
            value: +item.id,
            label: item.title,
          });
        });

        // eslint-disable-next-line no-loop-func
        setProduct((old) => {
          let editOld = [...old];
          editOld = editOld.filter(
            (row) => !row.label.includes(e.label)
          );
          localProduct = [...editOld, ...productList];
          return [...editOld, ...productList];
        });
      } catch (error) {}
    
    if (productIds) {
      const product = productIds.filter((pro) => {
        let isEsist = false;
        localProduct.map((ed) =>
          ed.options.forEach((row) => {
            if (row.value === pro.value) isEsist = true;
          })
        );
        return isEsist;
      });
      setFieldValue(`products.${index}.productIds`, product);
    }
  };
  
  return (
    <Row>
      <Col md="4">
        <BasicSelectOption
          lableText="دسته بندی محصول"
          significant={true}
          placeHolder="انتخاب کنید..."
          name={`products.${index}.productCategory`}
          data={
            getProductCategory.data?.data.result
              ? getProductCategory.data?.data.result.map((item: OptionRow) => ({
                  value: item.id,
                  label: item.title,
                }))
              : []
          }
          isLoading={getProductCategory.isFetching}
          onChange={(opt) =>
            onProductCategoryChange(
              opt,
              setFieldValue,
              values.productIds ? values.productIds : []
            )
          }
        />
      </Col>
      <Col md="4">
        <BasicSelectOption
          lableText="نام محصولات"
          significant={true}
          placeHolder="انتخاب کنید..."
          name={`products.${index}.productIds`}
          data={product}
          isLoading={getProductByProductCategory.isLoading}
        />
      </Col>
      <Col md="4">
        <TextInput
          lableText="حداکثر ظرفیت تولید محصول در یک واحد از عامل تولید"
          name={`products.${index}.maxProduction`}
          placeholder="حداکثر ظرفیت ..."
          significant
        />
      </Col>
    </Row>
  );
};

export { NewProduct };
