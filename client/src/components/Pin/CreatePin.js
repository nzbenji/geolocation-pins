import React, {useState, useContext} from "react"
import {GraphQLClient} from 'graphql-request'
import axios from 'axios'
import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import CreatePinWrapper from '../styles/createPin'
import { Button, Form, TextArea, Input } from 'semantic-ui-react'

import Context from '../../context'
import {CREATE_PIN_MUTATION} from '../../graphql/mutations'
import {useClient} from '../../client'

const CreatePin = () => {
    const client = useClient()
    const {state, dispatch} = useContext(Context)
    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [content, setContent] = useState("")
    const [submitting, setSubmitting] = useState(false)

    const handleImageUpload = async () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "elktt8hu")
        data.append("cloud_name", "dynl1lsf5")
        
        try {
            const res = await axios.post("https://api.cloudinary.com/v1_1/dynl1lsf5/image/upload", data)
            return res.data.url
        } catch(err) {
            console.error(err)
        }
        
    }

    const handleSubmit = async event => {

        try {
            event.preventDefault()
            setSubmitting(true)
  
            const url = await handleImageUpload()
            const {latitude, longitude} = state.draft
    
            const variables = {
                title,
                image: url,
                content,
                latitude,
                longitude
            }
    
            const {createPin} = await client.request(CREATE_PIN_MUTATION, variables)
            console.log("pin created", {createPin})
            handleDelete()

        } catch(err) {
            setSubmitting(false)
            console.error(err)
        }
        
    }

    const handleDelete = () => {
        setTitle("")
        setImage("")
        setContent("")

        dispatch({ type: 'DELETE_DRAFT'})
    }

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
                <Input 
                    placeholder='Title' 
                    style={{marginBottom: '20px'}}
                    onChange={event => setTitle(event.target.value)}
                />

                <label htmlFor="image">
                <input 
                    accept="image/*"
                    id="image"
                    type="file"
                    onChange={event => setImage(event.target.files[0])}
                />
            </label>
            </div>
            
            <Form>
                <TextArea 
                    placeholder='Tell us more' 
                    style={{ minHeight: 100, marginBottom: '20px' }} 
                    onChange={event => setContent(event.target.value)}
                />
            </Form>
            <div>
                <Button negative style={{marginRight: '10px'}} onClick={handleDelete}>Discard</Button>
                <Button 
                    positive
                    disabled={!title.trim() || !content.trim() || !image || submitting}
                    onClick={handleSubmit}
                >Submit</Button>
            </div>

        </CreatePinWrapper>
    )
}

export default CreatePin