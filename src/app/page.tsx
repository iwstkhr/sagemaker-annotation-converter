'use client';

import React from 'react';

import { useForm } from 'react-hook-form';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

import { Box, Button, Container, CssBaseline, Grid, Paper, styled } from '@mui/material';
import GroundTruthBBoxManifest from '@/app/components/GroundTruthBBoxManifest';
import Header from '@/app/components/Header';
import SMJumpStartODAnnotation from '@/app/components/SMJumpStartODAnnotation';
import { toGroundTruthBBoxManifest, toSMJumpStartODAnnotation } from '@/app/utils';

export default function Home() {
  const { control, getValues, setError, setValue } = useForm();

  const onClickToGroundTruthBBoxManifest = (): void => {
    try {
      const result = toGroundTruthBBoxManifest(getValues('smJumpStartODAnnotation'));
      setValue('groundTruthBBoxManifest', result);
    } catch (error) {
      setError('smJumpStartODAnnotation', { message: (error as Error).message });
    }
  };

  const onClickToSMJumpStartODAnnotation = (): void => {
    try {
      const result = toSMJumpStartODAnnotation(getValues('groundTruthBBoxManifest'));
      setValue('smJumpStartODAnnotation', result);
    } catch (error) {
      setError('groundTruthBBoxManifest', { message: (error as Error).message });
    }
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
  }));

  return (
    <>
      <CssBaseline />

      <Header />

      <Box mt={2} />

      <Box sx={{border: 0}}>
        <Container maxWidth={'lg'}>
          <Grid container spacing={2} border={0}>
            <Grid item xs={5}>
              <Item>
                <SMJumpStartODAnnotation name={'smJumpStartODAnnotation'} control={control} />
              </Item>
            </Grid>

            <Grid item xs={2} alignSelf={'center'}>
              <Item>
                <Button onClick={onClickToGroundTruthBBoxManifest} variant="contained" size="large">
                  <KeyboardDoubleArrowRightIcon />
                </Button>
              </Item>

              <Item>
                <Button onClick={onClickToSMJumpStartODAnnotation} variant="contained" size="large">
                  <KeyboardDoubleArrowLeftIcon />
                </Button>
              </Item>
            </Grid>

            <Grid item xs={5}>
              <Item>
                <GroundTruthBBoxManifest name={'groundTruthBBoxManifest'} control={control} />
              </Item>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
