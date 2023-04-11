import { Container, Title, Subtitle } from './style';

type props = {
    title: string,
    subtitle: string
}

export function Highlight({title, subtitle}: props) {
    return(
        <Container>
            <Title>{title}</Title>
            <Subtitle>{subtitle}</Subtitle>
        </Container>
    );
}