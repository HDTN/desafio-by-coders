import { useEffect, useState } from "react"
import './style.css'
import { BiReset } from 'react-icons/bi'

export default function DataTable(props){
    const [dataForSearch, setDataForSearch] = useState([])
    const [dataForView, setDataForView] = useState([])
    const [filters, setFilters] = useState({})


    useEffect(() => {
        setDataForSearch(props.data)
        setDataForView(props.data)
        if(props.filters && Array.isArray(props.filters)){
            for(let f = 0; f < props.filters.length; f ++){
                let filter = props.filters[f]
                if(filter.type === 'option'){
                    let args = props.data.map(item => item[filter.name])
                    filters[filter.name] = { options: new Array(...new Set(args)), type: 'option', name: filter.name }
                }else{
                    //filtro de texto ou data (criar)
                }
            }
        }
    }, [props.data, props.filters, filters])
    

    if(!props.data.length){
        return null
    }

    const handleChangeFilter = (e, filter) => {
        if(filter.type === 'option'){
            setDataForView(dataForSearch.filter(el => el[filter.name] === e.target.value))
        } 
    }

    return <>    
    <div className="table_header">
        {props.filters.length ? <>
        <form>
            <div className="table_filters">
                {Object.keys(filters).map((key, idx) => 
                    filters[key].type === 'option' && 
                        <select key={idx} className="table_filter-select"
                            onChange={(e) => handleChangeFilter(e, filters[key])}>
                            <option hidden>Escolha uma das opções</option>
                            {filters[key].options.map((op, idx) => <option key={idx} value={op}>{op}</option>)}
                        </select>)}
                <button 
                    type="reset" 
                    className="table_btn-light" 
                    style={{marginLeft: '1em'}}
                    onClick={() => setDataForView(dataForSearch)}>
                    <BiReset fontSize={24} color="#02be3b"/>
                </button>
            </div>
            {props.header && props.header}
        </form>
        </> : null}
    </div> 
    <div className="table_wrapper" style={{height: props.height}}>
        <table cellSpacing="10px" >
            <tbody align="center" style={{position: 'relative'}}>
                <tr style={{
                    position: 'sticky',
                    top: '0px',
                    background: 'white',
                    boxShadow: '0px 5px 10px rgb(128 128 128 / 25%)',
                    fontWeight: 'bold',
                    textTransform: 'capitalize'
                }}>
                    {dataForView.length ? Object.keys(dataForView[0]).map((key, idx) => <td key={idx} className={'td-'+key}>{key.replace(/[^a-zA-Z0-9 ]/g, ' ')}</td>) : null}
                </tr>
                {dataForView.map((data, idx) => {
                    let tds = Object.keys(data).map((key, idx) => <td key={idx} className={'td-'+key}>{data[key]}</td>)
                    return <tr key={idx} width="100%" onClick={() => props.onClickRow(data)}>{tds}</tr>
                })}
            </tbody>
        </table>
    </div>

    </>
}

