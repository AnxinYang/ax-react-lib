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

### If
A component that render it's children when condition is meet.

#### props

`condition`: A boolean value or a function that returns a boolean value.

`children`: ReactNode. Children will be render when the condition is true.

#### Example
```javascript
function App(){
    return (
        <Store>
        <Children/>
        </Store>
    )
    function Children(){
        const [isLogin,setLogin]=useStore('login');

        return (
            <div>
                <If condition={isLogin}>
                    <Contents></Contents>
                </If>
                <If condition={!isLogin}>
                    <Login/>
                </If>
            </div>
        )
    }
}

```

### Loader
A component will run a function.
#### props
`load`: a function for loading things.
`callback`: Optional, a function for handle result of `load`.

#### Example
```javascript
function App(){
    return (
        <Store>
        <Children/>
        </Store>
    )
    function Children(){
        const [isLogin,setLogin]=useStore('login');

        return (
            <div>
            <Loader 
                load={async ()=>{
                    const res = await login();
                    return res;
                }}
                callback={(res)=>{
                    setLogin(res)
                }}
            />
                <If condition={isLogin}>
                    <Contents></Contents>
                </If>
                <If condition={!isLogin}>
                    <Login/>
                </If>
            </div>
        )
    }
}

```


### LazyLoad
A component will render its children when it's visible.
#### props
`tag`: HTML tag name or React component name, Default: `div`

`children`: ReactNode

`style`: CSS properties

`className`:CSS class name
`root`:The element that is used as the viewport for checking visibility of the target.

`threshold`: Either a single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed. Default: `0`

`rootMargin`: Margin around the root.

`forward`: boolean. If set to `true`, the observer will be removed once the element is visible. Default: `true`

#### Example
```javascript
function App(){
    return (
        <div>
            ...React Nodes
            <LazyLoad tag='div'>
                ...React Nodes
            </LazyLoad>
        </div>
    )
}

```

## Hooks
### useStore(key:string, defaultValue?:any)
Access `Store` data.

#### Parameters
`key`: a string key for access data.

`defaultValue`: The default value when no data in the store for the key.

#### Returns
[data:any, update:(value|Action)=>void]

`data`:The value of the key in the store.

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
`cleanUp`: an function that will be call when component it unmounted.
`DependencyList `: React DependencyList. 
#### Returns
[isDone:boolean, reset:()=>void]

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

### useDelay(fn:()=>void, ms:number, dep:React.DependencyList)

`useEffect` with delay.

#### Parameters
`fn`: an function.
`dep `: React DependencyList. 


### useIntersectionObserver

#### Parameters
`ref`: A ref to Element .

`options`: IntersectionObserverInit. 

`forward`:If set to `true`, the observer will be removed once the element is visible. Default: `true`

### Returns

`isIntersecting`: A boolean value. Return `true` if the element is intersecting.

