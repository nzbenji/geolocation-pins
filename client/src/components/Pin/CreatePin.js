import React, {useState, useContext} from "react"
import axios from 'axios'
import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import CreatePinWrapper from '../styles/createPin'
import { Button, Form, TextArea, Input } from 'semantic-ui-react'

import Context from '../../context'

const CreatePin = () => {
    const {dispatch} = useContext(Context)
    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [content, setContent] = useState("")

    const handleImageUpload = async () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "elktt8hu")
        data.append("cloud_name", "dynl1lsf5")
        
        try {
            const res = await axios.post("https://api.cloudinary.com/v1_1/dynl1lsf5/image/upload", data)
            console.log(res.data)
            return res.data.url
        } catch(err) {
            console.error(err)
        }
        
    }

    const handleSubmit = async event => {
        event.preventDefault()
        const url = await handleImageUpload()
        console.log({title, image,url, content})
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
                    disabled={!title.trim() || !content.trim() || !image}
                    onClick={handleSubmit}
                >Submit</Button>
            </div>

        </CreatePinWrapper>
    )
}

export default CreatePin