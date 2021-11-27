import React, { useState, useRef } from "react";
import { makeStyles } from "@mui/styles";
import ReactPaginate from "react-paginate";
import JSONDATA from "../../bd.json";
const useStyles = makeStyles((theme) => ({
  containerText: {
    borderBottom: "1px solid black",
    width: "177px",
  },
  textTitle: {
    marginLeft: "25px",
  },
  todoContainer: {
    margin: "50px 500px",
  },
  todolist: {
    display: "flex",
    height: "70px",
    borderBottom: "1px solid black",
    width: "177px",
  },
  title: {
    width: "177px",
    height: "40px",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  text: {
    justifyItems: "center",
    margin: "15px 75px",
  },
  container: {
    display: "flex",
  },
  delete: {
    height: "70px",
  },
  submit: {
    height: "70px",
  },
  edit: {
    height: "70px",
  },

  paginationBttn: {
    width: "80%",
    height: "40px",
    listStyle: "none",
    display: "flex",
  },

  previousBttn: {
    margin: "10px",
    cursor: "pointer",
  },
  nextBttn: {
    margin: "10px",
    cursor: "pointer",
  },
}));

export default function ToDoForm(props) {
  const classes = useStyles();
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [todoEdit, setTodoEdit] = React.useState(null);
  const [todoEdittex, setTodoEdittex] = React.useState("");
  const [pagenumber, setPagenumber] = useState(0);
  const [search, setSearch] = useState("");

  const inputRef = useRef();
  const userPerPage = 3;
  const pageVisited = pagenumber * userPerPage;

  React.useEffect(() => {
    const tamp = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(tamp);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  React.useEffect(() => {
    const tamp = JSON.stringify(todos);
    localStorage.setItem("todos", tamp);
  }, [todos]);

  const displayUser = todos
    .slice(pageVisited, pageVisited + userPerPage)
    .map((todo) => {
      return (
        <div className={classes.container}>
          <div className={classes.todolist} key={todo.id}>
            {todoEdit === todo.id ? (
              <input
                type="text"
                onChange={(e) => setTodoEdittex(e.target.value)}
                value={todoEdittex}
              />
            ) : (
              <div className={classes.text}>{todo.text}</div>
            )}
          </div>
          <div>
            <button
              className={classes.delete}
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>

            {todoEdit === todo.id ? (
              <button
                className={classes.submit}
                onClick={() => editTodo(todo.id)}
              >
                Submit
              </button>
            ) : (
              <button
                className={classes.edit}
                onClick={() => setTodoEdit(todo.id)}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      );
    });
  const pageCount = Math.ceil(todos.length / userPerPage);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      id: new Date().getTime(),
      text: todo,
    };

    setTodos([...todos].concat(newTodo));
    setTodo("");
    inputRef.current.focus();
  };
  const deleteTodo = (id) => {
    const updateTodo = [...todos].filter((todo) => todo.id !== id);
    setTodos(updateTodo);
  };

  const editTodo = (id) => {
    const updateTodo = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = todoEdittex;
      }
      return todo;
    });
    setTodos(updateTodo);
    setTodoEdit(null);
    setTodoEdittex("");
  };
  const changePage = ({ selected }) => {
    setPagenumber(selected);
  };

  return (
    <div className={classes.todoContainer}>
      <h1 className={classes.textTitle}>ToDoList</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
          ref={inputRef}
          type="text"
        />
        <button type="submit">Add</button>
      </form>
      <div>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        {JSONDATA.filter((val) => {
          console.log(val);
          if (search === "") {
            return val;
          } else if (val.title.toLowerCase().includes(search.toLowerCase()))
            return val;
        }).map((val, key) => {
          return (
            <div className={classes.containerText} key={key}>
              <p className={classes.title}>{val.title}</p>
            </div>
          );
        })}
      </div>

      {displayUser}

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={classes.paginationBttn}
        previousLinkClassName={classes.previousBttn}
        nextLinkClassName={classes.nextBttn}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
}
