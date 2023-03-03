import React from "react";

import styles from "./InputControl1.css";

function InputControl1({ label, ...props }) {
  return (
    <div className={styles.main}>
      <div className={styles.container3}>
        <div className={styles.box}>
          {label && <label>{label}</label>}
          
        </div>
        <input id="input" type="text" {...props} />
      </div>
    </div>
  );
}

export default InputControl1;
