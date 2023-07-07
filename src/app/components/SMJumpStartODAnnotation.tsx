import React from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';
import { Box, Link, TextField } from '@mui/material';
import { blueGrey } from '@mui/material/colors';

type Props = {
  name: string;
  control: Control;
  rules?: RegisterOptions;
};

export default function SMJumpStartODAnnotation({ name, control, rules }: Props) {
  const { field, fieldState: { error } } = useController({ name: name, control: control, rules: rules });
  const link = 'https://github.com/aws/amazon-sagemaker-examples/blob/main/introduction_to_amazon_algorithms/jumpstart_object_detection/Amazon_JumpStart_Object_Detection.ipynb';
  return (
    <>
      <div style={{textAlign: 'left'}}>
        Please refer to <Link href={link} color={blueGrey[500]} target="_blank">this link</Link> for details.
      </div>

      <Box mt={2} />

      <TextField
        {...field}
        autoFocus={true}
        label="SageMaker JumpStart Object Detection Annotation"
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
