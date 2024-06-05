"use client";

import { useState, useEffect } from "react";
import Modal from "./Modal";
import axios from "axios";
import { useRouter } from 'next/navigation' 
import Dropzone from './Dropzone'



const AddPost = () => {
 
  const { push } = useRouter();
  const [modalOpen, setModalOpen] = useState(false); 
  const [inputs, setInputs] = useState({}); 
  const [active, setActive] = useState(false)
  const [firstSelectValue, setFirstSelectValue] = useState('');  
  const [imgs, setImgs] = useState([''])
 


 

 
 


 


  useEffect(() => {
    setInputs((prevState) => ({ ...prevState, category: "" + firstSelectValue, img: imgs }));
  }, [firstSelectValue, imgs ])


   
 

 

  const handleSubmit = (e) => {
    e.preventDefault(); 

    if (e.target.category.value == "0") {
      alert("Please select a category");
    } 
    else if (imgs.includes("")) {
      alert("Please select item image");
    }
    else {
      setActive(true)
      axios
        .post("/api/posts", inputs)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err.response.data);
        })
        .finally(() => {
          setInputs({});
          setModalOpen(false); 
          setActive(false)
          window.location.replace("/dashboard");
        });
    }
  };

  const handleChange = (e) => { 
    const name = e.target.name;
    const value = e.target.value;
    setInputs((prevState) => ({ ...prevState, [name]: value, img: localStorage.getItem("sharedValue") }));
  };






  const handleFirstSelectChange = (event) => {
    const selectedValue = event.target.value;
    setFirstSelectValue(selectedValue); 
  };

 

  const handleImgChange = (url) => {
    if (url) { 
      setImgs(url); 
    }
  }



 





  return (
    <div>
     
      <button
        onClick={() => setModalOpen(true)}
        className="text-white p-3 cursor-pointer"
        style={{ background: "#ab695d" }}
      >
        Add New Item
      </button>

      <button
        onClick={() => push("/reservation")}
        className="text-white p-3 cursor-pointer"
        style={{ marginLeft: "1em", background: "#ab695d" }}
      >
        View Orders
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
 
          <form className="w-full mt-3" onSubmit={handleSubmit}>

            <input
              type="text"
              placeholder="Title"
              name="title"
              className="w-full p-2"
              value={inputs.title || ""}
              onChange={handleChange}
              required
            />

            <textarea
              placeholder="Description"
              name="description"
              className="w-full p-2 my-3"
              value={inputs.description || ""}
              onChange={handleChange}
              required
            /> 



            <select name="category" value={firstSelectValue} onChange={handleFirstSelectChange} style={{ width: "100%", height: "40px" }}  >
            <option value="0" selected>--Choose Category--</option>
              <option value="Sermon">Sermon</option>
              <option value="Friday Sermon">Friday Sermon</option>
              <option value="Mourning">Mourning </option>
            </select>

            <br />


 


            <Dropzone HandleImagesChange={handleImgChange} className='mt-10 border border-neutral-200 p-16'  />


            <style
  dangerouslySetInnerHTML={{
    __html:
      "\n.uploadcare--widget__button_type_open { \n    background-color: #ab695d !important;\n}\n"
  }}
/> 

<style
  dangerouslySetInnerHTML={{
    __html:
      "   \n\n.uploadcare--button_size_big { \n    background-color: #ab695d !important;\n}\n"
  }}
/>



            <button type="submit" className="px-5 py-2 mt-3" style={{ background: "#ab695d" }} disabled={active}>
              Submit
            </button>
          </form> 
      </Modal>
    </div>
  );
};

export default AddPost;
