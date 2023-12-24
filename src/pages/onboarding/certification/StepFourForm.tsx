import {
  ActionIcon,
  Group,
  Text,
  TextInput,
  Textarea,
  useMantineTheme,
  Card,
  Box,
} from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
// import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconTrash } from '@tabler/icons-react';

import FileUpload from './FileUpload';

interface StepFourFormProps {
  form: any;
  index: any;
  deleteForm: any;
  setFileUrl: any;
  certification: any;
  values?: any;
  submit?: any;
  formErrors?: any;
}
const StepFourForm = (props: StepFourFormProps) => {
  const setUrl = (fileUrl: string) => {
    props.form.setFieldValue(`certification.${props.index}.cvUrl`, fileUrl);
  };

  return (
    <div className=" w-full">
      <div className={props.index >= 1 ? ' rounded-md mt-md relative' : 'black relative'}>
        {props.index >= 1 ? (
          <div
            className="absolute top-none right-none z-10  py-xs "
            onClick={() => props.deleteForm(props.index)}
          >
            <ActionIcon>
              <IconTrash
                size={25}
                strokeWidth={2}
                color={'#bf4b40'}
                onClick={(e: any) => props.deleteForm(e, props.index)}
              />
            </ActionIcon>
          </div>
        ) : (
          ''
        )}
        <Box
          className={`flex items-center pt-lg mb-xl${
            props.index >= 1 ? 'border-solid border-2 border-gray-300' : ''
          }`}
        >
          <div className="">
            {/* <File setFileUrl={setUrl} className="w-full"></File> */}
            <FileUpload setFileUrl={setUrl} />
            <div className="form-errors">
              {/* {props.formErrors[`certification.${props.index}.cvUrl`]} */}
            </div>
          </div>
          <div className="w-[100%] ml-md">
            <Text className="font-normal  text-secondary-default text-sm  leading-6 mb-xs tracking-wider">
              Title
            </Text>
            <TextInput
              variant="filled"
              placeholder="Enter Title "
              className="mb-sm"
              size="lg"
              radius="md"
              {...props.form.getInputProps(`certification.${props.index}.title`)}
            />
            <Text className="font-normal  text-secondary-default text-sm  leading-6  mb-xs tracking-wider  ">
              Enter Description (max 200 words)
            </Text>
            <div className="description-height">
              {/* <TextInput
                variant="filled"
                placeholder="Enter Description"
                className=""
                {...props.form.getInputProps(`certification.${props.index}.description`)}
              /> */}
              <Textarea
                placeholder="Enter your description"
                variant="filled"
                withAsterisk
                autosize
                radius="md"
                size="lg"
                minRows={5}
                {...props.form.getInputProps(`certification.${props.index}.description`)}
              />
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default StepFourForm;
