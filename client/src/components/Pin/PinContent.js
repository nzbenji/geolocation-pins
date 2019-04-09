import React, {useContext} from 'react'
import Context from '../../context'
import styled from 'styled-components'
import format from 'date-fns/format'
import { Grid, Image, Label, Segment, Container } from 'semantic-ui-react'

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
            <h2>{title}</h2>
            <Label as='a'>
            <Image avatar spaced='right' src={author.picture} />
            {author.name}
            </Label>
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
            <div style={{marginTop: '20px'}}>
                <CreateComment />
            </div>
            
            <Comments comments={comments} />
        </Content>
    )
}

export default PinContent