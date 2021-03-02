# AX-React-Lib
Some useful hooks for react development.
## Hooks
### useStore


### useAsync(fn:Function)
Use `useAsync` when an async operation is needed.
#### parameters
`fn`: an async function.
#### returns
`isDone`: The status of current async operation, return `true` when operation is finished.
`reset`: A function can restart the async operation.
#### Usage
```javascript
function SomeComponent(){
    const [data,setData] = useState();
    const [isDone,reset] = useAsync(async ()=>{
        const res = await fetch('data');
        const data = await res.json();
        setData(data)
    });

    return (
        <button onClick={reset}>{'Refresh'}</button>
    )
}

```