import { useState } from 'react'
import type { NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { Button } from 'antd'
import styles from './index.module.scss'
import { navs } from './config'
import Login from 'components/Login'

const Navbar: NextPage = () => {
  const { pathname } = useRouter()
  const [isShowLogin, setIsShowLogin] = useState(false)

  const handleGoToEditorPage = () => {

  };

  const handleLogin = () => {
    setIsShowLogin(true)
  };

  const handleClose = () => {
    setIsShowLogin(false)
  };

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
      <section className={styles.operationArea}>
        <Button onClick={handleGoToEditorPage}>写文章</Button>
        <Button onClick={handleLogin} type="primary">登录</Button>
      </section>
      <Login isShow={isShowLogin} onClose={handleClose} />
    </div>
  )
}

export default Navbar;