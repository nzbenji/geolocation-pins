import React from "react"
import {Comment} from 'semantic-ui-react'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

const Comments = ({comments}) => {
  return (
    <div style={{marginTop: '5rem'}}>
      <Comment.Group>
        {comments.map((comment, index) => (
        <Comment 
          key={index}
          style={{marginTop: '30px', borderBottom: '1px solid #bdc3c7'}}
          >
          <Comment.Avatar 
            as='a' 
            src={comment.author.picture} 
            />
          {console.log(comment)}
          <Comment.Content>
            <Comment.Author style={{fontSize: '18px'}}>{comment.author.name}</Comment.Author>
            <Comment.Metadata>
              <div>{distanceInWordsToNow(Number(comment.createdAt))} ago</div>
            </Comment.Metadata>
            <Comment.Text>
              <p>{comment.text}</p>
            </Comment.Text>
          </Comment.Content>
        </Comment>
        ))}
    </Comment.Group>
    </div>
    
  )
}

export default Comments