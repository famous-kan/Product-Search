import { useState, useEffect } from 'react'

export default function App() {
const [phone,setPhone] = useState([])
const [search,setSearch] = useState('')
const [page,setPage] = useState(1)
const [total,setTotal] = useState(0)

const fetchData = async() =>{
const res = await fetch(`https://dummyjson.com/products/search?q=${search}&limit=10&skip=${page*10-10}`)
const result = await res.json()
console.log(result)
setPhone(result.products)
setTotal(result.total)

}

useEffect(()=>{
 setTimeout(()=>fetchData(),1000)
console.log(phone.products)
 return () => {
  clearTimeout()
 }
},[search , page])


function hdlClick(n) {
  if(page+n < 1) return
  if(page + n > Math.ceil(total/10)) return
  setPage(prev => prev+n)
}

// useEffect(()=>{
//   const fetchData = async() =>{
//     const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${page*10-10}`)
//     const result = await res.json()
//     console.log(result)
//     setPhone(result.products)}
// fetchData()
// },[page])


const hdlChange = async(e) => {
  console.log(e.target.value) 
  // const res = await fetch(`https://dummyjson.com/products/search?q=${e.target.value}`)
  // const result = await res.json()
  // console.log(result)
  // setPhone(result.products)
  setPage(1)
  setSearch(e.target.value)
}


  return (
    <div>
    <h1 className="text-3xl font-bold underline">
      Product Search</h1>

    <ul className='m-3'>
      <div className='flex gap-5'>
      <button onClick={()=>(hdlClick(-1))} className='border'>previous</button>
      <p>{page}</p>
      <button onClick={()=>(hdlClick(1))} className='border'>Next</button>
      </div>
      <p>Total Page: {Math.ceil(total/10)}</p>
      <form className='m-5'> Search:
      <input className='border' onChange={hdlChange} />
      </form>
      {phone.map((el) => (<li>{el.title} | {el.category} | {el.price} </li>))}
    </ul>

    </div>
  )
}



