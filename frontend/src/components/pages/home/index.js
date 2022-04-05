import { useEffect, useState } from "react"
import { useUserContext } from "../../../contexts/user"
import chunkString from "../../../util/chunkString"
import rules from "../../../util/rules"
import DataTable from '../../ui/dataTable'
import Modal from "../../ui/modal"
import Header from '../../ui/header'
import './style.css'
import { BiCloudUpload } from 'react-icons/bi'
import { MdOutlineAccountBalanceWallet } from 'react-icons/md'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import ServiceTransacion from '../../../services/transaction'
import ServiceBalance from '../../../services/balance'

export default function Home(){
    const [transactions, setTransactions] = useState([])
    const [balance, setBalance] = useState([])

    const [currentTransaction, setCurrentTransaction] = useState({})
    const [modalDetailOpen, setModalDetailOpen] = useState(false)

    const [modalBalanceOpen, setModalBalanceOpen] = useState(false)
    const [refreshTransactions, setRrefreshTransactions] = useState(false)

    const { user } = useUserContext()  

    const handleChangeFile = (e) => {
        const reader = new FileReader()
        reader.onload = function(e){
            let lines = chunkString(e.target.result, 81)
            let result = []
            for (let line of lines){
                let array = []
                for(let rule in rules){
                    array.push(line.substring(rules[rule-1]?.fim || 0, rules[rule].fim).trim())                                     
                }
                array[0] = parseInt(array[0]) //tipo
                array[1] = new Date(array[1].substring(0, 4) + '-' + array[1].substring(4, 6) + '-' + array[1].substring(6, 8)) //data
                array[2] = parseFloat(array[2]).toFixed(2)/100 //valor
                array[5] = array[5].substring(0, 2) + ':' + array[5].substring(2, 4) + ':' + array[5].substring(4, 6) //hora
                array.push(user.google_id)
                result.push(array)
            }
            result.pop()
            ServiceTransacion.insert(result)
                .then(() => {
                    setRrefreshTransactions(!refreshTransactions)
                    document.getElementById('btn-file-upload').value = ''
                })
                .catch(e => console.log(e))
        }
        reader.readAsText(e.target.files[0])
    }

    const handleClickRow = (item) => {
        setModalDetailOpen(!modalDetailOpen)
        setCurrentTransaction(item)
    }

    //side effect para consultar os saldos dos estabelecimentos no db
    useEffect(() => {
        transactions.length && ServiceBalance.select()
            .then(res => setBalance(res.balance))
    },[transactions])

    //side effect para consultar as transacoes no db
    useEffect(() => {
        ServiceTransacion.select()
            .then(result => setTransactions(result.transactions))
    }, [refreshTransactions])
    
    return <><Header />
    <div className="home_container">
        <div className="home_wrapper">
            <div className="home_content">
                {!transactions.length ? <>
                    <label 
                        htmlFor="btn-file-upload" 
                        className="home_btn-normal"
                        data-cy="btn-upload">
                            upload
                            <BiCloudUpload fontSize={32} color="#fff" />
                            <input id="btn-file-upload" type="file" accept=".txt" hidden onChange={(e) => handleChangeFile(e)}/>
                    </label>
                </> : null} 
                {transactions.length ? <div className="table_wrapper">
                    <DataTable 
                        data={transactions} 
                        height="25em"
                        filters={[{name:'nome_estabelecimento', type: 'option'}]}
                        onClickRow={handleClickRow}
                        header={<div className="home_btn-group">
                        <button 
                            type="button" 
                            className="home_btn-normal" 
                            onClick={() => {setModalBalanceOpen(!modalBalanceOpen)}}>
                                saldos
                            <MdOutlineAccountBalanceWallet fontSize={32} color=""/>
                        </button>
                        <label 
                            htmlFor="btn-file-upload" 
                            className="home_btn-normal"
                            data-cy="btn-upload">
                                upload
                                <BiCloudUpload fontSize={32} color="#fff" />
                                <input id="btn-file-upload" type="file" accept=".txt" hidden onChange={(e) => handleChangeFile(e)}/>
                        </label> 
                        </div>}
                    />
            
                    
                </div> : null }
            </div>
    
            {modalDetailOpen ? <Modal>
                <button type="button" onClick={() => {setModalDetailOpen(!modalDetailOpen); setCurrentTransaction({})}}>fechar</button>
                {JSON.stringify(currentTransaction, null, 2)}
            </Modal> : null}

            {modalBalanceOpen ? <Modal>
                <DataTable 
                    data={balance} 
                    height="25em"
                    filters={[{name:'nome_estabelecimento', type: 'option'}]}
                    onClickRow={handleClickRow}
                    header={
                        <button type="button" className="home_btn-icon" onClick={() => {setModalBalanceOpen(!modalBalanceOpen)}}>
                            <AiOutlineCloseCircle fontSize={24} color='red'/>
                        </button>}
                />
            </Modal> : null}

        </div>
    </div></>
}

