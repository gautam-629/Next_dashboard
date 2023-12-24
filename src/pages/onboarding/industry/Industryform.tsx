import { Box, Grid, MultiSelect, Text, TextInput, Textarea } from '@mantine/core';
import React, { useState } from 'react';
import { IconBrandFacebook, IconBrandGit, IconBrandLinkedin } from '@tabler/icons-react';

interface StepOneFormProps {
  form: any;
}

// const INDUSTRY_LIST = [
//   'Frontend',
//   'Backend',
//   'Fullstack',
//   'DevOps',
//   'Data Science',
//   'Machine Learning',
//   'Artificial Intelligence',
//   'Cyber Security',
//   'Cloud Computing',
//   'Mobile Development',
//   'UI/UX Design',
// ];

const IndustryForm = (props: StepOneFormProps) => {
  const [data, setData] = useState([
    { value: 'react', label: 'React' },
    { value: 'ng', label: 'Angular' },
  ]);

  return (
    <div>
      <div>
        <div className="mb-[40px]">
          <div className="w-full onboarding-input ">
            {/* <MultiSelect
              variant="filled"
              className="w-full"
              data={INDUSTRY_LIST}
              placeholder="Frontend"
              searchable
              creatable
              getCreateLabel={(query) => `+ Add ${query}`}
              onCreate={(query) => {
                const item = { value: query, label: query };
                setData((current: any) => [...current, item]);
                return item;
              }}
              {...props.form.getInputProps('preferedIndustry')}
            /> */}

            <Textarea
              placeholder="Short Bio"
              variant="filled"
              withAsterisk
              autosize
              radius="md"
              size="lg"
              minRows={4}
              {...props.form.getInputProps('experience.bio')}
              // {...props.form.getInputProps(`certification.${props.index}.description`)}
            />

            <div className="">
              <Text className="mt-md  font-normal mb-xs text-lg   ">Title</Text>
              <TextInput
                variant="filled"
                placeholder="Enter Title"
                size="lg"
                radius="md"
                {...props.form.getInputProps('experience.title')}
              />
            </div>

            <Box className="mt-md">
              <Text className="text-secondary-dark font-normal text-base leading-7 tracking-wider">
                Social Media Links
              </Text>
              <Box className="mt-xs">
                <Grid className="flex">
                  <Grid.Col span={1} className="flex items-center ">
                    <Text className="text-secondary-default leading-6 text-sm font-normal tracking-wider">
                      Facebook
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={11} className="pl-xl">
                    <TextInput
                      className="w-full "
                      placeholder="Enter Link"
                      size="lg"
                      radius="md"
                      variant="filled"
                      icon={<IconBrandFacebook />}
                      {...props.form.getInputProps('experience.socialMedia.facebook')}
                    />
                  </Grid.Col>
                </Grid>
                <Grid className="flex">
                  <Grid.Col span={1} className="flex items-center ">
                    <Text className="text-secondary-default leading-6 text-sm font-normal tracking-wider">
                      Linkedin
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={11} className="pl-xl">
                    <TextInput
                      className="w-full "
                      placeholder="Enter Link"
                      size="lg"
                      radius="md"
                      icon={<IconBrandLinkedin />}
                      variant="filled"
                      {...props.form.getInputProps('experience.socialMedia.linkedIn')}
                    />
                  </Grid.Col>
                </Grid>
                <Grid className="flex">
                  <Grid.Col span={1} className="flex items-center ">
                    <Text className="text-secondary-default leading-6 text-sm font-normal tracking-wider">
                      Git
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={11} className="pl-xl">
                    <TextInput
                      className="w-full "
                      placeholder="Enter Link"
                      size="lg"
                      radius="md"
                      variant="filled"
                      icon={<IconBrandGit />}
                      {...props.form.getInputProps('experience.socialMedia.gitHub')}
                    />
                  </Grid.Col>
                </Grid>
              </Box>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryForm;
