import { TypographyStylesProvider, Text } from '@mantine/core';

interface DescriptionProps {
  courseDescription: string | undefined;
  courseTitle: string | undefined;
}

const CourseDescription: React.FC<DescriptionProps> = ({ courseDescription, courseTitle }) => {
  const description = courseDescription || 'No description available';

  return (
    <div>
      <p className="text-5xl font-semibold mt-normal mb-sm">{courseTitle}</p>
      {/* <p className="text-justify ">{description}</p> */}
      <TypographyStylesProvider className="h-fit">
        <Text
          className=" mt-xs  text-justify h-fit font-poppin text-lg leading-8 tracking-wider"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </TypographyStylesProvider>
    </div>
  );
};

export default CourseDescription;
