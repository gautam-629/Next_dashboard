import { Group, Radio } from '@mantine/core';
import { useState } from 'react';

// const priceRanges = [
//   '1000-2000',
//   '2000-3000',
//   '3000-4000',
//   // Add more price ranges as needed
// ];

const PriceFilter = () => {
  const [value, setValue] = useState('');
  console.log(value, 'value');
  return (
    <div>
      <Radio.Group
        withAsterisk
        onChange={(e: string) => {
          setValue(e);
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Radio value="1000-2000" label="1000-2000" className="mt-xs font-normal" />
          <Radio value="1000-3000" label="2000-3000" className="mt-xs font-normal" />
          <Radio value="3000-4000" label="3000-4000" className="mt-xs font-normal" />
          <Radio value="4000-5000" label="4000-5000" className="mt-xs font-normal" />
          <Radio value="5000-6000" label="5000-6000" className="mt-xs font-normal" />
          <Radio value="6000-7000" label="6000-7000" className="mt-xs font-normal" />
        </div>
      </Radio.Group>
    </div>
  );
};

export default PriceFilter;
