import React from "react"
import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import CreatePinWrapper from '../styles/createPin'
import { Button, Form, TextArea, Input } from 'semantic-ui-react'

const CreatePin = () => {
    return (
        <CreatePinWrapper>
            <div>
                <FontAwesomeIcon 
                    icon={faMapMarkedAlt} 
                    size="3x"
                    color="orange"
                />
                <h2>Pin a Location!</h2>
            </div>
            
            <div>
                <Input placeholder='Title' style={{marginBottom: '20px'}}/>

                <label htmlFor="image">
                <input 
                    accept="image/*"
                    id="image"
                    type="file"
                />
            </label>
            </div>
            
            <Form>
                <TextArea placeholder='Tell us more' style={{ minHeight: 100, marginBottom: '20px' }} />
            </Form>
            <div>
                <Button negative style={{marginRight: '10px'}}>Discard</Button>
                <Button positive>Submit</Button>
            </div>

        </CreatePinWrapper>
    )
}

export default CreatePin