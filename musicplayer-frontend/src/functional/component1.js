import React from 'react'

function Component1(props)
{
    return <div>
        <h1>
            Component {props.match.params.id}
        </h1>
    </div>
}

export default Component1