import { Card } from '@mantine/core';

const Bio = (props: { bio: string }) => {
  return (
    <Card withBorder>
      <p className="text-lg font-semibold leading-7 text-secondary-dark">Bio</p>
      <div className="mt-xs">
        <p className="text-sm font-normal text-secondary-default">{props.bio}</p>
      </div>
    </Card>
  );
};

export default Bio;
