import React from 'react';
import styles from './FormStyles.module.css'; // Assuming your CSS module is named FormStyles.module.css

const MyForm = () => {
  return (
    <div >
      <form className={styles.formContainer}>
        <label htmlFor="day" className={styles.label}>Enter Day:</label>
        <input type="text" id="day" name="day" className={styles.input} required />

        <label htmlFor="description" className={styles.label}>Enter Description:</label>
        <textarea id="description" name="description" rows={4} className={styles.textarea} required></textarea>

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.button}>Submit</button>
          <button type="button" className={`${styles.button} ${styles.editButton}`}>Edit</button>
        </div>
      </form>
    </div>
  );
};

export default MyForm;
