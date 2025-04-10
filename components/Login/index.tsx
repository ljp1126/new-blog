import { ChangeEvent, useState } from 'react'
import { message } from 'antd';
import request from 'service/fetch'
import CountDown from 'components/CountDown'
import styles from './index.module.scss'
interface IProps {
  isShow: boolean;
  onClose: Function;
}

const Login = (props: IProps) => {
  const { isShow = false, onClose } = props;
  const [isShowVerifyCode, setIsShowVerifyCode] = useState(false)
  const [form, setForm] = useState({
    phone: '',
    verify: '',
  })

  const handleClose = () => {
    onClose && onClose()
  };

  const handleGetVerifyCode = () => {
    if (!form?.phone) {
      message.warning('请输入手机号')
      return
    }
    request.post('/api/user/sendVerifyCode', {
      to: form?.phone,
      templateId: 1
    }).then((res: any) => {
      const { code, msg } = res
      if (code === 0) {
        setIsShowVerifyCode(true)
      } else {
        message.error(msg)
      }
    })
  };

  const handleLogin = () => {
    request.post('/api/user/login', {
      ...form,
    }).then((res: any) => {
      const { code, msg } = res
      if (code === 0) {
        // 登录成功
        message.success('登录成功')
        handleClose()
      } else {
        message.error(msg)
      }
    })
  };

  const handleOAuthGithub = () => {

  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target
    setForm({ ...form, [name]: value })
  }

  const handleCountDownEnd = () => {
    setIsShowVerifyCode(false)
  };

  return isShow ? (
    <div className={styles.loginArea}>
      <div className={styles.loginBox}>
        <div className={styles.loginTitle}>
          <div className={styles.title}>手机号登录框</div>
          <div className={styles.close} onClick={handleClose}>X</div>
        </div>
        <input
          name='phone'
          type="text"
          placeholder='请输入手机号'
          value={form.phone}
          onChange={handleFormChange}
        />
        <div className={styles.verifyCodeArea}>
          <input
            name='verify'
            type="text"
            placeholder='请输入验证码'
            value={form.verify}
            onChange={handleFormChange}
          />
          <span className={styles.verifyCode} onClick={handleGetVerifyCode}>
            {isShowVerifyCode ? <CountDown time={10} onEnd={handleCountDownEnd} /> : '获取验证码'}
          </span>
        </div>
        <div className={styles.loginBtn} onClick={handleLogin}>登录</div>
        <div className={styles.otherLogin} onClick={handleOAuthGithub}>使用 Github 登录</div>
        <div className={styles.loginPrivacy}>
          注册登录即表示同意
          <a href="https://moco.imooc.com/privacy.html" target='_blank' rel="noreferrer">隐私政策</a>
        </div>
      </div>
    </div>
  ) : ''
}

export default Login;