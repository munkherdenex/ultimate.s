import React, { useState } from 'react';
import { Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import '../../css/login.css';
import { login_image } from '../../assets';
import { addr1List, addr2List, addr3List } from '../../helpers';
import { Button, FloatingInput, FloatingPassword, Error } from '../../components/all';
import { AddressRow, Copyright } from '../../components/login';

export function SignUp(){
  const { t } = useTranslation();
  const [email, setEmail] = useState({ value: '', error: null });
  const [password, setPassword] = useState({ value: '', error: null });
  const [business, setBusiness] = useState({ value: '', error: null });
  const [addr1, setAddr1] = useState({ value: null, error: null });
  const [addr2, setAddr2] = useState({ value: null, error: null });
  const [addr3, setAddr3] = useState({ value: null, error: null });
  const [error, setError] = useState(null);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEnter = e => {
    if (e?.key?.toLowerCase() === "enter") {
      const form = e.target.form;
      const index = [...form].indexOf(e.target);
      form.elements[index + 1].focus();
      e.preventDefault();
    }
  }

  const handleSubmit = async e => {
    e?.preventDefault();
    let isValid = email?.value?.trim() && password?.value?.trim() && business?.value?.trim() && addr1?.value?.trim() && addr2?.value?.trim()
      && addr3?.value?.trim();
    if(isValid){
      setAddr1({ value: addr1?.value });
      setLoading(true);
      console.log('call signup service');
      setTimeout(() => setLoading(false), 1200);
    } else {
      if(!email?.value?.trim()) setEmail({ value: '', error: t('error.not_empty') });
      if(!password?.value?.trim()) setPassword({ value: '', error: t('error.not_empty') });
      if(!business?.value?.trim()) setBusiness({ value: '', error: t('error.not_empty') });
      if(!addr1?.value?.trim() || !addr2?.value?.trim() || !addr3?.value?.trim())
        setAddr1({ value: addr1?.value, error: t('error.not_empty')  });
      else setAddr1({ value: addr1?.value });
    }
  }

  const emailProps = { text: t('login.email'), value: email, setValue: setEmail, setError, handleEnter };
  const passProps = { text: t('login.password'), value: password, setValue: setPassword, setError, handleEnter };
  const businessProps = { text: t('login.business'), value: business, setValue: setBusiness, setError, handleEnter };
  const addressProps = { text: t('login.address'), addr1, addr2, addr3, setAddr1, setAddr2, setAddr3, addr1List, addr2List, addr3List };
  const checkProps = { className: 'l_check', checked, onChange: e => setChecked(e?.target?.checked) };
  const btnProps = { loading, type: 'submit', className: 'l_btn', text: t('login.signup'), disabled: !checked };
  
  return (
    <div className='l_container'>
      <div className='l_back'>
        <img className='l_logo' src={login_image} alt='MASU LOGO' />
        <p className='l_text'>{t('login.signup_text')}</p>
        <form onSubmit={handleSubmit}>
          <FloatingInput {...emailProps} />
          <FloatingPassword {...passProps} />
          <FloatingInput {...businessProps} />
          <AddressRow {...addressProps} />
          <div className='l_check_row'>
            <Checkbox {...checkProps} />
            <p className='l_term'>
              {t('login.sign_accept1')}
              <a className='l_term_link' href='/'>{t('login.sign_accept2')}</a>
              {t('login.sign_accept3')}
              <a className='l_term_link' href='/'>{t('login.sign_accept4')}</a>
              {t('login.sign_accept5')}
            </p>
          </div>
          {error && <Error error={error} />}
          <Button {...btnProps} />
        </form>
        <div className='l_center_row'>
          <p className='l_link_text'>{t('login.go_login')}</p>
          <Link className='l_link' to='/'>{t('login.login')}</Link>
        </div>
      </div>
      <Copyright />
    </div>
  )
}