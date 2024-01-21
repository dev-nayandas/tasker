import { useState } from "react";
import SearchTask from "./SearchTask";
import TaskAction from "./TaskAction";
import TaskList from "./TaskList";
import AddTaskModal from "./AddTaskModal";
import NoTaskFound from "./NoTaskFound";

export default function TaskBoard() {
    const defaultTask = {
        id: crypto.randomUUID(),
        title: "Learn React Native",
        description:
            "I want to Learn React such thanI can treat it like my slave and make it do whatever I want to do.",
        tags: ["web", "react", "c++"],
        priority: "Low",
        isFavorite: false,
    };
    const [tasks, setTasks] = useState([defaultTask]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [taskToUpdate, setTaskToUpdate] = useState(null);

  function handleAddEditTask(newTask, isAdd){
    
    if(isAdd){
        setTasks([...tasks, newTask])
    }else{
        setTasks(
            tasks.map((task) =>{
                if(newTask.id === task.id){
                    return newTask
                }else{
                    return task
                }
            })
        )
    }
    
    setShowAddModal(false);

  }
  function handleEditTask(task){
    setTaskToUpdate(task);
    setShowAddModal(true);
  }

  function handleDeleteTask(taskId){
    const taskAfterDelete = tasks.filter(task=>task.id !== taskId)
    setTasks(taskAfterDelete)
  }


  function handleCloseClick(){
    setShowAddModal(false);
    setTaskToUpdate(null);
  }
  function handleDeleteAll(){
    tasks.length = 0;
    setTasks([...tasks]);
  }

  function handleFavourite(taskId){
    
    const taskIndex = tasks.findIndex( task => task.id === taskId );
   
    const newTask = [...tasks];
    newTask[taskIndex].isFavorite = !newTask[taskIndex].isFavorite 
    setTasks(newTask)
  }

  function handleSearch(searchTerm){

    const filtered = tasks.filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()));
    setTasks([...filtered]);
  }
    return (
        <section className="mb-20" id="tasks">
            {showAddModal && <AddTaskModal onSave={handleAddEditTask} taskToUpdate={taskToUpdate} onCloseClick={handleCloseClick}/>}
            <div className="container">

                <div className="p-2 flex justify-end">
                    <SearchTask  onSearch={handleSearch}/>
                </div>

                <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">

                    <TaskAction onAddClick = {()=>setShowAddModal(true)} OnDeleteAll={handleDeleteAll}/>
                    {tasks.length > 0 ? 
                    
                        (
                            <TaskList
                     tasks={tasks }
                      onEdit={handleEditTask}
                       OnDelete={handleDeleteTask}
                        onFav={handleFavourite} />
                        ) : <NoTaskFound/>
                
                }
                    
                </div>
            </div>
        </section>
    );
}