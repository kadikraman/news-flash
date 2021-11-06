import { gql } from 'urql';

export const StorySummaryFields = gql`
  fragment StorySummaryFields on Story {
    id
    title
    summary
    bookmarkId
  }
`;
