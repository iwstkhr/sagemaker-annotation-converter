import React from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';
import { Box, Link, TextField } from '@mui/material';
import { blueGrey } from '@mui/material/colors';

export default function GroundTruthBBoxManifest({
  name,
  control,
  rules
}: {
  name: string;
  control: Control;
  rules?: RegisterOptions;
}) {
  const { field, fieldState: { error } } = useController({ name: name, control: control, rules: rules });
  const link = 'https://docs.aws.amazon.com/sagemaker/latest/dg/sms-data-output.html#sms-output-box';
  return (
    <>
      <div style={{textAlign: 'left'}}>
        Please refer to <Link href={link} color={blueGrey[500]} target="_blank">this link</Link> for details.
      </div>

      <Box mt={2} />

      <TextField
        {...field}
        label="SageMaker Ground Truth Bounding Box Manifest"
        multiline
        rows={30}
        fullWidth={true}
        error={!!error}
        helperText={error?.message}
        value={field.value ?? ''}
      />
    </>
  );
}
