import React, {useState, useCallback, useEffect} from 'react';
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa';
import {Container, Form, SubmitButton, List, DeleteButton} from './style';
import { Link } from 'react-router-dom';

import api from '../../services/api';

export default function Main(){

  const [newRepo, setNewRepo] = useState('');
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert ] = useState(null);

  // Esse useEffect fica como se fosse o component did mount porque não tem referencia dentro do array
  useEffect(()=>{
    const repoLocalGet = localStorage.getItem('repoLocal');
    if(repoLocalGet){
      setRepositorios(JSON.parse(repoLocalGet));
    }
  },[])

  // quando a gente passa o item no useeffet que estamos alterando, esse useeffet se torna um didupdate
  useEffect(()=>{
    localStorage.setItem('repoLocal', JSON.stringify(repositorios));
  },[repositorios])

  const handleSubmit = useCallback((e)=>{
    e.preventDefault();
    async function submit(){
      setLoading(true);
      setAlert(null);
      try
      {
        if(newRepo === ''){
          throw new Error('Você precisa indicar um repositório')
        }
        const hasRepo = repositorios.find(repo => repo.name === newRepo);
        if(hasRepo){
          throw new Error('Repositório já existe');
        }
        const response = await api.get(`repos/${newRepo}`);
        const data = {
          name: response.data.full_name,
        }
        setRepositorios([...repositorios, data]);
        setNewRepo('');
      }
      catch(error)
      {
        setAlert(true)
        console.log(error);
      }
      finally
      {
        setLoading(false);
      }
    }
    submit();
  },[newRepo, repositorios]);

  function handleinputChange(e){
    setNewRepo(e.target.value);
    setAlert(null);
  }

  const handleDelete = useCallback((repo) => {
    const find = repositorios.filter( r => r.name !== repo);
    setRepositorios(find);
  }, [repositorios])

  useEffect(()=>{
    if(alert === true){
      setTimeout(function(){
        setAlert(null)
      },2000)
    }
  },[alert])


  return(
    <Container>
      
      <h1>
        <FaGithub size={25}/>
        Meus Repositorios
      </h1>

      <Form onSubmit={handleSubmit} error={alert}>
        <fieldset>
        <input 
        type="text" 
        placeholder="Adicionar Repositorios"
        value={newRepo}
        onChange={handleinputChange}
        />
         {alert && <span className='erro'>Repositório já existe...</span>}
        </fieldset>

        <SubmitButton loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner color="#FFF" size={14}/>
          ) : (
            <FaPlus color="#FFF" size={14}/>
          )}
        </SubmitButton>

      </Form>

      <List>
        {repositorios.map( repo => (
          <li key={repo.name}>
            <span>
              <DeleteButton onClick={()=> handleDelete(repo.name)}><FaTrash size={14}/></DeleteButton>
              {repo.name}
            </span>
            <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}><FaBars size={20}/></Link>
          </li>
        ) )}
      </List>

    </Container>
  )
}