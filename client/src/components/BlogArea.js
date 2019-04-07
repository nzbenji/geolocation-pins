import React, {useContext} from "react"
import Context from '../context'
import NoContent from './Pin//NoContent'
import CreatePin from './Pin//CreatePin'
import styled from 'styled-components'

const BlogWrapper = styled.div`
    background: white;
    min-width: 350px;
    max-width: 400px;
    top: 40px;
    float: right;
    max-height: calc(100vh - 64px);
    overflow-y: scroll;
    display: flex;
    justify-content: center;
`

const BlogArea = ({ classes }) => {
    const {state} = useContext(Context)
    const {draft} = state
    let BlogContent

    !draft ? BlogContent = NoContent : BlogContent = CreatePin

    return (
        <BlogWrapper>
            <BlogContent />
        </BlogWrapper>
    )
}

export default BlogArea
