# AX-React-Lib
Some useful staffs for react development.

## Components
### Store
The component for manage app state.

#### props
`reducers`: An object that take reducer for different key.
`defaultValues`: An object that assign defaultValue to different key.
`children`: ReactNode.
#### Example
```javascript
function App(){
    return (
        <Store
            reducers={{
                'counter': (state, action)=>{
                    switch(action.type){
                        case 'increment':
                            return state+1;
                        case 'reset':
                            return 0;
                        case 'set':
                            return action.counter;
                        default:
                            return state;
                    }
                }
            }}
            defaultValues={{
                'counter':0,
                'counter2':0
            }}
        >
        <Children/>
        </Store>
    )
    function Children(){
        const [counter,setCounter]=useStore('counter');
        const [counter2,setCounter2]=useStore('counter2');
        const [counter3,setCounter3]=useStore('counter3',0);

        return (
            <div>
                <button onClick={()=>setCounter({type:'increment'})}>counter</button>
                <button onClick={()=>setCounter(counter2+1)}>counter2</button>
                <button onClick={()=>setCounter(counter+counter2)}>counter3</button>
            </div>
        )
    }
}

```

## Hooks
### useStore(key:string)
Access `Store` data.

#### Parameters
`key`: a string key for access data.
`defaultValue`: The default value when no data in the store for the key.

#### Returns
`data`:Tthe value of the key in the store.
`update`: A function to update the value of the key. It take an `action` when there is a reducer assigned to the key or take any value when not reducer is assigned.
#### Example
```javascript
function App(){
    return (
        <Store
            reducers={{
                'counter': (state, action)=>{
                    switch(action.type){
                        case 'increment':
                            return state+1;
                        case 'reset':
                            return 0;
                        case 'set':
                            return action.counter;
                        default:
                            return state;
                    }
                }
            }}
            defaultValues={{
                'counter':0,
                'counter2':0
            }}
        >
        <Children/>
        </Store>
    )
    function Children(){
        const [counter,setCounter]=useStore('counter');
        const [counter2,setCounter2]=useStore('counter2');
        const [counter3,setCounter3]=useStore('counter3',0);

        return (
            <div>
                <button onClick={()=>setCounter({type:'increment'})}>counter</button>
                <button onClick={()=>setCounter(counter2+1)}>counter2</button>
                <button onClick={()=>setCounter(counter+counter2)}>counter3</button>
            </div>
        )
    }
}

```
### useAsync(fn:Function)
Use `useAsync` when an async operation is needed.
#### Parameters
`fn`: an async function.
#### Returns
`isDone`: The status of current async operation, return `true` when operation is finished.
`reset`: A function can restart the async operation.
#### Example
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