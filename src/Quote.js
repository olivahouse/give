import styles from './styles.module.css';

export const Quote = () => (
  <div className={styles.quote}>
    <div className={styles.bubble}>
      <div className={styles.quoteText}>“The work shouldn’t be on the customer to find great care. Oliva’s approach is such a relief.”</div>
      <div className={styles.quoteName}>Adelina Peltea</div>
      <div className={styles.quoteTitle}>VP of Marketing, Mother, Leader</div>
    </div>
    <div className={styles.avatar}>
      <img alt="professional" src="https://oliva-static-assets.s3.amazonaws.com/5fb259846543242f58e0166c_adelina-peltea-linkedin-profile-photo.jpg"/>
    </div>
  </div>
);
