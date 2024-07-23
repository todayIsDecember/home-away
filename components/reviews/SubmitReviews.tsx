'use client';
import { useState } from 'react';
import { SubmitButton } from '@/components/form/Buttons';
import FormContainer from '@/components/form/FormContainer';
import { Card } from '@/components/ui/card';
import RatingInput from '@/components/form/RatingInput';
import TextareaInput from '../form/TextareaInput';
import { Button } from '@/components/ui/button';
import { createReviewAction } from '@/utils/actions';

function SubmitReviews({propertyId}: {propertyId: string}) {
    const [isReviewFormVisible, setIsReviewFormVisible] = useState(false)
    return (
        <div className='mt-8'>
            <Button onClick={() => setIsReviewFormVisible((prev) => !prev)}>
                {isReviewFormVisible ? 'Close' : 'Leave a Review'}
            </Button>
            {
                isReviewFormVisible && (
                    <Card className='p-8 mt-8'>
                        <FormContainer action={createReviewAction}>
                            <input type="hidden" name="propertyId" value={propertyId} />
                            <RatingInput name='rating'/>
                            <TextareaInput name='comment' labelText='your thoughts on this property' defaultValue='Amazing place !!!'/>
                            <SubmitButton text='Submit' className='mt-4' />
                        </FormContainer>
                    </Card>
                )
            }
        </div>
    )
}

export default SubmitReviews