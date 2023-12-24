/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Button, CheckIcon, Collapse, Container, Grid, Input, Radio, Select } from '@mantine/core';
import { IconFilter, IconRefresh, IconSearch } from '@tabler/icons-react';
import { DateInput } from '@mantine/dates';
import tags from '../TeacherDashBoard/course-create/Introducing-Course/TagsInput';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { APIGetAllChildParentNodes, APIGetCategories } from '../../api/categories';
import PriceFilter from './PriceFilter';
import { Accordion, Paper } from '@mantine/core';
import { RadioGroup } from '@mantine/core/lib/Radio/RadioGroup/RadioGroup';
import CategoryList from './CategoryList';

const SideNavbar = (props: any) => {
  const { form } = props;
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const loadCategories = async () => {
    const res = await APIGetCategories();
    console.log(res, 'res');
    setCategories(
      res?.data?.map((cat: any) => ({
        value: cat._id,
        label: cat.categoryTitle,
      })),
    );
  };

  useEffect(() => {
    loadCategories();
    getCategoryList();
  }, []);
  const getCategoryList = async () => {
    try {
      const response = await APIGetAllChildParentNodes();
      const responseData = response.data; // Extract the data from Axios response
      setCategory(responseData); // Set the data in the state
      console.log(responseData, '@responseData');
    } catch (error) {
      // Handle errors here
      console.error(error);
    }
  };
  const resetForm = async () => {
    form.reset();
    // form.setFieldValue('priceFrom',null);
    // form.setFieldValue('priceTo',null);
    await Promise.all([props.loadCourse()]);
  };

  return (
    <>
      <div
        className=" flex-search sidenavbar sticky top-none"
        style={{ height: 'calc(100vh - 80px)', top: '100px' }}
      >
        <div className="w-full flex p-sm bg-white rounded-lg">
          <form
            className={'w-full pr-xs'}
            onSubmit={form.onSubmit((val: any) => props.loadCourse())}
          >
            <div className="font-semibold text-lg rounded-lg">Category</div>
            {/* <Input
              mb={'sm'}
              style={{ minWidth: '150px' }}
              placeholder={'Enter keyword'}
              {...form.getInputProps('keyword')}
              variant={'filled'}
            /> */}
            {/*<Input*/}
            {/*  mb={'sm'}*/}
            {/*  style={{ minWidth: '150px' }}*/}
            {/*  placeholder={'Enter price start range'}*/}
            {/*  {...form.getInputProps('priceFrom')}*/}
            {/*  variant={'filled'}*/}
            {/*  type={'number'}*/}
            {/*/>*/}
            {/*<Input*/}
            {/*  mb={'sm'}*/}
            {/*  style={{ minWidth: '150px' }}*/}
            {/*  placeholder={'Enter price end range'}*/}
            {/*  {...form.getInputProps('priceTo')}*/}
            {/*  variant={'filled'}*/}
            {/*  type={'number'}*/}
            {/*/>*/}
            {/* <Accordion maw={400} mx="auto">
              <Accordion.Item value="item-1">
                <Accordion.Control>Control 1</Accordion.Control>
                <Accordion.Panel>
                  <Accordion maw={400} mx="auto">
                    <Accordion.Item value="item-1">
                      <Accordion.Control>Control 1</Accordion.Control>
                      <Accordion.Panel>
                        <Accordion maw={400} mx="auto">
                          <Accordion.Item value="item-1">
                            <Accordion.Control>Control 1</Accordion.Control>
                          </Accordion.Item>
                        </Accordion>
                      </Accordion.Panel>
                    </Accordion.Item>
                  </Accordion>
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="item-2">
                <Accordion.Control>Control 2</Accordion.Control>
                <Accordion.Panel>Panel 2</Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="item-3">
                <Accordion.Control>Control 3</Accordion.Control>
                <Accordion.Panel>Panel 3</Accordion.Panel>
              </Accordion.Item>
            </Accordion> */}
            <CategoryList category={category} form={form} />
            {/* <Select
              mb={'sm'}
              {...form.getInputProps('category')}
              variant={'filled'}
              placeholder="Select category"
              defaultValue={'TND'}
              data={[{ value: 'All', label: 'all' }, ...categories]}
            />
            <DateInput
              mb={'sm'}
              {...form.getInputProps('createdStart')}
              placeholder="Enter created from date"
              className={'w-full'}
              variant={'filled'}
            />
            <DateInput
              mb={'sm'}
              {...form.getInputProps('createdEnd')}
              placeholder="Enter created until date"
              className={'w-full'}
              variant={'filled'}
            />

            <div className={'flex flex-nowrap justify-between'}>
              <Button type={'submit'} variant={'filled'} className={'flex-grow mr-xs'}>
                <IconFilter /> Filter
              </Button>
              <Button
                onClick={resetForm}
                variant={'filled'}
                color={'secondary'}
                className={'mr-xs'}
              >
                <IconRefresh />
              </Button>
            </div> */}
            {/* <div className={'flex flex-nowrap justify-between'}>
              <Button type={'submit'} variant={'filled'} className={'flex-grow mr-xs'}>
                <Filter /> Filter
              </Button>
              <Button
                onClick={resetForm}
                variant={'filled'}
                color={'secondary'}
                className={'mr-xs'}
              >
                <Refresh />
              </Button>
            </div> */}
          </form>
        </div>
        <div></div>
        <div className="w-full p-sm mt-sm bg-white rounded-lg">
          <div>
            {' '}
            <p className="text-lg font-medium mb-sm mt-sm">Price</p>
          </div>

          <Radio.Group {...form.getInputProps('priceRange')} withAsterisk>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Radio icon={CheckIcon} value="1000-2000" label="1000-2000" className="mt-xs " />
              <Radio
                icon={CheckIcon}
                value="1000-3000"
                label="2000-3000"
                className="mt-sm font-normal"
              />
              <Radio
                icon={CheckIcon}
                value="3000-4000"
                label="3000-4000"
                className="mt-sm font-normal"
              />
              <Radio
                icon={CheckIcon}
                value="4000-5000"
                label="4000-5000"
                className="mt-sm font-normal"
              />
              <Radio
                icon={CheckIcon}
                value="5000-6000"
                label="5000-6000"
                className="mt-sm font-normal"
              />
              <Radio
                icon={CheckIcon}
                value="6000-7000"
                label="6000-7000"
                className="mt-sm font-normal"
              />
            </div>
          </Radio.Group>
        </div>
      </div>
    </>
  );
};

export default SideNavbar;
