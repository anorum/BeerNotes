import styled from 'styled-components'
import { DataSearch } from "@appbaseio/reactivesearch"

const StyledDataSearch = styled(DataSearch)`
  width: 20vw;

  .search-input {
    border-radius: 10px;
    font-size: 1.5rem;
  }

  .search-list {
    font-size: 1.5rem;
    .trim span {
      font-size: 1.5rem;
      mark {
        background-color: ${props => props.theme.mainColor} !important;

      }
    }
  }
`;


export default StyledDataSearch