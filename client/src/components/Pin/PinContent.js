import React, {useContext} from 'react'
import Context from '../../context'
import styled from 'styled-components'
import format from 'date-fns/format'

const Content = styled.div`
    padding: 1em 0.5em;
    width: 100%;
`

const PinContent = () => {
    const {state} = useContext(Context)
    const {title, content, author, createdAt, comments} = state.currentPin

    return (
        <Content>
            <h2>{title}</h2>
            <h4>{author.name}</h4>
            <p>{format(Number(createdAt), "MMM Do, YYYY")}</p>
            <p>{content}</p>
        </Content>
    )
}

export default PinContent