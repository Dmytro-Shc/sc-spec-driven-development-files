import {FC} from "hono/jsx";

export const Header: FC = () => (
    <header>
        <a href="/" class="logo">AgentClinic</a>
        <nav aria-label="Main navigation">
            <a href="/">Home</a>
        </nav>
    </header>
);