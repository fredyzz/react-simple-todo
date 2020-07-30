import React, { useState } from 'react'
import shortId from 'shortid'

function App() {
	const [task, setTask] = useState('')
	const [taskList, setTaskList] = useState([])

	const addTask = (e) => {
		e.preventDefault()
		if (!task.trim()) {
			console.log('Elemento vacio')
		}
		console.log(task)
		setTaskList([...taskList, { id: shortId.generate(), description: task }])
		setTask('')
	}

	const deleteTask = (id) => {
		//console.log(id)
		const filteredTasks = taskList.filter((task) => task.id !== id)
		setTaskList(filteredTasks)
	}

	return (
		<div className="container mt-5">
			<h1 className="text-center">Simple To Do</h1>
			<hr />
			<div className="row">
				<div className="col-8">
					<h4 className="text-center">Lista de tareas</h4>
					<ul className="list-group">
						{taskList.map((task) => (
							<li className="list-group-item" key={task.id}>
								<span className="lead">{task.description}</span>
								<button
									onClick={() => deleteTask(task.id)}
									className="btn btn-danger btn-sm float-right mx-2"
								>
									Eliminar
								</button>
								<button className="btn btn-warning btn-sm float-right mx-2">
									Editar
								</button>
							</li>
						))}
					</ul>
				</div>
				<div className="col-4">
					<h4 className="text-center">Formulario</h4>
					<form onSubmit={addTask}>
						<input
							type="text"
							className="form-control mb-2"
							placeholder="Ingrese tarea"
							onChange={(e) => setTask(e.target.value)}
							value={task}
						/>
						<button className="btn btn-dark btn-block" type="submit">
							Agregar
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default App
