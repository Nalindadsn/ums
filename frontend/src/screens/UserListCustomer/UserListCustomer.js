import React, { useEffect, useRef } from 'react';
import { Accordion, Badge, Button, Card } from 'react-bootstrap';
import MainScreen from '../../components/MainScreen';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import { useDispatch, useSelector } from 'react-redux';
import { deleteUserAction, listUsers } from '../../actions/userActions';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import ReactPDFPrint from '../../components/ReactPDFPrint';
import UserListPDF from '../../components/UserListPDF';
import { useReactToPrint } from 'react-to-print';
// import PDFFile from '../../components/PDFFile';
// import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

function UserListCustomer({ history, search }) {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  console.log(userList);

  // const filteredUsers = users.filter((note) =>
  //   note.title.toLowerCase().includes(search.toLowerCase())
  // );

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'emp-data',
    onafterprint: () => alert('print success'),
  });
  useEffect(() => {
    dispatch(listUsers());
    if (!userInfo) {
      history.push('/');
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUserAction(id));
    }
  };

  return (
    <MainScreen title={`Welcome Back ${userInfo && userInfo.name}..`}>
      {/* <PDFDownloadLink document={<PDFFile />} fileName="FORM">
        {({ loading }) =>
          loading ? <button>Loading</button> : <button>Download</button>
        }
      </PDFDownloadLink>
      <PDFViewer>
        <PDFFile />
      </PDFViewer> */}
      {console.log(users)}
      <Link to="/register">
        <Button>Create new User</Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}

      <button className="btn btn-primary float-right" onClick={handlePrint}>
        print
      </button>
      <div className="table-responsive">
        <table
          class="table"
          ref={componentRef}
          style={{ width: '100%', height: window.innerHeight }}
        >
          <caption>List of users</caption>
          <thead>
            <tr>
              <th scope="col">Full Name</th>
              <th scope="col">Email</th>
              <th scope="col">phone</th>
              <th scope="col">userId</th>
              <th scope="col">NIC</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users
                .filter((filteredNote) =>
                  filteredNote.name.toLowerCase().includes(search.toLowerCase())
                )
                .reverse()
                .map((note) => (
                  <tr>
                    <td>{note.name}</td>
                    <td>{note.email}</td>
                    <td>{note.phone}</td>
                    <td>{note.userId}</td>
                    <td>{note.nic}</td>
                    <td className="text-center">
                      <Button href={`/user/${note._id}`}>Edit</Button>
                      <Button
                        variant="danger"
                        className="mx-2"
                        onClick={() => deleteHandler(note._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </MainScreen>
  );
}

export default UserListCustomer;
