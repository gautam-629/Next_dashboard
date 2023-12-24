/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Button, Group, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useState } from 'react';
interface CourseDeleteModalProps {
  deleteCourse: any;
  id: any;
  courseTitle: string;
  courseModal: any;
  toggleModal: any;
  modalIsOpened: boolean;
  modalData: any;
  opened: any;
  openModal: any;
  setOpenModal: any;
}
const CourseDeleteModal = (props: CourseDeleteModalProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const [modalData, setModalData] = useState({ id: '', courseTitle: '' });
  return (
    <Modal
      opened={props.openModal}
      onClose={() => props.toggleModal(modalData)}
      title="Are you want to delete your course?"
    >
      <Text size="sm">
        Are you sure you want to delete your Course {modalData.courseTitle}? This action is
        destructive and you will have to contact support to restore your data.
      </Text>
      {/* Modal content */}
      {/* <h1>Are you sure to delete {modalData.courseTitle}</h1> */}
      <Group position="right">
        {' '}
        <Button onClick={() => props.setOpenModal(false)} variant="outline">
          Cancel
        </Button>
        <Button onClick={() => props.deleteCourse(props.id)} color="red">
          Delete
        </Button>
      </Group>
    </Modal>
  );
};

export default CourseDeleteModal;
