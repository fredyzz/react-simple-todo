import React, { useState } from 'react'
import shortId from 'shortid'

function App() {
	const [task, setTask] = useState('')
	const [taskList, setTaskList] = useState([])
	const [editMode, setEditMode] = useState(false)
	const [id, setId] = useState('')
	const [error, setError] = useState(null)

	const addTask = (e) => {
		e.preventDefault()
		if (!task.trim()) {
			setError('Escriba una tarea...')
			return
		}
		console.log(task)
		setTaskList([...taskList, { id: shortId.generate(), description: task }])
		setTask('')
		setError(null)
	}

	const deleteTask = (id) => {
		const filteredTasks = taskList.filter((task) => task.id !== id)
		setTaskList(filteredTasks)
	}

	const enterEditMode = (task) => {
		console.log(task)
		setEditMode(true)
		setTask(task.description)
		setId(task.id)
	}

	const editTask = (e) => {
		e.preventDefault()
		if (!task.trim()) {
			return
		}
		const editedTasks = taskList.map((item) =>
			item.id === id ? { id, description: task } : item
		)
		setTaskList(editedTasks)
		setEditMode(false)
		setTask('')
		setId('')
		setError(null)
	}

	return (
		<div className="container mt-5">
			<h1 className="text-center">Simple To Do</h1>
			<hr />
			<div className="row">
				<div className="col-8">
					<h4 className="text-center">Lista de tareas</h4>
					<ul className="list-group">
						{taskList.length === 0 ? (
							<li className="list-group-item">No hay tareas</li>
						) : (
							taskList.map((task) => (
								<li className="list-group-item" key={task.id}>
									<span className="lead">{task.description}</span>
									<button
										onClick={() => deleteTask(task.id)}
										className="btn btn-danger btn-sm float-right mx-2"
									>
										Eliminar
									</button>
									<button
										onClick={() => enterEditMode(task)}
										className="btn btn-warning btn-sm float-right mx-2"
									>
										Editar
									</button>
								</li>
							))
						)}
					</ul>
				</div>
				<div className="col-4">
					<h4 className="text-center">
						{editMode ? 'Editar tarea' : 'Agregar tarea'}
					</h4>
					<form onSubmit={editMode ? editTask : addTask}>
						{error && <span className="text-danger">{error}</span>}
						<input
							type="text"
							className="form-control mb-2"
							placeholder="Ingrese tarea"
							onChange={(e) => setTask(e.target.value)}
							value={task}
						/>

						{editMode ? (
							<button className="btn btn-warning btn-block" type="submit">
								Editar
							</button>
						) : (
							<button className="btn btn-dark btn-block" type="submit">
								Agregar
							</button>
						)}
					</form>
				</div>
			</div>
		</div>
	)
}

export default App
