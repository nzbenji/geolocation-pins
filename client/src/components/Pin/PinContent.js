import React, {useContext} from 'react'
import Context from '../../context'
import styled from 'styled-components'
import format from 'date-fns/format'
import { Grid, Image, Label, Segment, Container, Header } from 'semantic-ui-react'

import Comments from '../Comment/Comments'
import CreateComment from '../Comment/CreateComment'

const Content = styled.div`
    padding: 1em 0.5em;
    width: 100%;
    text-align: center;
`

const PinContent = () => {
    const {state} = useContext(Context)
    const {title, content, author, createdAt, comments} = state.currentPin
    console.log(author)

    return (
        <Content>
            <Header size='large' color='orange'>{title}</Header>
            <Header as='h3'>
                <Image circular src={author.picture} /> {author.name}
            </Header>
            <p>{format(Number(createdAt), "MMM Do, YYYY")}</p>

            <Grid columns={1}>
                <Grid.Column>
                <Segment raised>
                    <Label as='a' color='red' ribbon style={{marginBottom: '20px', fontSize: '15px'}}>
                        Details
                    </Label>
                    <Container>
                        {content}
                    </Container>                   
                </Segment>
                </Grid.Column>
            </Grid>
            <div>
                <Comments comments={comments} />
            </div>
            <div style={{marginTop: '20px'}}>
                <CreateComment />
            </div>
            
            
        </Content>
    )
}

export default PinContent