import { Accordion, Box, Checkbox, Grid, Text } from '@mantine/core';
import { useState } from 'react';

interface Category {
  _id: string;
  title: string;
  childNodes: Category[];
}

interface CategoryListProps {
  category: Category[];
  form: any; // You can replace 'any' with the appropriate type for your form
}

const CategoryList: React.FC<CategoryListProps> = (props) => {
  const { category, form } = props;

  // Initialize the initialCategoryState dictionary
  const initialCategoryState: { [key: string]: boolean } = {};

  // Function to check if all child nodes are checked
  const areAllChildrenChecked = (children: Category[]) => {
    return children.every((child) => form.values.category.includes(child._id));
  };

  // Function to handle checkbox click for parent category
  const handleParentCategoryClick = (parentId: string, children: Category[]) => {
    const allChildIds = children.map((child) => child._id);

    if (areAllChildrenChecked(children)) {
      // Uncheck all child nodes
      form.setFieldValue(
        'category',
        form.values.category.filter((id: string) => !allChildIds.includes(id)),
      );
    } else {
      // Check all child nodes
      form.setFieldValue('category', [...form.values.category, ...allChildIds]);
    }
  };

  // Function to handle checkbox click for child category
  const handleChildCategoryClick = (categoryId: string) => {
    const categoryIsChecked = form.values.category.includes(categoryId);

    // If the category is unchecked for the first time, uncheck its parent
    if (!categoryIsChecked && initialCategoryState[categoryId] !== false) {
      const parentCategory = category.find((cat) =>
        cat.childNodes.some((child) => child._id === categoryId),
      );

      if (parentCategory) {
        form.setFieldValue(
          'category',
          form.values.category.filter((id: string) => id !== parentCategory._id),
        );
        // Update the initial state of the parent category
        initialCategoryState[parentCategory._id] = false;
      }
    } else {
      // If the category is checked or unchecked after the first time, update the initial state
      initialCategoryState[categoryId] = categoryIsChecked;
    }

    // Update the state of the child category
    if (categoryIsChecked) {
      // Uncheck the child category
      form.setFieldValue(
        'category',
        form.values.category.filter((id: string) => id !== categoryId),
      );
    } else {
      // Check the child category
      form.setFieldValue('category', [...form.values.category, categoryId]);
    }
  };

  const getAccordion = (category: Category[], type = 'contained') => {
    return (
      category?.length > 0 && (
        <Accordion
          className="border-none"
          styles={{
            control: {
              '&:hover': {
                backgroundColor: '#ffffff', // Change to the desired hover color
              },
            },
            label: {
              paddingBottom: 0,
              paddingTop: '0.8rem',
            },
            chevron: {
              paddingTop: '0.8rem',
            },
          }}
        >
          {category?.map((v, index) =>
            v?.childNodes?.length > 0 ? (
              <Accordion.Item key={index} value={v?._id?.toString()} className="border-none">
                <Box className="flex ">
                  <Box className=" mt-xxs">
                    <Checkbox
                      mt={'sm'}
                      mr={'xs'}
                      radius={'lg'}
                      checked={areAllChildrenChecked(v?.childNodes)}
                      onClick={() => handleParentCategoryClick(v?._id, v?.childNodes)}
                    />
                  </Box>

                  <Box className="grow">
                    <Accordion.Control className="p-none accord-label">
                      <Grid className="">
                        <Grid.Col lg={9}>
                          <Text className=" my-xs">{v?.title}</Text>
                        </Grid.Col>
                      </Grid>
                    </Accordion.Control>
                  </Box>
                </Box>
                <Accordion.Panel>
                  <Accordion>{getAccordion(v?.childNodes)}</Accordion>
                </Accordion.Panel>
              </Accordion.Item>
            ) : (
              <Box className={'flex items-center '}>
                <Checkbox
                  radius={'lg'}
                  className="mr-xs"
                  checked={form.values.category.includes(v?._id)}
                  onClick={() => handleChildCategoryClick(v?._id)}
                />
                <div className="flex-grow my-xs">
                  <Text className=" ">{v?.title}</Text>
                </div>
              </Box>
            ),
          )}
        </Accordion>
      )
    );
  };

  // Initialize the initialCategoryState dictionary
  category.forEach((cat) => {
    initialCategoryState[cat._id] = form.values.category.includes(cat._id);
  });

  return <div>{getAccordion(category, 'filled')}</div>;
};

export default CategoryList;
