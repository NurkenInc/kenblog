'use client';

import { useContext } from 'react';
import { useCallback } from 'react';
import { StepperConfig } from '@/shared/ui/Stepper/stepper'
import { useStepper } from '@/shared/libs/hooks/use-stepper'
import { Stepper } from '@/shared/ui/Stepper/stepper'
import { StepperStep } from '@/shared/ui/Stepper/stepper'
import { CreatePostForm } from '../CreatePostForm/CreatePostForm';
import { useRouter } from 'next/navigation';
import { CreatePostFormContext, defaultForm } from '../../model/context/createPostFormContext';

const steps = [
  { label: "Content", optional: false },
  { label: "Details", optional: true  },
  { label: "Preview", optional: false },
] satisfies StepperConfig[]

// separate pages for fast loading
export const CreatePostStepper = () => {
  const {
    nextStep,
    prevStep,
    resetSteps,
    activeStep,
  } = useStepper({
    initialStep: 0,
    steps,
  })
  const router = useRouter();
  const { form, setForm } = useContext(CreatePostFormContext);

  const onReset = useCallback(() => {
    resetSteps();
    setForm(defaultForm);
  }, [setForm, resetSteps])

  return (
    <div className='py-6'>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <StepperStep index={index} key={index} label={step.label}>
            <div className='pt-6'>
              <CreatePostForm
                onNext={nextStep}
                onPrev={prevStep}
                onReset={onReset}
                label={step.label}
              />
            </div>
          </StepperStep>
        ))}
      </Stepper>
    </div>
  )
}