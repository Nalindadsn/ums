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
      setDate(data.updatedAt);
    };

    fetching();
  }, [match.params.id, date]);

  const resetHandler = () => {
    setName('');
    setEmail('');
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserAction(match.params.id, name, email));
    if (!name || !email) return;

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
