import { Card, Text, TextInput, Textarea } from '@mantine/core';
import React from 'react';
import { MouseEvent } from 'react';
import { IconTrash } from '@tabler/icons-react';
interface FaqProps {
  form: any;
  faq: any;
  index: any;
  deleteEducation: (e: MouseEvent<HTMLButtonElement>, index: number) => void;
}
const FAQ = (props: FaqProps) => {
  return (
    <div className="">
      <div className={props.index >= 1 ? 'rounded-md mt-md relative' : 'black relative'}>
        {props.index >= 1 ? (
          <div className="absolute top-none right-none px-lg py-md z-10">
            <IconTrash
              size={25}
              strokeWidth={2}
              color={'#bf4b40'}
              onClick={(e: any) => props.deleteEducation(e, props.index)}
            />
          </div>
        ) : (
          ''
        )}

        <div
          className={` w-full ${props.index >= 1 ? 'm-[0px !important] ' : 'py-xs py-[10px] '}  `}
        >
          <div>
            <TextInput
              size="lg"
              variant="filled"
              placeholder="Enter Question"
              {...props.form.getInputProps(`faq.${props.index}.question`)}
            ></TextInput>

            <Textarea
              style={{
                minHeight: '128px',
              }}
              size="xl"
              className="mt-normal"
              variant="filled"
              placeholder="Enter Answer"
              {...props.form.getInputProps(`faq.${props.index}.answer`)}
            ></Textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
