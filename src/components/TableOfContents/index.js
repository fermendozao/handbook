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

const ChapterList = props => {
  const { title, edges } = props;
  return (
    <StyledChapterList>
      {title && (
        <ChapterListItem>
          <ChapterTitle>{title}</ChapterTitle>
        </ChapterListItem>
      )}
      <ChapterListItem>
        {edges && <Links entries={edges} />}
      </ChapterListItem>
    </StyledChapterList>
  );
};

class TableOfContents extends React.Component {
  render() {
    const { content: chapters } = this.props;
    return (
      <div>
        {Object.values(chapters).map((chapter, index) => (
            <ChapterList
              {...chapter}
              title={Object.keys(chapters)[index]}
            />
          ))}
      </div>
    );
  }
}

const StyledLinkList = styled.ol`
  list-style: none;
`;

const EntryTitle = styled.h6`
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

const StyledChapterList = styled.ol`
  border-bottom: 1px solid ${props => props.theme.brandLightest};
  list-style: none;
  margin: 0;

  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }
`;

const ChapterListItem = styled.li`
  margin: 0;
  transition: all 300ms ease-in-out;

  .chevron {
    height: 15px;
    width: 15px;
    color: ${props => props.theme.gatsbyLight};
    transform: rotate(0deg);
    transition: all 300ms ease-in-out;
  }
`;

const ChapterTitle = styled.h5`
  font-weight: 500;
  font-size: '1.8rem';
  color: ${props => props.theme.brand};
`;

export default TableOfContents;
