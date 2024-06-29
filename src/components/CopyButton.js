import  { useState } from 'react'

const CopyButton = (props) => {
    const [copied, setCopied] = useState(false);
    const {text} = props;

    const copyText = () => {
        navigator.clipboard.writeText(text)
        .then(()=> {
            setCopied(true);
            setTimeout(() => setCopied(false),1000);
        })
        .catch(error => {
            console.log("Failed to copy: ", error)
        }) 
    }

    return (
        <div className='inline-flex'>
            <i className="fa-regular fa-copy text-red-600 cursor-pointer" onClick={copyText}></i> 
            {copied && <span className="ml-2 text-red-600">Copied!</span>}
        </div>
    )
}

export default CopyButton;