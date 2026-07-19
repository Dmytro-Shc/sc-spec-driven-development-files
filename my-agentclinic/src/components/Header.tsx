import {FC} from "hono/jsx";

export const Header: FC = () => (
    <header>
      <nav class="container">
        <ul>
          <li><strong><a href="/">AgentClinic</a></strong></li>
        </ul>
        <ul>
          <li><a href="/agents">Agents</a></li>
          <li><a href="/ailments">Ailments</a></li>
        </ul>
      </nav>
    </header>
);