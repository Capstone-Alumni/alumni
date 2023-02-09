import { useState } from 'react';
// material
import {
  Box,
  Button,
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useTheme,
} from '@mui/material';
import EndingStep from './EndingStep';
import Logo from '@share/components/Logo';
import { useAppSelector } from 'src/redux/hooks';
import { currentTenantSelector } from 'src/redux/slices/currentTenantSlice';
import { useFormContext } from 'react-hook-form';
import { useResetRecoilState } from 'recoil';
import { selectedClassAtom, selectedGradeAtom } from '../states';
// ----------------------------------------------------------------------

export type Step = {
  label: string;
  optional: boolean;
  component: React.ReactNode;
};

interface VerifyAccountPageProps {
  steps: Step[];
}

const VeriticalLinearStepper = ({ steps }: VerifyAccountPageProps) => {
  const theme = useTheme();
  const { reset: resetForm } = useFormContext();
  const resetSelectedGrade = useResetRecoilState(selectedGradeAtom);
  const resetSelectedClass = useResetRecoilState(selectedClassAtom);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  const tenant = useAppSelector(currentTenantSelector);

  const isStepOptional = (step: number) => step === 1;

  const isStepSkipped = (step: number) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
    resetSelectedGrade();
    resetSelectedClass();
    resetForm();
  };

  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      <Grid item xs={4}>
        <Paper
          sx={{
            px: 8,
            py: 4,
            width: '100%',
            bgcolor: 'grey.50012',
            height: '100vh',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: theme.spacing(1),
              mb: theme.spacing(4),
            }}
          >
            <Logo />
            <Typography variant="h3" color="primary">
              {tenant?.name}
            </Typography>
          </Box>

          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map(({ label, optional }, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};

              if (optional) {
                labelProps.optional = (
                  <Typography variant="caption">Optional</Typography>
                );
              }

              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel sx={{ fontWeight: 700 }} {...labelProps}>
                    <Typography variant="h6">{label}</Typography>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Paper>
      </Grid>

      <Grid item xs={8}>
        <Paper
          sx={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            px: 8,
            py: 4,
          }}
        >
          {activeStep < steps.length ? (
            <>
              {steps?.[activeStep].component}
              <Box sx={{ display: 'flex' }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Quay lại
                </Button>
                <Box sx={{ flexGrow: 1 }} />
                {steps[activeStep].optional && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Bỏ qua
                  </Button>
                )}
                <Button variant="contained" onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Hoàn thành' : 'Tiếp theo'}
                </Button>
              </Box>
            </>
          ) : (
            <EndingStep reset={handleReset} />
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default VeriticalLinearStepper;
