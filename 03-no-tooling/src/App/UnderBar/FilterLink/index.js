import {html} from 'htm/react'
import { Link, useLocation } from "react-router-dom";

const FilterLink = () => {
  const { pathname } = useLocation();
  return html`
    <ul className="filters">
      <li>
        <${Link}
          data-cy="all-filter"
          className=${pathname === '/' ? 'selected' : ''}
          to="/"
        >
          All
        <//>
      </li>
      <li>
        <${Link}
          data-cy="active-filter"
          className=${pathname === '/active' ? 'selected' : ''}
          to="/active"
        >
          Active
        <//>
      </li>
      <li>
        <${Link}
          data-cy="completed-filter"
          className=${pathname === '/completed' ? 'selected' : ''}
          to="/completed"
        >
          Completed
        <//>
      </li>
    </ul>
  `;
};
export default FilterLink;
