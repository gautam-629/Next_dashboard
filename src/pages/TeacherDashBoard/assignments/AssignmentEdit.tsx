/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Select, TextInput } from '@mantine/core';
import RichTextEditor from '@mantine/rte';

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { INITIAL_ASSIGNMENT } from '../../../utils/interfaces/Task.model';
import { useForm } from '@mantine/form';
import axios from '../../../plugins/axios';
import { FileSvg } from '../../../utils/assets/image';

import { IconChevronDown } from '@tabler/icons-react';
import { File } from '../../../components/File';
import { errorNotification } from '../../../utils/helpers/notifications';
import TextEditorComponent from '../course-create/input-field/TextEditorComponent';

const AssignmentEdit = () => {
  const [value, setSelectedFile] = useState<File[]>([]);
  const [course, setCourse] = useState([]);
  const [section, setSection] = useState([]);
  const navigate = useNavigate();
  const [preview, setPreview] = useState('' as string | undefined);
  const [lesson, setLesson] = useState([]);
  const [fileUrl, setFileUrl] = useState('');
  const [formErrors, setFormErrors] = useState<any>({});

  const handleFileInputChange = async (files: any) => {
    if (!files[0]) {
      setPreview(undefined);
      return;
    }
    const data = new FormData();
    files.forEach((file: any, i: number) => {
      data.append(`file`, file, file.name);
    });
    try {
      const response = await axios.post('file/upload-file', data);
    } catch (error: any) {
      errorNotification(error?.toString());
    }
    const objectUrl = URL.createObjectURL(files[0]);

    //   form.setValues({ imageUrl: response.data.url });
  };

  const form = useForm({
    initialValues: {
      ...INITIAL_ASSIGNMENT,
    },
    validate: {
      assignmentTitle: (value) => (!value || value.length === 0) && 'Title cannot be empty',
      longDescription: (value) => {
        return value.replace(/(<([^>]+)>)/gi, '').length === 0 && 'Description cannot be empty';
      },
      course: (value) => value.length === 0 && 'Course cannot be empty',
      section: (value) => value.length === 0 && 'Section cannot be empty',
      lesson: (value) => value.length === 0 && 'Lesson cannot be empty',
    },
  });
  const { values } = form;
  const { id } = useParams();
  const [item, setElement] = useState({
    assignmentTitle: '',
    course: '',
    lesson: '',
    section: '',
    longDescription: '',
    imageUrl: '',
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`assignment/assignment-list/${id}`);
        const formData = {
          ...res.data,
          section: res?.data?.section?._id ?? '',
          lesson: res?.data?.lesson?._id ?? '',
          course: res?.data?.course?._id ?? '',
        };
        setElement(res.data);
        console.log(res, '@res');
        console.log(formData, '@formdata');
        form.setValues({ ...formData });
      } catch (error: any) {
        errorNotification(error?.toString());
      }
    })();
  }, []);
  const submit = async () => {
    const { hasErrors, errors } = form.validate();

    console.log(errors, hasErrors, '@errors');

    if (hasErrors) {
      setFormErrors(errors);
      return;
    }
    if (fileUrl != '') {
      values.imageUrl = fileUrl;
    }
    // values.imageUrl = fileUrl;
    const { assignmentTitle, course, section, lesson, longDescription, imageUrl } = values;
    try {
      await axios.put(`assignment/assignment-update/${id}`, {
        assignmentTitle,
        course,
        section,
        lesson,
        longDescription,
        imageUrl,
      });
    } catch (error: any) {
      errorNotification(error?.toString());
    }

    navigate('/teacher/assignment');
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('courses/list');
        const c = res.data.results.map((d: any) => {
          return { value: d._id, label: d.courseTitle ?? 'React' };
        });

        setCourse(c);

        if (values.course._id && values.course._id !== '') {
          form.setFieldValue('course', values.course._id);
        }
      } catch (error: any) {
        errorNotification(error?.toString());
      }
    })();
    (async () => {
      if (values.course) {
        try {
          const res = await axios.get(`course/sections/${values.course}`);
          const c = res?.data?.map((d: any) => {
            return { value: d._id, label: d.sectionTitle ?? 'React' };
          });
          setSection(c);
        } catch (error: any) {
          errorNotification(error?.toString());
        }
      }
    })();
    (async () => {
      if (values.section) {
        try {
          const res = await axios.get(`course/sections/${values.section}/lessons`);
          const c = res?.data?.map((d: any) => {
            return { value: d._id, label: d.lessonTitle ?? 'React' };
          });
          setLesson(c);
        } catch (error: any) {
          errorNotification(error?.toString());
        }
      }
    })();
    if (values.longDescription) {
      setFormErrors((prevState: any) => {
        return {
          ...prevState,
          longDescription: '',
        };
      });
    }
  }, [values]);

  return (
    <>
      <div className="mr-[30px] mt-md ml-[30px] py-lg p-sm bg-white rounded-lg">
        <div className="top-bar flex items-center justify-start gap-lg  text-lg tracking-wider">
          <span>Assignment Edit</span>
        </div>
        <div className="mt-md grid">
          <label htmlFor="title">Assignment Title:</label>
          <TextInput
            type="text"
            placeholder="Your Task Title goes here"
            className="bg-[#EFF0F7] text-[#A0A3BD py-sm px-sm rounded-lg  border-transparent"
            {...form.getInputProps(`assignmentTitle`)}
          />
        </div>
        <div className="grid grid-cols-12 gap-lg">
          <div className=" mt-md grid col-span-4">
            <label htmlFor="title">Select Course:</label>
            <Select
              searchable
              placeholder={'--- select course ---'}
              rightSection={<IconChevronDown size={14} />}
              rightSectionWidth={30}
              styles={{ rightSection: { pointerEvents: 'none' } }}
              data={course}
              {...form.getInputProps(`course`)}
            />
          </div>
          <div className=" mt-md grid col-span-4">
            <label htmlFor="title">Select Section:</label>
            <Select
              placeholder={'--- select section ---'}
              rightSection={<IconChevronDown size={14} />}
              rightSectionWidth={30}
              styles={{ rightSection: { pointerEvents: 'none' } }}
              data={section}
              {...form.getInputProps(`section`)}
            />
          </div>
          <div className=" mt-md grid col-span-4">
            <label htmlFor="title">Select Lesson:</label>
            <Select
              placeholder={'--- select lesson ---'}
              rightSection={<IconChevronDown size={14} />}
              rightSectionWidth={30}
              styles={{ rightSection: { pointerEvents: 'none' } }}
              data={lesson}
              {...form.getInputProps(`lesson`)}
            />
          </div>
        </div>
        <div className="mt-md grid">
          <TextEditorComponent
            form={form}
            title="Description"
            courseModel={'longDescription'}
            errorMessage={''}
            placeholder={'Description'}
          />
          <div className="form-errors">{formErrors.longDescription}</div>
        </div>

        <div className="grid grid-cols-12 gap-lg">
          <div className="mt-md grid col-span-12">
            <File setFileUrl={setFileUrl}></File>
            {item.imageUrl.split('.').pop() == 'pdf' ? (
              <img src={FileSvg} className="h-[200px] w-[200px]" alt="pdf" />
            ) : (
              <img src={item.imageUrl} className="h-[200px] w-[200px]" alt="cleaning images" />
            )}

            <input
              type="hidden"
              placeholder=""
              className="bg-[#EFF0F7] text-[#A0A3BD py-sm px-sm rounded-lg  border-transparent"
              {...form.getInputProps(`imageUrl`)}
            />
          </div>
        </div>

        <div className="buttons flex gap-lg mt-md">
          <button
            className="bg-buttonColor-500 px-md py-xs text-sm text-white rounded-lg no-underline"
            onClick={submit}
          >
            Update Assignment
          </button>
        </div>
      </div>
    </>
  );
};

export default AssignmentEdit;
