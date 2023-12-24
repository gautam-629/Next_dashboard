/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Button } from '@mantine/core';
import RichTextEditor from '@mantine/rte';
import { RemoteAxleRichTextEditor } from '../../../../components/common/RemoteAxleRichTextEditor';

interface DescriptionProps {
  form: any;
  close: any;
  index: number;
  SectionIndex: number;
}
const Description = (props: DescriptionProps) => {
  const { index, SectionIndex } = props;

  return (
    <div className="">
      {/* <Text className="text-center text-2xl font-semibold mb-lg">Add Description</Text> */}
      {/* <RichTextEditor
        label="Add Description"
        {...props.form.getInputProps(`sections.${SectionIndex}.lessons.${index}.lessonDescription`)}
        id="rte"
        required
        className="h-[350px]"
      /> */}
      <RemoteAxleRichTextEditor
        changeContentDescription={(val: string) => {
          props.form.setFieldValue(
            `sections.${SectionIndex}.lessons.${index}.lessonDescription`,
            val,
          );
        }}
        loadedContent={`sections.${SectionIndex}.lessons.${index}.lessonDescription`}
      />
      <Button onClick={() => props.close()} className="mt-lg">
        Submit
      </Button>
    </div>
  );
};

export default Description;
