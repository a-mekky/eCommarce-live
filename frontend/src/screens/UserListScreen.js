import React, {useEffect,useContext } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useNavigate } from 'react-router-dom';
import { listUsers, deleteUser } from '../actions/userActions';
import { langContext } from "../components/LanguageContext";

function UserListScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { contextLang } = useContext(langContext);

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div>
      <h1>{contextLang === "en" ? "Users" : "المستخدمين"}</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table
          striped
          bordered
          hover
          responsive
          className="table-sm text-center"
        >
          <thead>
            <tr>
              <th>{contextLang === "en" ? "ID" : "الرقم"}</th>
              <th>{contextLang === "en" ? "Name" : "الاسم"}</th>
              <th>{contextLang === "en" ? "EMAIL" : "البريد الالكتروني"}</th>
              <th>{contextLang === "en" ? "ADMIN" : "مشرف"}</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: 'green' }}></i>
                  ) : (
                    <i className="fas fa-check" style={{ color: 'red' }}></i>
                  )}
                </td>

                <td>
                  <LinkContainer to={`/admin/user/edit/${user._id}`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>

                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default UserListScreen;
