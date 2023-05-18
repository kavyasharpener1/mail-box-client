import {  useEffect, useMemo } from 'react';
import { Container, Row, Col,Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MailAction } from '../store/MailSlice';
import { ArrowLeft, Dot ,App, TypeItalic} from 'react-bootstrap-icons';
import useHttp from '../customHooks/useHttp';
function Inbox() {
  const dispatch=useDispatch()
    const mail=useSelector(state=>state.auth.email)
    const inbox=useSelector(state=>state.mail.mailData)
    const email=mail.split('@')[0]
    const Navigate=useNavigate()


//Custom hook
        const { isLoading, error, sendRequest}=useHttp()

useEffect(()=>{

  const TransferdData=(responseData)=>{
    let mailArr=[];
    for(const key in responseData){
      mailArr.push({
          id:key,
          read:responseData[key].read,
          Semail:responseData[key].Semail,
          Remail:responseData[key].Remail,
          subject:responseData[key].subject,
          content:responseData[key].content,
          date:responseData[key].date
      })
    }
  dispatch(MailAction.MailArr(mailArr))
  }
  sendRequest({url:`
  https://mailbox-7e70f-default-rtdb.firebaseio.com/${email}/inbox.json`},TransferdData )
  
},[sendRequest])


const openMailHandler=(mail)=>{
const applyData=()=>{
  dispatch(MailAction.AddMail({id:mail.id,Semail:mail.Semail,
    Remail:mail.Remail,subject:mail.subject,content:mail.content,date:mail.date, read:true}))
  dispatch(MailAction.AddNode('inbox'))
    Navigate('/mailDetails')
}
  sendRequest({url:`
  https://mailbox-7e70f-default-rtdb.firebaseio.com/${email}/inbox/${mail.id}.json`,
  method: 'PUT',
  body: { id:mail.id,Semail:mail.Semail,Remail:mail.Remail,subject:mail.subject,content:mail.content, date:mail.date, read:true },
  headers: {
    'Content-Type': 'application/json',
  }
}, applyData)
}

//optimization
const memoizedMailList = useMemo(() => {
  return inbox.map(mail=>(
    <tr style={{cursor:'pointer'}} key={mail.id}  onClick={openMailHandler.bind(null,mail)}>
      <td><App/></td>
      <td>{!mail.read&&<Dot  color='blue'size={30} />}</td>
      <td>{mail.subject}</td>
      <td>{mail.content.slice(0,10)}...</td>
      <td>{mail.date}</td>
    </tr>
                    
  ));
}, [inbox]);


    return (
       <> 
      <Container className='mt-5  w-75 ' fluid>
        {isLoading&& <h3>Loading...</h3>}
        {error && alert(error)}
        <Row>
          <Col><ArrowLeft size={30} onClick={()=>Navigate('/')} /></Col>
      <h1 className='text-center'>INBOX</h1>
      
      </Row>
         {inbox.length===0 &&<p style={{textAlign:"center"}}>No Emails</p>}
        <Row   className="w-100 justify-content-center">
        
            <Table className='h-100 w-100 ms-4 '>
            <tbody>
                {memoizedMailList}
              </tbody>
            </Table>
        </Row>
      </Container>
      </>
    );
  }
  
  export default Inbox;