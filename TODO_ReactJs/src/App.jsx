import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDown, faTrash, faPenToSquare, faClipboard } from "@fortawesome/free-solid-svg-icons";

export default function App() {
  const [val, setVal] = useState("");
  const [output, setOutput] = useState([]);
const[editIndex , seteditIndex]= useState(null);
const[edittxt , setedittxt] = useState('');

  function inputValue(e) {
    setVal(e.target.value);
  }

  function addTask() {
    if (val.trim() !== "") {
      setOutput([...output, val]); // Correct way to update the state
      setVal("");
    } else {
      alert("Please first fill the value");
    }
  }
  function deletetask(index){
    {/*You can also left the first icon empty  */}
let newTask = output.filter((output,i)=> i!==index);
setOutput(newTask);
  }


function IndexValue(index){
seteditIndex(index);
setedittxt(output[index]);
}
function updatedvalue(event)
{
    
        setedittxt(event.target.value);
   
   
}

function savetask(){




    const settask = output.map((value,index) =>
       
  index === editIndex ? edittxt :value
    );
    
    setOutput(settask);
    seteditIndex(null);
    setedittxt('');
}




  function enterkey(event){
if(event.key === "Enter")
{
    addTask();
}
  }

  return (
    <>
      {/* Heading Section */}
      <center>
        <div className="self-center mt-12 border p-12 rounded-lg shadow-2xl shadow-green-950 inline-block">
          <h1 className="uppercase font-extrabold text-5xl text-purple-600 drop-shadow bg-red-100 p-2">
            TODO List{" "}
            <FontAwesomeIcon
              icon={faClipboard}
              style={{ opacity: 0.5 }} // Correct way to use fade effect
            />
          </h1>
        </div>
      </center>

      {/* Input Section */}
      <div className="flex flex-row items-center justify-center mt-24">
        <input
          type="text"
          placeholder="Please Enter your task"
          className="border border-l border-y border-black p-6 text-2xl font-bold text-orange-600 rounded-l-lg"
          value={val}
          onChange={inputValue}
          onKeyDown={enterkey}
        />
        <FontAwesomeIcon
          className="border rounded-r-lg border-black p-6 text-3xl font-bold cursor-pointer"
          onClick={addTask}
          icon={faCircleDown}
        />
      </div>

      {/* Task List Section */}
      <div className="mt-12 flex flex-col justify-center items-center">
        <div className="border-2 border-black rounded-lg w-1/2">
          <h1 className="font-extrabold text-4xl text-amber-950 p-3 m-3">Your Task List</h1>
          <ul className="border mt-6">
            {output.map((item, index) => (
                 <div key={index} className="p-6 flex flex-row justify-between items-center border-b">
                {editIndex === index ?<>
<input
className="font-normal text-xl border border-black p-3"
value={edittxt}
onChange={updatedvalue}
 type="text" />
<div>
<button  
onClick={savetask}
 type="button" class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Save</button>
</div>
                </>:
                <>
                   <li className="font-normal text-xl">{item}</li>
              <div>
              <FontAwesomeIcon
                  className="cursor-pointer text-2xl ms-6 me-2 "
                  icon={faPenToSquare}
                  onClick={()=>IndexValue(index)}
                />
                <FontAwesomeIcon
                  className="cursor-pointer text-2xl ms-6 me-3 mt-3"
                  icon={faTrash}
                  onClick={()=>deletetask(index)}
                />
              </div></> }
             
             
              </div>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
