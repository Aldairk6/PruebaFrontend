import { useState, useEffect } from "react"
import axiox from 'axios'
import {Col, Card, CardBody, CardFooter, CardImg, Badge } from 'reactstrap'
import { Link } from "react-router-dom"


const PokeCard = (params) => {
  const [pokemon, setPokemon] = useState([])
  const [image, setImage] = useState('')
  
  
  useEffect(()=>{
    getPokemon()
  },[])

  const getPokemon = async()=>{
    const url = params.poke.url 
    axiox.get(url).then(async(response) =>{
      const res = response.data
      setPokemon(res);

      if(res.sprites.other['official-artwork'].front_default != null){
        setImage(res.sprites.other['official-artwork'].front_default)
      }else {
        setImage(res.sprites.other.dream_world.front_default)   
      }
    })
  }


  return (
    <Col sm='4' lg='3' className="mb-4">
      <Card className="shadow border-4 border-warning">
        <CardImg src={image} height='200' className="p-2"/>
        <CardBody className="text-center">
          <Badge pill color='danger'> N° {pokemon.id} </Badge>
          <label className="fs-4 text-capitalize">{pokemon.name}</label>
        </CardBody>
        <CardFooter className="bg-warning">
          <Link to= {'/pokemon/' + pokemon.name} className="btn btn-dark">
            <i className="fa-solid fa-arrow-up-right-from-square"></i>  Detalles
          </Link>
        </CardFooter>
      </Card>
    </Col>
  )
}

export default PokeCard