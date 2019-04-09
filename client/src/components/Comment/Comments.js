import React from "react"
import {Comment} from 'semantic-ui-react'

const Comments = ({comments}) => {
  return (
    <React.Fragment>
      <Comment.Group>
        {comments.map((comment, index) => (
        <Comment key={index}>
          <Comment.Avatar as='a' src={comment.author.picture} />
          <Comment.Content>
            <Comment.Author>{comment.author.name}</Comment.Author>
            <Comment.Metadata>
              <div>1 day ago</div>
            </Comment.Metadata>
            <Comment.Text>
              <p>
                The hours, minutes and seconds stand as visible reminders that your effort put them all
                there.
              </p>
              <p>
                Preserve until your next run, when the watch lets you see how Impermanent your efforts
                are.
              </p>
            </Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
        ))}
    </Comment.Group>
    </React.Fragment>
    
  )
}

export default Comments