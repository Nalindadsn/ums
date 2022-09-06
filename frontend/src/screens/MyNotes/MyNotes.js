import React, { useEffect, useRef } from 'react';
import { Accordion, Badge, Button, Card } from 'react-bootstrap';
import MainScreen from '../../components/MainScreen';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import { useDispatch, useSelector } from 'react-redux';
import { deleteNoteAction, listNotes } from '../../actions/notesActions';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import { useReactToPrint } from 'react-to-print';

function MyNotes({ history, search }) {
  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);
  const { loading, error, notes } = noteList;

  // const filteredNotes = notes.filter((note) =>
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
    dispatch(listNotes());
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
      dispatch(deleteNoteAction(id));
    }
  };

  return (
    <MainScreen title={`Welcome Back ${userInfo && userInfo.name}..`}>
      {console.log(notes)}
      <Link to="/createnote">
        <Button>Create new Note</Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      <button onClick={handlePrint}>print</button>
      <table
        class="table"
        ref={componentRef}
        style={{ width: '100%', height: window.innerHeight }}
      >
        <caption>List of Notes</caption>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {notes &&
            notes
              .filter((filteredNote) =>
                filteredNote.title.toLowerCase().includes(search.toLowerCase())
              )
              .reverse()
              .map((note) => (
                <tr>
                  <td>{note.title}</td>
                  <td>
                    <Button href={`/note/${note._id}`}>Edit</Button>
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
    </MainScreen>
  );
}

export default MyNotes;
