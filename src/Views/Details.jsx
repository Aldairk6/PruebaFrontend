import { useEffect,useState } from "react"
import {Link, useParams} from 'react-router-dom'
import {Container,Row,Col,Card,CardBody,CardText,Badge,Progress} from 'reactstrap'
import axiox from 'axios'

const Details = () => {

  const {id} = useParams()
  const [pokemon, setPokemon] = useState([])
  const [species, setSpecies] = useState([])
  const [habitat, setHabitat] = useState('Desconocido')
  const [description, setDescription] = useState([])
  const [image, setImage] = useState([])
  const [skills, setSkills] = useState([])
  const [stats, setStats] = useState([])
  const [types, setTypes] = useState([])

  useEffect(()=>{
    getPokemon()
  },[id])
  
  const getPokemon = async()=>{
    const url = 'https://pokeapi.co/api/v2/pokemon/'+id
    axiox.get(url).then(async (response)=>{
      const res = response.data
      setPokemon(res)
      if(res.sprites.other.dream_world.front_default){
        setImage(res.sprites.other.dream_world.front_default)   
      }else {
        setImage(res.sprites.other['official-artwork'].front_default)
      }
      await getSpecie(res.species.name)
      await getSkills(res.abilities)
      await getStats(res.stats)
      await getTypes(res.types)
    })
  }
  
  const getStats = async(sta) =>{
    let listStats = []
    sta.forEach((a) =>{
      axiox.get(a.stat.url).then(async(response) =>{
        listStats.push({'nombre':response.data.names[5].name,'valor':a.base_stat})
        setStats(listStats)
      })
    })
  }

  const getSkills = async(ski) =>{
    let listSkills = []
    ski.forEach((s) =>{
      axiox.get(s.ability.url).then(async(response) =>{
        listSkills.push(response.data.names[5].name)
        setSkills(listSkills)
      })
    })
  }

  const getTypes = async(typ) =>{
    let listTypes = []
    typ.forEach((t) =>{
      axiox.get(t.type.url).then(async(response) =>{
        listTypes.push(response.data.names[5].name)
        setTypes(listTypes)
      })
    })
  }

  const getSpecie = async(spe) =>{
    const url = 'https://pokeapi.co/api/v2/pokemon-species/'+ spe
    axiox.get(url).then(async (response)=>{
      const res = response.data    
      setSpecies(res.shape.name)
      if(res.habitat != null){
        await getHabitat(res.habitat.url)
      } 
      await getDescription(res.flavor_text_entries)  
      
    })
  }

  const getHabitat = async(hab) =>{
    axiox.get(hab).then(async(response) =>{
      setHabitat(response.data.names[1].name);
      
    })
  }
  const getDescription = async(desc) =>{
    let text = ''
    desc.forEach((d)=>{
      if(d.language.name == 'es'){
        text = d.flavor_text
      }
      if(text == '' && desc.length > 0){
        text = desc[0].flavor_text
      }
    })
    setDescription(text)
  }
  
   
  return ( 
    <>
    <Container className="mt-3">
      <Row>
        <Col>
         <Card className="shadow mt-3 mb-3">
          <CardBody className="mt-3">
            <Row>
             <Col className="text-end">
              <Link to='/' className="btn btn-warning">
               <i className="fa-solid fa-home"></i>  
              </Link> 
             </Col>
            </Row>
            <Row>
              <Col md='6'>
                <CardText className="h1 text-capitalize"> {pokemon.name}</CardText>
                <CardText className="fs-3">{description}</CardText>
                <CardText className="fs-3">
                  Altura:<b> {(pokemon.height)/10} m </b>
                  Peso:<b> {(pokemon.weight)/10} kg </b>
                </CardText>
                <CardText className="fs-5">
                  Tipo:
                  {types.map((typ, i) => (
                   <Badge pill className="me-1" color='danger' key={i}>
                    {typ}
                   </Badge>
                  ))}
                </CardText>
                <CardText className="fs-5">
                  Habilidades:
                  {skills.map((ski, i) => (
                   <Badge pill className="me-1" color='dark' key={i}>
                    {ski}
                   </Badge>
                  ))}
                </CardText>
                <CardText className="fs-5 text-capitalize">
                  Habitat: <b>{habitat}</b>
                </CardText>
                <CardText className="fs-5 text-capitalize">
                  Especie: <b>{species}</b>
                </CardText>
                <CardText className="fs-5 text-capitalize">
                </CardText>
              </Col>
              <Col md='6'>
                <img src={image} className="img-fluid"></img>
              </Col>
              <Col md='12 mt-3'>
                <CardText className="fs-4 text-center"><b>Estadisticas</b></CardText>
              {stats.map((sta,i) =>(
                <Row key={i}>
                 <Col xs='6' md='3'><b>{sta.nombre}</b></Col>
                 <Col xs='6' md='9'>
                  <Progress value={sta.valor}>{sta.valor}</Progress>
                 </Col>
                </Row>
              ))}
              </Col>
            </Row>
          </CardBody>
         </Card>
        </Col>
      </Row>
    </Container>
   </>
  )
}

export default Details