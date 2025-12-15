import { Button, Container, Stack, Text, Title } from '@mantine/core';
import { Link, useTranslate } from '@refinedev/core';

interface NotFoundProps {
  returnTo: string;
}

export const NotFound: React.FC<NotFoundProps> = ({
  returnTo
}) => {
  const t = useTranslate();
  
  return (
    <Container>
      <Stack h="100vh" align="center" justify="center" gap="xl">
        <Title fw={500}>
          {t("pages.notFound.label", "404")}
        </Title>
        <Title fw={500}>
          {t("pages.notFound.title", "You have found a secret place.")}
        </Title>
        <Text c="dimmed" size="lg" ta="center" maw={500}>
          {t(
            "pages.notFound.description",
            "Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has been moved to another URL."
          )}
        </Text>
        <Button
          component={Link as React.FC<{ to: string }>}
          to={returnTo}
          variant="subtle"
          size="md"
        >
          {t(
            "pages.notFound.button",
            "Take me back to home page"
          )}
        </Button>
      </Stack>
    </Container>
  );
}
