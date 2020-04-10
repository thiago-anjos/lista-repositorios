import React, { useEffect, useState } from 'react';
import {Container, Owner , Loading, BackButton, PageActions, ListStates} from './style';
import api from '../../services/api'
import {FaArrowLeft} from 'react-icons/fa'

export default function Repositorio({match}){

    const [repositorio, setRepositorio] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [filters, setFilter] = useState([
        {state: 'all', label: 'Todas', active: true},
        {state: 'open', label: 'Abertas', active: false},
        {state: 'closed', label: 'Fechadas', active: false}
    ])

    const [filterIndex, setFilterIndex] = useState(0);

    useEffect(()=>{
        async function load(){
            const nomeRepo = decodeURIComponent(match.params.repositorio);
            const [repositorioData, issuesData] = await Promise.all([
                api.get(`/repos/${nomeRepo}`),
                api.get(`/repos/${nomeRepo}/issues`,{
                    // o axios deixa passar o params dessa forma
                    params:{
                        state: 'open',
                        per_page: 5
                    }
                })
            ])
            setRepositorio(repositorioData.data);
            setIssues(issuesData.data);
            setLoading(false);
        }
        load();
    },[match.params.repositorio])

    useEffect(()=>{

        async function loadIssue(){
            const nomeRepo = decodeURIComponent(match.params.repositorio);
            const response = await api.get(`/repos/${nomeRepo}/issues`,{
                // o axios deixa passar o params dessa forma
                params:{
                    state: filters[filterIndex].state,
                    page: page,
                    per_page: 5
                }
            })
            setIssues(response.data);
        }

        loadIssue();

    }, [match.params.repositorio, page, filters, filterIndex])

    function handlePage(action){
        setPage( action === 'back' ? page -1 : page + 1)
    }


    async function loadOption(index){
        setFilterIndex(index);
    }


    if(loading){
        return(
            <Loading>Carregando...</Loading>
        )
    }

    return(
        <Container>
            <BackButton to='/'><FaArrowLeft size={30}/></BackButton>
            <Owner>
                <img src={repositorio.owner.avatar_url} alt={repositorio.owner.login}/>
                <h1>{repositorio.name}</h1>
                <p>{repositorio.description}</p>
            </Owner>
            <ListStates active={filterIndex}>
                {filters.map( (item, index) => (
                    <li key={item.label} onClick={()=> loadOption(index)}>{item.label}</li>
                ) )}
            </ListStates>
            <ul>
                {issues.map( issue => (
                    <li key={issue.id}>
                        <img src={issue.user.avatar_url} alt={issue.user.login} />
                        <div>
                            <a href={issue.html_url} target="_blank">{issue.title}</a>
                            {issue.labels.map( label =>(
                                <span key={label.id}>{label.name}</span>
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
            <PageActions>
                <button type="button" onClick={()=> handlePage('back')} disabled={page < 2}>Voltar</button>
                <button type="button" onClick={()=> handlePage('next')}>Próximo</button>
            </PageActions>
        </Container>
    )
}