import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutReduce } from '../redux/slices/userSlice';

const Home = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  console.log(user);

  useEffect(() => {
    dispatch(logoutReduce());
  }, []);

  return (
    <div>
      <Link to={'/todos'}>Todos</Link>
    </div>
  );
};

export default Home;
