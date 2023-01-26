import NaverLogin from '@/components/NaverLogin/NaverLogin'
import styles from './page.module.css'

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        홈
        <div>
          <NaverLogin />
        </div>
      </main>
    </>
  )
}
