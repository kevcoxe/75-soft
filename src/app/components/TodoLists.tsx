import Todo from "./Todo"

export default async function TodoLists({ todos }: { todos: Todo[]}) {

  const finishedTodoList = todos?.filter(({ is_complete }) => is_complete).map((todo: Todo, i) => {
    return (
      <Todo key={i} todo={todo} />
    )
  })

  const todoList = todos?.filter(({ is_complete }) => !is_complete).map((todo: Todo, i) => {
    return (
      <Todo key={i} todo={todo} />
    )
  })

  return (
    <>
      { todoList?.length !== 0 && (
        <div className='mx-4'>
          <h1 className='font-extrabold underline'>Todos: </h1>
          { todoList }
        </div>
      )}

      { todos?.length !== 0 && todoList?.length === 0 && (
        <h1>Congrats on finishing the day!</h1>
      )}

      { finishedTodoList?.length !== 0 && (
        <div className='mx-4'>
          <h1 className='font-extrabold underline'>Finished Todos: </h1>
          { finishedTodoList }
        </div>
      )}
    </>
  )
}