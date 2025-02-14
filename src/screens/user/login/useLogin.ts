import { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UserStackParamList } from '../../../navigations/UserNavigation';

import { useDispatch } from 'react-redux';
import { login } from '../../../rtk/Reducer';

type UseLoginProps = NativeStackScreenProps<UserStackParamList, 'Login'>;

export const useLogin = ({ route, navigation }: UseLoginProps) => {
  const { params } = route;

  const dispatch = useDispatch();
  const [name, setName] = useState<string>('');

  const handle = () => {
    if (name !== '') {
      dispatch(login(name));
    } else {
      console.log('Thiếu');
    }
  };

  return {
    name,
    setName,
    handle,
  };
};
