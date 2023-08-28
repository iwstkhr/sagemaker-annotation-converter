import { AppBar, Avatar, Box, Link, Toolbar, Typography } from '@mui/material';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SageMaker Annotation Converter
          </Typography>

          <Link href="https://github.com/iwstkhr/sagemaker-annotation-converter" target="_blank">
            <Avatar alt="iwstkhr" src="./images/github-mark-white.png" />
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
