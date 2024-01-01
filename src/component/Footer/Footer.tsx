import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Travel Log Applications</div>
      <div className={styles.text}>
        Travel Log Application © All rights reserved.
      </div>
    </div>
  );
};

export default Footer;