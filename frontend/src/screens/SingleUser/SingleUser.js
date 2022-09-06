import React, { useEffect, useState } from 'react';
import MainScreen from '../../components/MainScreen';
import axios from 'axios';
import { Button, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserAction, updateUserAction } from '../../actions/userActions';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import ReactMarkdown from 'react-markdown';

function SingleUser({ match, history, search }) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [date, setDate] = useState('');
  const [userId, setUserId] = useState('');
  const [nic, setNic] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [MaritalStatus, setMaritalStatus] = useState('');
  const [phone, setPhone] = useState('');
  const [userType, setUserType] = useState('');

  const dispatch = useDispatch();

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { loading, error } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const { loading: loadingDelete, error: errorDelete } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUserAction(id));
    }
    history.push('/userActivity');
  };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/users/${match.params.id}`);
      console.log(data);

      setName(data.name);
      setEmail(data.email);
      setUserId(data.userId);
      setNic(data.nic);
      setDob(data.dob);
      setGender(data.gender);
      setPhone(data.phone);
      setMaritalStatus(data.MaritalStatus);
      setUserType(data.userType);
      setDate(data.updatedAt);
    };

    fetching();
  }, [match.params.id, date]);

  const resetHandler = () => {
    setName('');
    setEmail('');
    setUserId('');
    setNic('');
    setDob('');
    setGender('');
    setMaritalStatus('');
    setPhone('');
    setUserType('');
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUserAction(
        match.params.id,
        name,
        email,
        userId,
        nic,
        dob,
        gender,
        MaritalStatus,
        phone,
        userType
      )
    );
    if (
      !name ||
      !email ||
      !userId ||
      !nic ||
      !dob ||
      !gender ||
      !MaritalStatus ||
      !phone ||
      !userType
    )
      return;

    resetHandler();
    history.push('/userList');
  };

  return (
    <MainScreen title="Edit User">
      <Card>
        <Card.Header>Edit User {`(${name})`} </Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            <Form.Group controlId="title">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Email</Form.Label>
              <Form.Control
                placeholder="Enter the content"
                rows={4}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="userId">
              <Form.Label>userId</Form.Label>
              <Form.Control
                placeholder="Enter the userId"
                rows={4}
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="nic">
              <Form.Label>nic</Form.Label>
              <Form.Control
                placeholder="Enter the nic"
                rows={4}
                value={nic}
                onChange={(e) => setNic(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="dob">
              <Form.Label>dob</Form.Label>
              <Form.Control
                placeholder="Enter the dob"
                rows={4}
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="gender">
              <Form.Label>gender</Form.Label>
              <Form.Control
                placeholder="Enter the gender"
                rows={4}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="MaritalStatus">
              <Form.Label>MaritalStatus</Form.Label>
              <Form.Control
                placeholder="Enter the MaritalStatus"
                rows={4}
                value={MaritalStatus}
                onChange={(e) => setMaritalStatus(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label>phone</Form.Label>
              <Form.Control
                placeholder="Enter the phone"
                rows={4}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicSelect">
              <Form.Label>Select Norm Type</Form.Label>
              <Form.Control
                as="select"
                value={userType}
                onChange={(e) => {
                  console.log('e.target.value', e.target.value);
                  setUserType(e.target.value);
                }}
              >
                <option value="customer">Customer</option>
                <option value="boatOwner">BoatOwner</option>
                <option value="inventoryManager">Inventory Manager</option>
                <option value="admin">Admin</option>
              </Form.Control>
            </Form.Group>

            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit">
              Update User
            </Button>
            <Button
              className="mx-2"
              variant="danger"
              onClick={() => deleteHandler(match.params.id)}
            >
              Delete User
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default SingleUser;
