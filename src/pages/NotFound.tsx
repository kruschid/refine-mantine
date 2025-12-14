import { Button, Container, Group, Text, Title } from '@mantine/core';
import { Link, useTranslate } from '@refinedev/core';
import classes from './NotFound.module.css';

interface NotFoundProps {
  returnTo: string;
}

export const NotFound: React.FC<NotFoundProps> = ({
  returnTo
}) => {
  const t = useTranslate();
  
  return (
    <Container className={classes.root}>
      <div className={classes.label}>
        {t("pages.notFound.label", "404")}
      </div>
      <Title className={classes.title}>
        {t("pages.notFound.title", "You have found a secret place.")}
      </Title>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
        {t(
          "pages.notFound.description",
          "Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has been moved to another URL."
        )}
      </Text>
      <Group justify="center">
        <Button
          component={Link as  React.FC<{ to: string }>}
          to={returnTo}
          variant="subtle"
          size="md"
        >
          {t(
            "pages.notFound.button",
            "Take me back to home page"
          )}
        </Button>
      </Group>
    </Container>
  );
}
