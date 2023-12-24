import { Badge, TabProps } from '@mantine/core';
import React from 'react';
interface TagsProps {
  tags: string[] | undefined;
}

const Tags: React.FC<TagsProps> = ({ tags }) => {
  return (
    <div className="my-normal">
      {tags?.map((tag: string, index: number) => (
        <Badge
          styles={{
            inner: {
              fontSize: '0.9rem',
            },
          }}
          color="indigo"
          size="md"
          className="mr-xs"
          key={index}
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
};

export default Tags;
