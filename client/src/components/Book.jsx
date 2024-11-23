import React, {useState} from 'react';
import axios from 'axios';
import { useEffect } from "react";
const Book = () => {


  const [listOfServices, setListOfServices] = useState([]);

  useEffect(() =>
    {
      axios.get("http://localhost:3002/Services").then((response) =>
      {
        console.log(response);
        setListOfServices(response.data);
      });
  
    },[])

  return (
    <div className='Book'>
      <div className='booksService'>
      {listOfServices.map((value,key) =>
      {
        return <button> {value.title} </button>
      }
      )}
      </div>
    </div>
  )
}

export default Book