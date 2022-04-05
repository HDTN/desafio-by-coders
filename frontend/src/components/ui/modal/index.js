
export default function Modal(props){
    return <>
        <div style={modalContainer}>
            <div style={modalWrapperr}>
                {props.children}
            </div>
        </div>
    </>
}

const modalContainer = {
    position: 'fixed',
    inset: '0',
    backdropFilter: 'blur(5px)',
    display: 'flex',
    alignItems: 'center',
}


const modalWrapperr = {
    width: '90%',
    maxWidth: '1024px',
    height: 'auto',
    margin: '0 auto',
    background: '#fff',
    padding: '3em 2em',
    borderRadius: '1em',
    boxShadow: '0px 4px 10px rgba(128, 128, 128. .25)'

}