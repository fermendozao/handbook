import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const Links = ({ entries }) => (
  <StyledLinkList>
    {entries.map(entry => (
      <EntryListItem key={entry.node.id}>
        <Link to={entry.node.fields.slug}>
          <EntryTitle>{entry.node.frontmatter.title}</EntryTitle>
        </Link>
      </EntryListItem>
    ))}
  </StyledLinkList>
);

class TableOfContents extends React.Component {
  render() {
    const { content: entries } = this.props;
    return (
      <div>
        <Links entries={entries} />
      </div>
    );
  }
}

const StyledLinkList = styled.ol`
  list-style: none;
`;

const EntryTitle = styled.h4`
  display: inline-block;
  font-weight: 500;
  color: white;
  margin: 0;
  line-height: 1.5;
  border-bottom: 1px solid transparent;
  text-decoration: none;
`;

const EntryListItem = styled.li`
  margin: 0;
  background: transparent;
  a {
    margin: 15px;

    &:hover {
      border-bottom: 1px solid ${props => props.theme.brand};
    }
  }
`;

export default TableOfContents;
