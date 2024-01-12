import { useState, useEffect } from 'react'
import { db, auth } from '../../firebaseConnection'
import { addDoc, collection, onSnapshot, query, orderBy, where, doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { signOut } from 'firebase/auth'
import './admin.css'


export default function Admin() {
    const [taskInput, setTaskInput] = useState('')
    const [user, setUser] = useState({})
    const [edit, setEdit] = useState({})

    const [taskList, setTaskList] = useState([])

    useEffect(() => {
        async function loadTasks() {
            const userDetail = localStorage.getItem('@detailUser')
            setUser(JSON.parse(userDetail))

            if (userDetail) {
                const data = JSON.parse(userDetail)
                const taskRef = collection(db, 'Tarefas')

                const q = query(taskRef, orderBy("created", 'desc'), where('userUid', '==', data?.uid))

                const unSub = onSnapshot(q, (snapshot) => {
                    const tasks = []
                    snapshot.forEach(doc => {
                        tasks.push({
                            id: doc.id,
                            task: doc.data().tarefa,
                            userUid: doc.data().userUid
                        })
                    })
                    setTaskList(tasks)
                })
            }
        }


        loadTasks()
    }, [])

    async function handleRegister(e) {
        e.preventDefault()

        if (!taskInput) {
            toast.error("Insira uma tarefa!")
            return;
        }

        if (edit?.id) {
            toast.success("Tarefa atualizada")
            handleUpdateTask()
            return
        }

        await addDoc(collection(db, 'Tarefas'), {
            tarefa: taskInput,
            created: new Date(),
            userUid: user?.uid
        })
            .then(() => {
                toast.success("Tarefa adicionada com sucesso!")
                setTaskInput('')
            }).catch(err => {
                toast.error("Algo deu errado...")
            })
    }

    async function handleLogout() {
        await signOut(auth);
    }

    async function deleteTask(id) {
        toast.success("Tarefa concluída!")
        const docRef = doc(db, 'Tarefas', id)
        await deleteDoc(docRef)
    }

    function editTask(item) {
        setTaskInput(item.task)
        setEdit(item)
    }

    async function handleUpdateTask() {
        const docRef = doc(db, 'Tarefas', edit?.id)
        await updateDoc(docRef, {
            tarefa: taskInput
        }).then(() => {
            console.log('Task updated')
            setTaskInput('')
            setEdit({})
        }).catch(() => {
            console.log('Something went wrong')
            setTaskInput('')
            setEdit({})
        })
    }

    return (
        <div className='admin-container'>
            <div className='user-container'>
                <div className='user-infos'>
                    <h2>User: <span>{user.email}</span></h2>
                </div>
                <hr />
            </div>
            <h1>Minhas tarefas</h1>

            <form onSubmit={handleRegister} className='form'>
                <input type='text' placeholder='Digite sua tarefa...' value={taskInput} onChange={(e) => { setTaskInput(e.target.value) }} />

                {Object.keys(edit).length > 0 ? (
                    <button className='btn-register' type='submit'>Atualizar tarefa</button>
                ) : (
                    <button className='btn-register' type='submit'>Adicionar tarefa</button>
                )}
            </form>

            <div className='list'>
                {taskList.map(task => {
                    return (
                        <div className='task-container' key={task.id}>
                            <p>{task.task}</p>
                            <div>
                                <button className='btn-edit' onClick={() => { editTask(task) }}>Editar</button>
                                <button className='btn-concluir' onClick={() => deleteTask(task.id)}>Concluir</button>
                            </div>
                        </div>
                    )
                })
                }
            </div>

            <button className='btn-logout' onClick={handleLogout}>Sair</button>
        </div>
    )

}