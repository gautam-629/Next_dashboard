import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Textarea } from '@mantine/core';
import { faSmile, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const Comments = () => {
  return (
    <div className="mt-lg mb-lg">
      {' '}
      <div className="custom-textarea">
        <Textarea placeholder="Write A Comment...." withAsterisk />
        <FontAwesomeIcon icon={faSmile} className="iconsmile" />
        <FontAwesomeIcon icon={faPaperPlane} className="iconsend" />
      </div>
    </div>
  );
};

export default Comments;
