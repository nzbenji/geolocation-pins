import React, {useContext} from "react"
import Context from '../context'
import NoContent from './Pin//NoContent'
import CreatePin from './Pin//CreatePin'
import styled from 'styled-components'
import PinContent from './Pin/PinContent'

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
    const {draft, currentPin} = state
    let BlogContent

    if(!draft && !currentPin) {
        BlogContent = NoContent
    } else if(draft && !currentPin) {
        BlogContent = CreatePin
    } else if(!draft && currentPin) {
        BlogContent = PinContent
    }

    return (
        <BlogWrapper>
            <BlogContent />
        </BlogWrapper>
    )
}

export default BlogArea
