import { useEffect, useState } from 'react';
import { commons } from 'resources/strings';
import { Text } from '@/components/Shared/Text';
import { Display } from './Body';

export const ExpirationTimer: React.FC<{
  expirationInMilisseconds: number;
  expiredText?: string;
  expiringPrefixText?: string;
}> = (props) => {
  const [expiraEm, setExpiraEm] = useState('');
  const [isExpirado, setIsExpirado] = useState(false);

  useEffect(() => {
    if (expiraEm === '') {
      const interval = setInterval(() => {
        getContagemRegressivaExpiracao();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, []);

  const getContagemRegressivaExpiracao = () => {
    let expirou = true;
    let numExpiraEm = props.expirationInMilisseconds - Date.now();
    let txtExpiraEm = !!props.expiredText
      ? props.expiredText
      : commons.expirado;
    if (numExpiraEm > 0) {
      expirou = false;
      let minutos = Math.trunc(numExpiraEm / 60000);
      let segundos = Math.trunc((numExpiraEm % 60000) / 1000);
      txtExpiraEm = !!props.expiringPrefixText
        ? `${props.expiringPrefixText} ${
            minutos > 9 ? minutos : `0${minutos}`
          }:${segundos > 9 ? segundos : `0${segundos}`}`
        : `${minutos > 9 ? minutos : `0${minutos}`}:${
            segundos > 9 ? segundos : `0${segundos}`
          }`;
    }
    setIsExpirado(expirou);
    setExpiraEm(txtExpiraEm);
  };

  return (
    <Display
      display="flex"
      alignItems="flex-end"
      justifyContent="flex-end"
      width="100%"
      style={{ marginBottom: 'auto', marginRight: '20px' }}
    >
      <Text
        color="#fff"
        style={{
          display: 'flex',
          padding: '10px',
          borderRadius: '5px',
          backgroundColor: isExpirado ? '#f44336' : 'rgb(252 97 12)',
        }}
        className="text-expira-em"
      >
        {expiraEm}{' '}
        {!isExpirado && (
          <span>
            {' '}
            <i
              className="clock outline icon"
              style={{ marginLeft: '2px', marginRight: '0px' }}
            ></i>
          </span>
        )}
      </Text>
    </Display>
  );
};
