import React, {useState, useContext} from 'react'
import { Form, Button } from 'semantic-ui-react'
import {CREATE_COMMENT_MUTATION} from '../../graphql/mutations'
import Context from '../../context'
import {useClient} from '../../client'

const CreateComment = () => {
    const client = useClient()
    const {state, dispatch} = useContext(Context)
    const [comment, setComment] = useState("")

    const handleSubmitComment = async () => {
        const variables = {
            pinId: state.currentPin._id,
            text: comment
        }

        const {createComment} = await client.request(CREATE_COMMENT_MUTATION, variables)

        dispatch({
            type: "CREATE_COMMENT",
            payload: createComment
        })
        setComment("")
    }

    return (
        <React.Fragment>
            <Form reply style={{width: '98%', height: '100px'}}>
                <Form.TextArea />
                <Button 
                    disabled={!comment.trim}
                    content='Add Comment' 
                    labelPosition='left' 
                    icon='edit' 
                    primary 
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    onClick={handleSubmitComment}
                />
            </Form>
        </React.Fragment>
    )
}

export default CreateComment