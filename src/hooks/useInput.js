import { useState } from "react";

function useInput(defaultValue) {
  const [value, setValue] = useState(defaultValue);

  const onValueChange = (e) => setValue(e.target.value);
  return [value, onValueChange];
}

export default useInput;
