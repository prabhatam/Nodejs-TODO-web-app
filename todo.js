const fs = require("fs");
const filepath= "./tasks.json";

// synchronous : do the job first then will further
// asynchronous : move further, job will be done in background

// now lets create all the functions required

// used to load the tasks/data from the filepath
const loadTasks = () => {
    try {
        const dataBuffer = fs.readFileSync(filepath);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (error) {
        return []; // return empty array
    }
};

// create a function to save the task
const saveTasks = (tasks) => {
    // we need to write into file and how to do that
    const dataJSON = JSON.stringify(tasks)
    fs.writeFileSync(filepath, dataJSON);
};

// creating function to add a task
const addTask = (task) => {
    const tasks = loadTasks();
    tasks.push({task});
    saveTasks(tasks);
    console.log("Task added", task);
};

// creating a function to list tasks
const listTasks = ()=>{
    const tasks = loadTasks();
    tasks.forEach((task,index) => {
        console.log(`${index+1} - ${task.task}`);
    })
}

// function to remove a task
const removeTask = (index) => {
    const tasks = loadTasks();
    if (index >= 1 && index <= tasks.length) {
        const removed = tasks.splice(index - 1, 1); // Correctly remove the task
        saveTasks(tasks);
        console.log("Removed:", removed[0].task);
    } else {
        console.log("Invalid task index.");
    }
};





// how to grab the incoming commands 
// by using process and learn more to know in detail
const command = process.argv[2]
// 2 recongnizes the command 
const argument = process.argv[3]
// 3 recongnizes the argument



// structuring the work like at what command what to do
if(command === "add"){
    addTask(argument);
} else if(command === "list"){
    listTasks();
} else if(command === "remove"){
    removeTask(parseInt(argument));
} else{
    console.log("command not found !");
}