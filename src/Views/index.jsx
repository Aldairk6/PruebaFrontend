import {Container,Row,Col,InputGroup,InputGroupText,Input} from 'reactstrap'
import axios from 'axios'
import { useEffect, useState } from 'react'
import PokeCard from '../Components/PokeCard'
import { PaginationControl } from 'react-bootstrap-pagination-control'

const Index = () => {

  const [pokemons, setPokemons] = useState([])
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(50)
  const [allPokemons, setAllPokemons] = useState([])
  const [list, setList] = useState([])
  const [filter, setFilter] = useState('')
  const [total, setTotal] = useState(0)

  useEffect(()=>{
    getPokemons(offset)
    getAllPokemons()  
  },[])
  
  useEffect(()=>{
    if (filter == ''){
      setList(pokemons)
    }
    
  }, [filter, pokemons])

  const getPokemons = async(o) =>{
   const url = `http://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${o}`
   axios.get(url).then(async(response) =>{
    const res = response.data
    setPokemons(res.results)
    setLimit(res.results)
    setTotal(res.count) 
   })
  }
  
  const getAllPokemons = async() =>{
    const url = `http://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`
    axios.get(url).then(async(response) =>{
      const res = response.data
      setAllPokemons(res.results)
    })
   }

   const search = async(e) =>{
    if(e.keyCode == 13){
      if(filter.trim() != ''){
        setList([])
        setTimeout(()=>{
          setList(allPokemons.filter(p => p.name.includes(filter)))
        },100)
      }
    } else if (filter.trim() == ''){
      setList([])
      setTimeout(() =>{
        setList(pokemons)
      },100)
    }
  }

  const goPage = async(p) =>{
    setList([])
    await getPokemons((p==1) ?0 : ((p-1)*50))
    setOffset(p)
  }
  return (
    <Container className='mt-3'>
      <Row>
        <Col>
          <InputGroup className='mt-3 mb-3'>
           <InputGroupText><i className='fa-solid fa-search'></i></InputGroupText>
           <Input value={filter} onChange={(e) =>(setFilter(e.target.value))} 
           onKeyUpCapture={search} placeholder='Buscar Pokemon'></Input>
          </InputGroup>
        </Col>
      </Row>
      <Row className='mt-3'>
        {list.map((pok, i)=>(
          <PokeCard poke={pok} key={i}/>
        ))}
        {list.length == 0 ? <Col className='text-center fs-2 mb-3'>No hay Coincidencias</Col>:''}   
        <PaginationControl last={true} limit={limit} total={total} page={offset} changePage={page => goPage(page)}/>
      </Row>
    </Container>
  )
}

export default Index