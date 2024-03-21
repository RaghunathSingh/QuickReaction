// in React we cannot pass ref(useRef) as we normally pass variable anf function as a prop, so to pass a ref react provide us forwardRef feature in React.
import { forwardRef,useImperativeHandle ,useRef} from "react"
const ResultModal= forwardRef(function ResultModal({targetTime,result},ref,onReset)
{ 
    const dialog=useRef();
    // const userLost= result<0;
    const formatTime=(result/1000).toFixed(2); 
    const userLost=formatTime<=0;
    const score=Math.round((1-result/(targetTime*1000))*100);
    useImperativeHandle(ref,()=>{
        return{
            open(){
                dialog.current.showModal();
            }
        }
    })
    return(
        <dialog ref={dialog} className="result-modal" >
           {userLost &&  <h2>You Lost</h2>}
           {!userLost && <h2>Your Score: {score}</h2> }
            <p>The target time was <strong>{targetTime} seconds.</strong></p>
            <p>You stopped the timer with <strong>{formatTime} seconds left.</strong></p>
            <form method="dialog" onSubmit={onReset} >
                <button>Close</button>
            </form>
        </dialog>

    )
})
export default ResultModal;