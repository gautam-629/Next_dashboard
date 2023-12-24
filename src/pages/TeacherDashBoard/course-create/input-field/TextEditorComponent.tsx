import { Divider, Text } from '@mantine/core';
import RichTextEditor from '@mantine/rte';
import React from 'react';
import { RemoteAxleRichTextEditor } from '../../../../components/common/RemoteAxleRichTextEditor';
interface TextEditorComponentProps {
  form: any;
  title: string;
  courseModel: any;
  placeholder: string;
  errorMessage: any;
  className?: string;
  content?: string;
}
const TextEditorComponent = (props: TextEditorComponentProps) => {
  return (
    <>
      {' '}
      {/* <div className="border-solid border border-borderColor-500 my-sm p-sm rounded-md"> */}
      <div className=" my-sm py-xs rounded-md">
        {/* <TextInput {...props.form.getInputProps('longDescription')} /> */}

        {props.title != '' && (
          <>
            <Text className="text-base  text-secondary-dark     font-medium ">
              {props.title}
              <span className="text-red-600 "> *</span>
            </Text>
            <Divider className="mt-xs mb-[12px]" />
          </>
        )}

        {/*<RichTextEditor*/}
        {/*  placeholder={props.placeholder}*/}
        {/*  id="rte"*/}
        {/*  {...props.form.getInputProps(`${props.courseModel}`)}*/}
        {/*  className={props?.className ?? ''}*/}
        {/*/>*/}

        <RemoteAxleRichTextEditor
          changeContentDescription={(val: string) => {
            props.form.setFieldValue(props.courseModel, val);
          }}
          content={props.content}
          loadedContent={props.form.values[`${props.courseModel}`]}
        />
      </div>
    </>
  );
};
export default TextEditorComponent;
