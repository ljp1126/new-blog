import type { NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import styles from './index.module.scss'
import { navs } from './config'

const Navbar: NextPage = () => {
  const { pathname } = useRouter()
  return (
    <div className={styles.navbar}>
      <section className={styles.logoArea}>BLOG-C</section>
      <section className={styles.linkArea}>
        {
          navs?.map(nav => (
            <Link key={nav.label} href={nav?.value}>
              <text className={pathname === nav?.value ? styles.active : ''}>{nav?.label}</text>
            </Link>
          ))
        }
      </section>
    </div>
  )
}

export default Navbar;