import { NavLink } from "react-router-dom";
import styled from "styled-components";

const ProfileFeedWrap = styled.article`
  width: 100%;
  padding: 1.5rem 0;

  header {
    margin: 0;
    text-align: right;
    h2 {
      margin: 0;
    }
  }
  main {
    gap: 2rem;
    /* display: grid; */
    display: flex;
    flex-wrap: wrap;
    /* grid-template-columns: repeat(1, 1fr); */
    > article {
      flex: 1 0 100%;
    }
    &.grid {
      /* grid-template-columns: repeat(3, 1fr); */
      gap: 1rem;
      img {
        aspect-ratio: 1/1;
        object-fit: cover;
        border-radius: 0.25rem;
      }
      div {
        flex: 1 0 calc((100% - 2rem) / 3);
        position: relative;
        span {
          position: absolute;
          right: 0.5rem;
          top: 0.5rem;
        }
      }
    }
  }
`;

const ViewBtn = styled(NavLink)`
  display: inline-block;
  width: 3rem;
  height: 3rem;
  background: url(${props => props.icon}) no-repeat center/1.5rem;
  filter: invert(0.7);
  &.active {
    filter: invert(0);
  }
`;

export { ProfileFeedWrap, ViewBtn };
