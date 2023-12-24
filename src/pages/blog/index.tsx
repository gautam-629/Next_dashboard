import { Title, Group, Input, Grid, Card, Image, Text, Tabs, Stack, Box } from '@mantine/core';
import { useEffect, useState } from 'react';

import { IconSearch } from '@tabler/icons-react';

import { APIGetAllBlogs } from '../../api/blog';
import { formatBlogDate } from '../../utils/helpers/date.helper';
import { IBlog } from '../../utils/interfaces/AllBlogs';
import { errorImageHandler } from '../../utils/assets/imageurl';
import { errorNotification } from '../../utils/helpers/notifications';
import BlogCard from './BlogCard';
const AllBlogs = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const res: any = await APIGetAllBlogs();
        console.log(res, '@res');
        setBlogs(res?.data);
      } catch (error: any) {
        errorNotification(error.message || 'An error occurred');
      }
    })();
  }, []);
  return (
    <main className="wrapper-x mt-md mb-lg">
      <Group position="apart">
        <Title className="text-3xl  font-semibold text-secondary-dark" order={2}>
          Blogs
        </Title>
        <Input className=" text-sm w-1/4" icon={<IconSearch />} placeholder="Search Blog" />
      </Group>
      <Grid className="mt-sm">
        <Grid.Col span={12} sm={12} xs={12} md={9} lg={9}>
          <Tabs>
            <Tabs.List className="border-none">
              <Tabs.Tab className="text-secondary-dark font-semibold p-xs " value="All">
                All
              </Tabs.Tab>
              <Tabs.Tab className="text-secondary-dark font-semibold p-xs" value="Design">
                Design
              </Tabs.Tab>
              <Tabs.Tab className="text-secondary-dark font-semibold p-xs" value="Product">
                Product
              </Tabs.Tab>
              <Tabs.Tab className="text-secondary-dark font-semibold p-xs" value="LeaderShip">
                LeaderShip
              </Tabs.Tab>
              <Tabs.Tab className="text-secondary-dark font-semibold p-xs" value="Management">
                Management
              </Tabs.Tab>
              <Tabs.Tab className="text-secondary-dark font-semibold p-xs" value="Customer">
                Customer
              </Tabs.Tab>
              <Tabs.Tab className="text-secondary-dark font-semibold p-xs" value="Development">
                Development
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>

          <Grid className="mt-xs">
            {Array.isArray(blogs) &&
              blogs?.map((blog: IBlog) => (
                <Grid.Col span={12} xs={12} sm={6} md={6} lg={4} key={blog._id}>
                  <BlogCard blog={blog} />
                </Grid.Col>
              ))}
          </Grid>
        </Grid.Col>

        <Grid.Col span={12} md={3} xs={12} sm={12} lg={3}>
          <Box>
            <Title className="font-normal text-lg">Must Read Blogs</Title>
            {[1, 2].map((item) => (
              <Stack className="mt-md" spacing="xs" key={item}>
                <Text className="text-Grayscale-600 text-tiny font-medium" fz="sm">
                  2074/02/01
                </Text>
                <Title
                  order={2}
                  className="font-medium mb-xs text-secondary-dark text-lg popup-detail"
                >
                  React vs React Native - Which JS Fram...
                </Title>
                <Text className="font-medium text-secondary-default mantine-lfjkdj">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsu..
                </Text>
              </Stack>
            ))}
          </Box>
        </Grid.Col>
      </Grid>
    </main>
  );
};

export default AllBlogs;
