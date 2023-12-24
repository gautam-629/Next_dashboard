import React from 'react';
import { Card, Image, Text, Stack, Group, Title, Space } from '@mantine/core';
import {
  IconThumbUpFilled,
  IconMessageCircle2Filled,
  IconBookmarkFilled,
} from '@tabler/icons-react';
import { formatBlogDate } from '../../utils/helpers/date.helper';
import { IBlog } from '../../utils/interfaces/AllBlogs';
import { errorImageHandler } from '../../utils/assets/imageurl';
import { useNavigate } from 'react-router-dom';

interface BlogCardProps {
  blog: IBlog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const navigate = useNavigate();
  return (
    <Card>
      <Card.Section>
        <Image
          style={{
            aspectRatio: '381 / 193',
          }}
          onError={errorImageHandler}
          className="w-full h-full cursor-pointer"
          src={blog.cover}
          height={193}
          alt="blogcadimage"
          onClick={() => navigate('/blog/' + blog?.slug)}
        />
      </Card.Section>
      <Card.Section className="mt-xs">
        <Stack spacing={'xs'}>
          <Group position="apart">
            <Text className="text-tiny font-medium">{formatBlogDate(blog.createdAt)}</Text>
            <Group position="right">
              <div className="mr-xs cursor-pointer flex items-center">
                <span className="text-Grayscale-700">
                  <IconThumbUpFilled size="1rem" />
                </span>
                <span className="ml-xs font-medium text-tiny text-secondary-dark">
                  {blog?.likes?.length ?? '0'}
                </span>
              </div>

              <div className="mr-xs cursor-pointer flex items-center">
                <span className="text-Grayscale-700">
                  <IconMessageCircle2Filled size="1rem" />
                </span>
                <span className="ml-xs font-medium text-tiny text-secondary-dark">
                  {blog?.comments?.length ?? '0'}
                </span>
              </div>

              <div className="mr-xs cursor-pointer flex items-center ">
                <span className="text-Grayscale-700">
                  <IconBookmarkFilled size="1rem" />
                </span>
              </div>
            </Group>
          </Group>
          <Title order={2} className="text-secondary-dark text-base font-semibold two-line ">
            {blog?.title ?? 'Untitled'}
          </Title>

          <Text
            className="font-normal text-secondary-default line-clamp-2 mantine-lfjkdj"
            dangerouslySetInnerHTML={{ __html: blog?.content ?? 'Uncontent' }}
          />
        </Stack>
      </Card.Section>
    </Card>
  );
};

export default BlogCard;
