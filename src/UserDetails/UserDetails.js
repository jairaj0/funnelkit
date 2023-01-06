import React,{useEffect , useState} from 'react';
import './UserDetails.scss';
import {IoArrowBack} from 'react-icons/io5'

const UserDetails = ({persons}) => {
const [user, setUser] = useState();
const [address, setAddress] = useState();
const [company, setCompany] = useState();
const [udetails, setUdetails] = useState();


useEffect(() => {
if(user){
  const address = [];
  const company = [];
  const udetails=[]
  for (const key of Object.keys(user)) {
    if(key === "address"){
        for (const _key of Object.keys(user[key])) {
          // if(_key !== "geo"){
            address.push([_key ,user[key][_key]])
          // }
        }
    }else if(key === "company"){
      for (const _key of Object.keys(user[key])) {
        company.push([_key ,user[key][_key]])
      }
    }else{
      if(key !== "like" && key !== "image" && key !== "id"){
        udetails.push([key , user[key]])
      }
    }
  }
  setAddress(address)
  setCompany(company)
  setUdetails(udetails)
  console.log(address , company , udetails)
}
}, [user])
    useEffect(() => {
        const username = window.location.pathname.split("/")[2];
      persons.map(value => {
        if(value.username === username){
            setUser(value)
        }
      })
    }, [persons])
  return (
    <>
    <a className='back flex-center' href="/"><IoArrowBack /></a>
      {user && <div className='ud flex-center column'>
    <img width={200} src={user.image} alt={user.name} />
    <h1>{user.name}</h1>
    <div className="details flex-between">
    <div className="box">
      {udetails?.map((value , i)=> <div key={i} className="row flex">
        <h3>{value[0].toUpperCase()} : </h3>
        <h4>{value[1]}</h4>
      </div>)}
    </div>
    <div className="box">
      {address?.map((value , i)=> value[0]==="geo" ? <div key={i} className="row flex">
        <h3>{value[0].toUpperCase()} : </h3>
        <h4>Lat : {value[1].lat} , Lng : {value[1].lng}</h4>
      </div> : <div key={i} className="row flex">
        <h3>{value[0].toUpperCase()} : </h3>
        <h4>{value[1]}</h4>
      </div>)}
    </div>
    <div className="box comp">
      {company?.map((value , i)=> <div key={i} className="row flex">
        <h3>{value[0].toUpperCase()} : </h3>
        <h4>{value[1]}</h4>
      </div>)}
    </div>
    </div>
    </div>}
    </>
  )
}

export default UserDetails