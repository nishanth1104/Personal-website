import styles from './SectionLabel.module.css'

export default function SectionLabel({ index, label }) {
  const num = String(index).padStart(2, '0')
  return (
    <div className={styles.label}>
      <span className={styles.slash}>//</span>
      <span className={styles.num}>{num}</span>
      <span className={styles.sep}>/</span>
      <span className={styles.text}>{label}</span>
    </div>
  )
}
