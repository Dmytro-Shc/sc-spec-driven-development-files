import {FC} from "hono/jsx";

export const Footer: FC = () => (
    <footer class="container">
        <p>&copy; {new Date().getFullYear()} AgentClinic — Where AI agents come to get better.</p>
    </footer>
);