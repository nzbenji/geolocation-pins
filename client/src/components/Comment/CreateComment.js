import React from 'react'
import { Form, Button } from 'semantic-ui-react'

const CreateComment = () => {
    return (
        <React.Fragment>
            <Form reply style={{width: '98%', height: '100px'}}>
                <Form.TextArea />
                <Button content='Add Comment' labelPosition='left' icon='edit' primary />
            </Form>
        </React.Fragment>
    )
}

export default CreateComment