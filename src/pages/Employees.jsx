import Loader from "../components/Loader";
import Sidebar from "../components/sidebar/Sidebar"
import Error from "../components/Error";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
import { useNavigate } from "react-router-dom";

function Employees () {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [hamburgerIcon, setHamburgerIcon] = useState(true);
  const [employees,setEmployees] = useState([]);
  const [page , setPage] = useState(1);
  const [totalPages , setTotalPages] = useState(1);
  let orderNumber = 1;

  const navigate = useNavigate();

  const deleteClickHandler = async (userId) => {
        try{
          setLoader(true);
          setError("");
          alert("Do you want to delete?");
          await axios.delete(`${SERVER_URL}/api/users/${userId}` , {withCredentials:true});



          setEmployees((prev)=>{ return prev.filter(
            (employee) => employee._id != userId)
          })

        }
        catch(err){
          console.log(err);
          setError(err.response.data.message);
        }finally{
          setLoader(false)
        }
  }

  useEffect(()=>{
        
        const fetchEmployees = async () => {
          setLoader(true);
          setError("")
        try{
        const employees = await axios.get(`${SERVER_URL}/api/users?page=${page}`,{withCredentials: true,})
            
            setEmployees(employees.data.data);
            setTotalPages(employees.data.totalPages)
            setLoader(false)

    }catch(err){
        console.log(err);
       setError(err.response?.data?.message || "Something went wrong");


       
           
    }finally{
        setLoader(false);
    }
    }
    fetchEmployees();

  },[page])
    
   

      
  
    
    

  return (
    <div className="w-screen h-screen  overflow-hidden">
      {error && <Error error={error}  setError = {setError} />}
      {loader && <Loader />}
      { (
        <div className="flex">
          <Sidebar hamburgerIcon={hamburgerIcon} />
          <div className="w-full">
            <Header
              hamburgerIcon={hamburgerIcon}
              setHamburgerIcon={setHamburgerIcon}
            />
            <div className="bg-gray-50 h-full p-4 mt-1">
              <h1 className="text-xl font-semibold">My Leaves</h1>
              <div className="bg-white p-5 w-9/10 mx-auto mt-5 rounded-2xl border border-gray-200">
                <table className="w-full">
                  <thead className="text-left ">
                    <tr className="border-b border-gray-100 [&>th]:px-5 [&>th]:py-2">
                      <th className="w-1/12 ">No.</th>
                      <th className="w-1/6">First Name</th>
                      <th className="w-1/6">Last Name</th>
                      <th className="w-1/4">Email</th>
                      <th className="w-1/6 text-right">Delete</th>
                      <th className="w-1/6 text-left">Edit</th>
                    </tr>
                  </thead>
                  <tbody className="text-left">
                    {employees.map((employee ) => {
                      
                      return (
                        <tr className="border-b border-gray-100 [&>td]:px-5 [&>td]:py-2" key={employee._id} >
                          <td>{orderNumber++}</td>
                          <td className="py-1 capitalize">
                            {employee.firstname}
                          </td>
                          <td className="capitalize">
                            {employee.lastname}
                          </td>
                          <td>
                            {employee.email}
                          </td>
                          <td className=" capitalize text-right"><button onClick={()=> deleteClickHandler(employee._id)} className="text-blue-400 cursor-pointer px-1">Delete</button></td>
                          <td className=" capitalize text-left"><button className="text-blue-400 cursor-pointer px-1" onClick={()=>navigate(`/edit-employee/${employee._id}`)}>Edit</button></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="flex justify-end pt-5 pr-27">
                  <button
                    disabled={page === 1}
                    onClick={() => {
                      setPage((prev) => prev - 1);
                    }}
                    className="text-blue-400 cursor-pointer px-1"
                  >
                    Prev
                  </button>
                  <span className="px-1"> {`<${page}`} </span> of{" "}
                  <span className="px-1"> {`${totalPages}>`}</span>
                  <button
                    disabled={page === totalPages}
                    onClick={() => {
                      setPage((prev) => prev + 1);
                    }}
                    className="text-blue-400 cursor-pointer px-1"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default Employees;