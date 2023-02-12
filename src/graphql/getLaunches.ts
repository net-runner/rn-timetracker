import gql from 'graphql-tag';

export const GET_LAUNCHES = gql(`
query getLaunches($limit: Int, $offset: Int, $sort: String, $order: String) {
  launches(limit: $limit, offset: $offset, sort: $sort, order: $order) {
    id
    launch_success
    details
    mission_name
    rocket {
      rocket_name
      rocket {
        active
      }
    }
    links {
      article_link
      flickr_images
      presskit
      wikipedia
    }
    launch_date_unix
  }
}

`);
