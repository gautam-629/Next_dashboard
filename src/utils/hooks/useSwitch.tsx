import { useState } from 'react';
import { STATUS } from '../enum/status.enum';

/**
 * Switch hook to update the state on change
 * @param switchStatus :boolean
 * @returns object
 */
const useSwitch = (switchStatus: boolean, props: any) => {
  const [status, setStatus] = useState(switchStatus);
  const { course, changeStatus } = props;
  const updateSwitchState = () => {
    setStatus(!status);
    changeStatus(course._id, status ? STATUS.INACTIVE : STATUS.PUBLISHED);
  };
  const inputValues = {
    checked: status,
    onChange: updateSwitchState,
  };
  return inputValues;
};

export default useSwitch;
