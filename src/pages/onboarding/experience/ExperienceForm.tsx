import { Text, TextInput, Textarea, Card } from '@mantine/core';
import { MouseEvent } from 'react';
import { IconTrash } from '@tabler/icons-react';

interface StepThreeFormProps {
  form: any;
  index: any;
  experience: any;
  deleteForm: (e: MouseEvent<HTMLButtonElement>, index: number) => void;
}

const ExperienceForm = (props: StepThreeFormProps) => {
  return (
    <div>
      <div className={props.index >= 1 ? ' rounded-md mt-md relative' : 'black relative'}>
        {props.index >= 1 ? (
          <div className="absolute top-none right-none z-10 absolute right-sm py-lg ">
            <IconTrash
              size={25}
              strokeWidth={2}
              color={'#bf4b40'}
              onClick={(e: any) => props.deleteForm(e, props.index)}
            />
          </div>
        ) : (
          ''
        )}{' '}
        <Card className="rounded-md p-md" withBorder>
          <div className="w-full">
            <Text className="font-bold text-secondary-dark text-base   mb-xs">Organization</Text>
            <TextInput
              placeholder="Enter the name of the Company or Organization"
              variant="filled"
              {...props.form.getInputProps(`experience.${props.index}.organization`)}
            ></TextInput>
            <div className=" grid grid-cols-1 gap-4 md:grid-cols-2 gap-lg py-[10px] mt-xs ">
              <div>
                <Text
                  placeholder="Enter your designation"
                  className="font-bold font-poppin text-secondary-dark text-base   mb-[4px]  "
                >
                  Designation
                </Text>
                <TextInput
                  variant="filled"
                  placeholder="Enter Your designation"
                  {...props.form.getInputProps(`experience.${props.index}.designation`)}
                ></TextInput>
              </div>
              <div className="">
                <Text className="font-bold font-poppin text-secondary-dark text-base   mb-[4px]  ">
                  Time Period
                </Text>
                <TextInput
                  variant="filled"
                  placeholder="Enter time period"
                  {...props.form.getInputProps(`experience.${props.index}.period`)}
                ></TextInput>
              </div>
            </div>
            <div className="">
              <Text className=" mt-xs font-bold font-poppin text-secondary-dark text-base   mb-[4px] ">
                Description (150-200 words)
              </Text>
            </div>
            <div className="description-height ">
              {/* <TextInput
                placeholder="Enter your description"
                variant="filled"
                className="h-full"
                {...props.form.getInputProps(`experience.${props.index}.description`)}
              ></TextInput> */}
              <Textarea
                placeholder="Enter your description"
                variant="filled"
                withAsterisk
                className=""
                {...props.form.getInputProps(`experience.${props.index}.description`)}
              />
            </div>
          </div>
        </Card>{' '}
      </div>
    </div>
  );
};

export default ExperienceForm;
