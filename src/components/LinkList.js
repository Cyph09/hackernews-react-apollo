import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import Link from './Link'


const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`

class LinkList extends Component {
    render(){
        return(
            <Query query={FEED_QUERY}>
                {({loading, error, data}) => {
                    if (loading) return <div>Fetching</div>
                    if (error) return <div>Error</div>

                    const linksToRender = data.feed.links

                    return (
                        <div>
                            {linksToRender.map((link, index)=> (
                            <Link key={link.id} link={link} index={index}/>
                            ))}
                        </div>
                    )
                }}
            </Query>
        )
    }
}

export default LinkList