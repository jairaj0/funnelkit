import React,{useEffect , useState} from 'react';
import {useDispatch} from 'react-redux';
import {editedPersons ,} from '../personState';
import {GrMail} from 'react-icons/gr'
import {AiOutlineGlobal , AiOutlineClose} from 'react-icons/ai'
import {BsFillPhoneFill} from 'react-icons/bs';
import {FcLikePlaceholder , FcLike} from 'react-icons/fc';
import {RiDeleteBin5Fill} from 'react-icons/ri';
import {FiEdit} from 'react-icons/fi';
import './Home.scss';

const EditForm = ({data , func , edit}) => {
  const [formData, setFormData] = useState({
    name : "",
    email : "",
    phone : "",
    website : "",
  });

  const formDataHandler = (key, value) => {
    let change = formData;
    change[key] = value;
    setFormData({ ...change });
  };

  const submitHandler = () => {
    edit(data.username , 'form', formData)
    func(false)
  }


  useEffect(() => {
    setFormData({
      name : data.name,
      email : data.email,
      phone : data.phone,
      website : data.website,
    })
  }, [data])

  return(
    <div className='form flex-center'>
    <div onClick={()=>func(false)} className="closer"></div>
    <form>
    <nav className='flex-between'><h2>Personal Details</h2> <button onClick={()=>func(false)}  type="button"><AiOutlineClose/></button></nav>
    <div className="editboxes">
    <div className="row">
      <h3><span>*</span> Name :</h3>
      <input value={formData.name} onChange={(e)=>formDataHandler("name" , e.target.value)} type="text"/>
    </div>
    <div className="row">
      <h3><span>*</span> Email :</h3>
      <input value={formData ? formData.email : ""} onChange={(e)=>formDataHandler("email" , e.target.value)} type="text" />
    </div>
    <div className="row">
      <h3><span>*</span> Phone :</h3>
      <input value={formData ? formData.phone : ""} onChange={(e)=>formDataHandler("phone" , e.target.value)} type="text" />
    </div>
    <div className="row">
      <h3><span>*</span> Website :</h3>
      <input value={formData ? formData.website : ""} onChange={(e)=>formDataHandler("website" , e.target.value)} type="text" />
    </div>
    </div>
    <div className="sandc flex-between">
      <div></div>
      <div className='flex-center'>
        <button type='button' onClick={()=>func(false)} >Cancel</button>
        <button type='button' onClick={submitHandler}>Save</button>
      </div>
    </div>
    </form>
    </div>
  )
}

const Home = ({persons}) => {
  const [editForm, setEditForm] = useState();
  const dispatch = useDispatch();

  const editHandler = (username , type , _formData) => {
    const newArray = [];
    if(type==="delete"){
      persons.map(value => {
      if(value.username !== username){
        newArray.push(value)
      }
      })
      dispatch(editedPersons(newArray))
    }

    if(type === 'like'){
      persons.map(value => {
        if(value.username === username){
          let _value = {...value};
          _value.like = _value.like ? false : true;
          newArray.push(_value)
        }else{
          newArray.push(value)
        }
        })
        dispatch(editedPersons(newArray))
    }

    if(type === 'form'){
      persons.map(value => {
        if(value.username === username){
          newArray.push({...value , ..._formData})
        }else{
          newArray.push(value)
        }
        })
        dispatch(editedPersons(newArray))
    }
  }

  return (
    <div className="boxes">
      {editForm && <EditForm data={editForm} func={setEditForm} edit={editHandler} />}
      {persons?.map((value , i) => <div  key={i} className='box flex-center column'>
      <div className="top_options flex-between">
        <button onClick={() => editHandler(value.username , "like")} type='button' className='flex-center'>{value.like ? <FcLike /> : <FcLikePlaceholder />}</button>
        <button onClick={() => setEditForm(value)} type='button' className='flex-center'><FiEdit /></button>
      </div>
      <img src={value.image} alt={`person ${i}`} />
      <div className="infos flex-start column">
      <h4 onClick={()=>window.location.href=`/users/${value.username}`}>{value.name}</h4>
      <p className='flex-center'><span className='flex-center'><GrMail /></span>{value.email}</p>
      <p className='flex-center'><span className='flex-center'><BsFillPhoneFill /></span>{value.phone}</p>
      <p className='flex-center'><span className='flex-center'><AiOutlineGlobal /></span>{value.website}</p>
      </div>
      <div className="bottom_options flex-between">
        <div></div>
        <button onClick={() => editHandler(value.username , "delete")} type='button' className='flex-center'><RiDeleteBin5Fill /></button>
      </div>
      
      </div>)}
    </div>
  )
}

export default Home