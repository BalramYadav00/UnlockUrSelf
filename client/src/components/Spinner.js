import React from "react";

function Spinner() {
  return (
    <div class="spinner-parent">
      <div
        class="inline-block h-8 w-8 animate-spin  rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-green-600 motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      ></div>
    </div>
  );
}

export default Spinner;
