import React, { useState } from 'react';
import { ActionIcon, Button, Text, TextInput } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

interface AddItemInputFieldProps {
  form: any;
  title: string;
  courseModel: string;
  placeholder: string;
  errorMessage: string;
}

const AddItemInputField = (props: AddItemInputFieldProps) => {
  const {
    form: { values, getInputProps, setFieldValue, removeListItem },
  } = props;
  const { title, courseModel, placeholder } = props;
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (newItem.trim() !== '') {
      setFieldValue(courseModel, [...values[courseModel], newItem]); // Append newItem to the end of the array
      setNewItem('');
    }
  };
  // arr.filter((data) => data.length);
  const nonEmptyItems = values[courseModel]?.filter((data: string) => data.length);
  console.log(nonEmptyItems, 'nonEmptyItems');
  return (
    <div className="mt-lg">
      <div className="flex justify-between items-center mb-xs">
        <Text className="text-xl text-secondary-dark font-semibold">{title}</Text>
      </div>
      {nonEmptyItems?.map((item: string, index: number) => (
        <div className="flex mb-xs items-center justify-between " key={index}>
          <div className="flex">
            <span className="checkmark text-lg pr-sm">&#10004;</span>
            <p className="text-secondary-default pr-md">{item}</p>
          </div>

          <ActionIcon color="red" className="" onClick={() => removeListItem(courseModel, index)}>
            <IconTrash size="1.4rem" />
          </ActionIcon>
        </div>
      ))}

      <div className="flex justify-between gap-sm mt-md">
        <TextInput
          className="w-[90%]"
          size="lg"
          radius="md"
          placeholder={placeholder}
          withAsterisk
          value={newItem}
          onChange={(event) => setNewItem(event.target.value)}
        />
        <Button size="lg" radius="md" className="bg-primary-1000 " onClick={addItem}>
          Add Item
        </Button>
      </div>

      {nonEmptyItems?.length === 0 && (
        <span className="text-red-600 mt-sm">{props.errorMessage ? props.errorMessage : ''}</span>
      )}
    </div>
  );
};

export default AddItemInputField;
